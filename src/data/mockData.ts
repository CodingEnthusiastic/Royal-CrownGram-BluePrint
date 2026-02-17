import kingArthur from "@/assets/king-arthur.png";
import queenEleanor from "@/assets/queen-eleanor.png";
import princeEdward from "@/assets/prince-edward.png";
import postCastle from "@/assets/post-castle.png";
import postFeast from "@/assets/post-feast.png";
import postCoronation from "@/assets/post-coronation.png";
import postGarden from "@/assets/post-garden.png";

export interface RoyalUser {
  id: string;
  name: string;
  title: string;
  kingdom: string;
  avatar: string;
  coatOfArms: string;
  bio: string;
  alliances: number;
  subjects: number;
  decrees: number;
  posts: string[];
  isVerified: boolean;
}

export interface RoyalPost {
  id: string;
  userId: string;
  image: string;
  caption: string;
  formalCaption: string;
  timestamp: string;
  seals: number; // likes = wax seals
  endorsements: Endorsement[];
  isDecree: boolean;
  hasUserSealed: boolean;
}

export interface Endorsement {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
}

export const royalUsers: Record<string, RoyalUser> = {
  "king-arthur": {
    id: "king-arthur",
    name: "King Arthur III",
    title: "His Royal Majesty",
    kingdom: "Kingdom of Camelot",
    avatar: kingArthur,
    coatOfArms: "🦁",
    bio: "By the Grace of God, Sovereign of Camelot, Defender of the Realm, Protector of the Holy Grail. Reigning since MCMLXXXII.",
    alliances: 24,
    subjects: 15840,
    decrees: 7,
    posts: ["post-1", "post-3", "post-5"],
    isVerified: true,
  },
  "queen-eleanor": {
    id: "queen-eleanor",
    name: "Queen Eleanor II",
    title: "Her Royal Highness",
    kingdom: "Duchy of Aquitaine",
    avatar: queenEleanor,
    coatOfArms: "🦅",
    bio: "Sovereign Ruler of Aquitaine. Patron of the Arts & Sciences. Diplomat Extraordinaire. Est. MCMLXXXV.",
    alliances: 31,
    subjects: 12200,
    decrees: 12,
    posts: ["post-2", "post-4"],
    isVerified: true,
  },
  "prince-edward": {
    id: "prince-edward",
    name: "Prince Edward",
    title: "His Royal Highness",
    kingdom: "Principality of York",
    avatar: princeEdward,
    coatOfArms: "🐉",
    bio: "Heir Apparent to York. Knight of the Round Table. Champion of the Annual Joust. Est. MCMXC.",
    alliances: 18,
    subjects: 5600,
    decrees: 3,
    posts: ["post-6"],
    isVerified: true,
  },
};

export const royalPosts: RoyalPost[] = [
  {
    id: "post-1",
    userId: "king-arthur",
    image: postCastle,
    caption: "The Northern Fortress stands resolute against the twilight. A testament to our kingdom's enduring might.",
    formalCaption: "ROYAL COMMUNIQUÉ: His Majesty King Arthur III hereby presents the Northern Fortress of Camelot upon completion of renovations to the Eastern Tower. Long may it stand.",
    timestamp: "Anno Domini MMXXVI, 15th Day of February, 14:32:07 GMT",
    seals: 342,
    endorsements: [
      { id: "e1", userId: "queen-eleanor", userName: "Queen Eleanor II", text: "A magnificent edifice. Aquitaine sends its admiration.", timestamp: "15th Feb, 15:01 GMT" },
      { id: "e2", userId: "prince-edward", userName: "Prince Edward", text: "The craftsmen of Camelot have outdone themselves, Father.", timestamp: "15th Feb, 15:45 GMT" },
    ],
    isDecree: false,
    hasUserSealed: false,
  },
  {
    id: "post-2",
    userId: "queen-eleanor",
    image: postFeast,
    caption: "Tonight's Grand Banquet in honour of the Ambassador of the Eastern Realms. 47 courses served.",
    formalCaption: "OFFICIAL NOTICE: Her Royal Highness Queen Eleanor II hosted a State Banquet for the Ambassador of the Eastern Realms. All matters of diplomatic importance were discussed over 47 courses.",
    timestamp: "Anno Domini MMXXVI, 14th Day of February, 19:15:33 GMT",
    seals: 518,
    endorsements: [
      { id: "e3", userId: "king-arthur", userName: "King Arthur III", text: "A feast worthy of legend. Camelot extends its gratitude.", timestamp: "14th Feb, 20:30 GMT" },
    ],
    isDecree: false,
    hasUserSealed: true,
  },
  {
    id: "post-3",
    userId: "king-arthur",
    image: postCoronation,
    caption: "The Sacred Coronation Chamber. Where destiny meets divinity.",
    formalCaption: "ROYAL DECREE: Let it be known that the Sacred Coronation Chamber has been restored to its former glory. All subjects are invited to witness its splendor during the Festival of Crowns.",
    timestamp: "Anno Domini MMXXVI, 13th Day of February, 10:00:00 GMT",
    seals: 891,
    endorsements: [
      { id: "e4", userId: "queen-eleanor", userName: "Queen Eleanor II", text: "Aquitaine shall send a delegation to the Festival. We are most honoured.", timestamp: "13th Feb, 11:22 GMT" },
      { id: "e5", userId: "prince-edward", userName: "Prince Edward", text: "A sight to behold. The artisans have captured the essence of our lineage.", timestamp: "13th Feb, 12:05 GMT" },
    ],
    isDecree: true,
    hasUserSealed: false,
  },
  {
    id: "post-4",
    userId: "queen-eleanor",
    image: postGarden,
    caption: "The Royal Gardens of Aquitaine in full bloom. Nature bows to beauty.",
    formalCaption: "COMMUNIQUÉ FROM AQUITAINE: Her Majesty's Royal Gardens have entered their spring magnificence. The Queen invites allied kingdoms to partake in the Blossom Festival.",
    timestamp: "Anno Domini MMXXVI, 12th Day of February, 08:45:12 GMT",
    seals: 276,
    endorsements: [],
    isDecree: false,
    hasUserSealed: false,
  },
  {
    id: "post-5",
    userId: "king-arthur",
    image: postCastle,
    caption: "Fortifications complete. The realm is secure.",
    formalCaption: "ROYAL DECREE: By order of His Majesty, the Western Wall fortifications are hereby declared complete. All knights are to report for inspection at dawn.",
    timestamp: "Anno Domini MMXXVI, 11th Day of February, 16:20:45 GMT",
    seals: 654,
    endorsements: [
      { id: "e6", userId: "prince-edward", userName: "Prince Edward", text: "The knights stand ready, Your Majesty.", timestamp: "11th Feb, 17:00 GMT" },
    ],
    isDecree: true,
    hasUserSealed: true,
  },
  {
    id: "post-6",
    userId: "prince-edward",
    image: postCoronation,
    caption: "Preparing for the Grand Tournament. May honour guide our lances.",
    formalCaption: "NOTICE FROM YORK: His Royal Highness Prince Edward announces the Grand Tournament of York. Knights of all allied kingdoms are welcome to compete.",
    timestamp: "Anno Domini MMXXVI, 10th Day of February, 12:00:00 GMT",
    seals: 189,
    endorsements: [
      { id: "e7", userId: "king-arthur", userName: "King Arthur III", text: "Camelot shall send its finest. Prepare, my son.", timestamp: "10th Feb, 13:15 GMT" },
    ],
    isDecree: false,
    hasUserSealed: false,
  },
];
