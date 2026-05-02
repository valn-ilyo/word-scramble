import type { WordPack } from "./index";

export const pack: WordPack = {
  id: "animals",
  name: "Animals",
  subPacks: [
    {
      id: "all",
      label: "All",
      words: [
        { id: 1, hint: "The largest land animal on Earth", answer: "ELEPHANT" },
        { id: 2, hint: "The tallest animal in the world", answer: "GIRAFFE" },
        { id: 3, hint: "A flightless bird that swims", answer: "PENGUIN" },
        { id: 4, hint: "An intelligent marine mammal", answer: "DOLPHIN" },
        { id: 5, hint: "A large dark-colored big cat", answer: "PANTHER" },
        { id: 6, hint: "A spotted big cat found in Africa and Asia", answer: "LEOPARD" },
        { id: 7, hint: "The fastest land animal", answer: "CHEETAH" },
        { id: 8, hint: "The largest living primate", answer: "GORILLA" },
        { id: 9, hint: "A large bovine also called bison", answer: "BUFFALO" },
        { id: 10, hint: "An eight-armed sea creature", answer: "OCTOPUS" },
      ],
    },
  ],
};
