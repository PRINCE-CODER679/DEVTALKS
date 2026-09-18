import { google } from 'googleapis';

/**
 * Robustly normalizes and extracts the RSA private key in standard PEM RFC format.
 * Automatically handles:
 * - JSON key snippets like `"private_key": "-----BEGIN..."`
 * - Escaped `\n` or `\r\n` characters
 * - Surrounding quotes and trailing commas
 * - Single-line base64 payloads chunked into standard 64-char lines
 */
function extractAndCleanKey(input) {
  if (!input) return '';
  let str = input.trim();

  // If the whole JSON line or "private_key": "..." was pasted
  if (str.includes('"private_key":')) {
    try {
      const match = str.match(/"private_key"\s*:\s*"([^"]+)"/);
      if (match && match[1]) {
        str = match[1];
      }
    } catch (e) {}
  }

  // Remove any leading '"private_key": ' or leftover JSON artifacts
  str = str.replace(/^["']?private_key["']?\s*:\s*["']?/, '');
  str = str.replace(/["'],?$/, '');
  str = str.trim();

  // Remove leading / trailing quotes
  while ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
    str = str.slice(1, -1).trim();
  }

  // Replace literal '\n' and '\r\n'
  str = str.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\r\n/g, '\n');

  // Extract from -----BEGIN to -----END
  const beginIdx = str.indexOf('-----BEGIN');
  const endMarker = '-----END';
  const endIdx = str.indexOf(endMarker);

  if (beginIdx !== -1 && endIdx !== -1) {
    const endLineEndIdx = str.indexOf('-----', endIdx + endMarker.length);
    if (endLineEndIdx !== -1) {
      const fullPem = str.substring(beginIdx, endLineEndIdx + 5);
      
      const headerMatch = fullPem.match(/-----BEGIN [A-Z ]+-----/);
      const footerMatch = fullPem.match(/-----END [A-Z ]+-----/);

      if (headerMatch && footerMatch) {
        const header = headerMatch[0];
        const footer = footerMatch[0];
        const body = fullPem
          .replace(header, '')
          .replace(footer, '')
          .replace(/\s+/g, '');
        
        const chunked = body.match(/.{1,64}/g)?.join('\n') || body;
        return `${header}\n${chunked}\n${footer}\n`;
      }
    }
  }

  return str;
}

/**
 * DEVTALKS '26 - Serverless Google Sheets Prediction Submission Endpoint
 * Target Endpoint: POST /api/submit-guess
 */
export default async function handler(req, res) {
  // Set CORS headers for security and browser compatibility
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { fullName, instagramId, department, speakerNumber, guess, clueTheory } = body;

    // 1. Strict Server-Side Validation & Sanitization
    const cleanName = (fullName || '').trim();
    let cleanInsta = (instagramId || '').trim();
    const cleanDept = (department || '').trim();
    const cleanSpeakerNum = (speakerNumber || '').trim();
    const cleanGuess = (guess || '').trim();
    const cleanClueTheory = (clueTheory || '').trim();

    if (!cleanName || !cleanInsta || !cleanDept || !cleanSpeakerNum || !cleanGuess) {
      return res.status(400).json({
        success: false,
        error: 'SUBMISSION FAILED. All required fields must be filled.'
      });
    }

    // Ensure valid speaker identifier ("01", "02", or "03")
    if (!['01', '02', '03'].includes(cleanSpeakerNum)) {
      return res.status(400).json({
        success: false,
        error: 'SUBMISSION FAILED. Invalid target speaker number.'
      });
    }

    // Format Instagram Handle
    if (!cleanInsta.startsWith('@')) {
      cleanInsta = `@${cleanInsta}`;
    }

    // Length constraints
    if (
      cleanName.length > 100 ||
      cleanInsta.length > 60 ||
      cleanDept.length > 60 ||
      cleanGuess.length > 150 ||
      cleanClueTheory.length > 500
    ) {
      return res.status(400).json({
        success: false,
        error: 'SUBMISSION FAILED. Field length limit exceeded.'
      });
    }

    // 2. Server-Side Generated Metadata
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const submissionId = `DT26-${randomHex}`;
    
    // Format timestamp in Indian Standard Time (IST)
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    // 3. Google Service Account Credentials Verification
    const rawEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;
    const rawSheetId = process.env.GOOGLE_SHEET_ID;

    if (!rawEmail || !rawPrivateKey || !rawSheetId) {
      console.error('[DEVTALKS API ERROR] Missing Google Sheets environment variables in server runtime.');
      return res.status(500).json({
        success: false,
        error: 'SUBMISSION FAILED. Server database credentials are not configured.'
      });
    }

    const serviceEmail = rawEmail.trim().replace(/^["']|["']$/g, '');
    const sheetId = rawSheetId.trim().replace(/^["']|["']$/g, '');
    const privateKey = extractAndCleanKey(rawPrivateKey);

    // 4. Authenticate with Google Sheets API (v4)
    const auth = new google.auth.JWT({
      email: serviceEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 5. Structure Exact Row: [Submission ID, Timestamp, Full Name, Instagram ID, Department, Speaker Number, Guess, Clue Theory]
    const rowValues = [
      submissionId,
      timestamp,
      cleanName,
      cleanInsta,
      cleanDept,
      cleanSpeakerNum, // "01", "02", or "03"
      cleanGuess,
      cleanClueTheory || 'N/A'
    ];

    // 6. Append Row to Google Sheet (A:H targets the active first sheet)
    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'A:H',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowValues]
      }
    });

    if (appendResponse.status !== 200 && appendResponse.status !== 201) {
      console.error('[DEVTALKS API ERROR] Unexpected Google Sheets response status:', appendResponse.status);
      return res.status(500).json({
        success: false,
        error: 'SUBMISSION FAILED. Could not write to Google Sheets.'
      });
    }

    // 7. Return Clean Success Response
    return res.status(200).json({
      success: true,
      submissionId,
      speakerNumber: cleanSpeakerNum,
      timestamp,
      message: 'PREDICTION LOGGED'
    });

  } catch (error) {
    // Log detailed technical information to server console only (never leak to client)
    console.error('[DEVTALKS API EXCEPTION]', error?.message || error);

    return res.status(500).json({
      success: false,
      error: 'SUBMISSION FAILED. Please try again.'
    });
  }
}
