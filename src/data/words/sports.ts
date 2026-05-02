import type { WordPack } from "./index";

export const pack: WordPack = {
  id: "sports",
  name: "Sports",
  subPacks: [
    {
      id: "all",
      label: "All",
      words: [
        { id: 1, hint: "The world's most popular ball sport", answer: "FOOTBALL" },
        { id: 2, hint: "A bat-and-ball sport popular in South Asia", answer: "CRICKET" },
        { id: 3, hint: "A racket sport played with a shuttlecock", answer: "BADMINTON" },
        { id: 4, hint: "Moving through water using your body", answer: "SWIMMING" },
        { id: 5, hint: "Racing or riding on two wheels", answer: "CYCLING" },
        { id: 6, hint: "The sport of shooting arrows at a target", answer: "ARCHERY" },
        { id: 7, hint: "A combat sport fought with gloved fists", answer: "BOXING" },
        { id: 8, hint: "A sword-fighting sport in the Olympics", answer: "FENCING" },
        { id: 9, hint: "A sport of grappling and pinning opponents", answer: "WRESTLING" },
        { id: 10, hint: "A net sport where teams spike and block", answer: "VOLLEYBALL" },
      ],
    },
  ],
};
