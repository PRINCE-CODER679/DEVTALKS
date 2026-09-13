/**
 * DEVTALKS '26 - Daily Clues Data Structure
 * Exact copy and visual references from the official campaign design.
 */

export const cluesData = [
  {
    id: 1,
    number: "01",
    totalClues: "04",
    tag: "THE DOMAIN",
    title: "THE DOMAIN",
    text1: "They work at the intersection of technology and people.",
    text2: "Their work has changed how millions interact with the digital world.",
    image: "/clue-domain.jpg", // Abstract 3D fluid chrome mesh
    metaLabels: ["TECHNOLOGY", "PEOPLE", "IMPACT"],
    btnText: "NEXT CLUE"
  },
  {
    id: 2,
    number: "02",
    totalClues: "04",
    tag: "THE JOURNEY",
    title: "THE JOURNEY",
    text1: "Started with curiosity.",
    text2: "Built something people actually use. And eventually turned technology into a career.",
    image: "/clue-journey.jpg", // Dramatic winding road landscape
    metaLabels: ["CURIOUS", "BUILDER", "LEADER"],
    btnText: "NEXT CLUE"
  },
  {
    id: 3,
    number: "03",
    totalClues: "04",
    tag: "THE NUMBERS",
    title: "THE NUMBERS",
    isNumbers: true,
    stats: [
      { number: "10+", label: "Years", sub: "of experience" },
      { number: "3+", label: "Companies", sub: "built / led" },
      { number: "1", label: "Mission", sub: "(which you'll know soon)" }
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80", // Tech radar/grid network
    metaLabels: ["SCALE", "GROWTH", "VISION"],
    btnText: "NEXT CLUE"
  },
  {
    id: 4,
    number: "04",
    totalClues: "04",
    tag: "THE CONNECTION",
    title: "THE CONNECTION",
    text1: "They believe in the power of education, innovation and community.",
    text2: "And are excited to share their journey with you — at DevTalks.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80", // Auditorium stage keynote
    scriptText: "Ideas Worth Spreading.",
    metaLabels: ["COMMUNITY", "INNOVATION", "TALKS"],
    btnText: "READY TO GUESS"
  }
];
