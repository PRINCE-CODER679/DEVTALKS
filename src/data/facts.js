/**
 * DEVTALKS '26 - Verified Mystery Speaker Facts
 * Chapters: The Domain, The Journey, The Numbers, The Connection
 */

export const factsData = [
  {
    id: 'fact-1',
    anchorId: 'fact-1',
    number: "01",
    totalFacts: "04",
    tag: "THE DOMAIN",
    title: "THE DOMAIN",
    text1: "They are someone who works at the intersection of technology and people.",
    text2: "Their work has changed how millions interact with the digital world.",
    image: "/clue-domain.jpg",
    metaLabels: ["TECHNOLOGY", "PEOPLE", "IMPACT"],
    btnText: "NEXT FACT",
    nextAnchor: "fact-2"
  },
  {
    id: 'fact-2',
    anchorId: 'fact-2',
    number: "02",
    totalFacts: "04",
    tag: "THE JOURNEY",
    title: "THE JOURNEY",
    text1: "Started with curiosity.",
    text2: "Built something people actually use. And eventually turned technology into a career.",
    image: "/clue-journey.jpg",
    metaLabels: ["CURIOUS", "BUILDER", "LEADER"],
    btnText: "NEXT FACT",
    nextAnchor: "fact-3"
  },
  {
    id: 'fact-3',
    anchorId: 'fact-3',
    number: "03",
    totalFacts: "04",
    tag: "THE NUMBERS",
    title: "THE NUMBERS",
    isNumbers: true,
    stats: [
      { number: "10+", label: "Years", sub: "of experience" },
      { number: "3+", label: "Companies", sub: "built / led" },
      { number: "1", label: "Mission", sub: "(which you'll know soon)" }
    ],
    image: "/clue-numbers.jpg",
    metaLabels: ["SCALE", "GROWTH", "VISION"],
    btnText: "NEXT FACT",
    nextAnchor: "fact-4"
  },
  {
    id: 'fact-4',
    anchorId: 'fact-4',
    number: "04",
    totalFacts: "04",
    tag: "THE CONNECTION",
    title: "THE CONNECTION",
    text1: "They believe in the power of education, innovation and community.",
    text2: "And are excited to share their journey with you — at DevTalks.",
    image: "/clue-connection.jpg",
    scriptText: "Ideas Worth Spreading.",
    metaLabels: ["COMMUNITY", "INNOVATION", "TALKS"],
    btnText: "MAKE YOUR GUESS",
    nextAnchor: "guess"
  }
];
