/**
 * Speaker profile data based on the campaign reference.
 */

// Helper to guarantee a valid future or current year September 30 countdown
function getSeptember30Target() {
  const now = new Date();
  const currentYear = now.getFullYear();
  let target = new Date(currentYear, 8, 30, 0, 0, 0); // Month 8 = September
  if (now.getTime() > target.getTime()) {
    target = new Date(currentYear + 1, 8, 30, 0, 0, 0);
  }
  return target.toISOString();
}

export const speakerData = {
  isRevealed: false,
  revealDateLabel: "SEPTEMBER 30",
  revealCountdownTarget: getSeptember30Target(),
  
  // Mystery Silhouette
  silhouetteImage: "/hero-silhouette.jpg",
  
  // Confirmed Speaker
  revealed: {
    name: "Kunal Shah",
    role: "Founder & CEO, CRED",
    tagline: "Building for a better financial future. One product at a time.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    scriptQuote: "Ideas Worth Spreading.",
    accentNote: "See you there!"
  },

  validKeywords: [
    "kunal shah",
    "kunal",
    "cred",
    "freecharge",
    "speaker name",
    "[speaker name]",
    "mystery speaker"
  ]
};
