export type question = {
  dealer: string
  player: string[]
}

export interface Question {
  id: number
  question: question
  options: string[]
  correctAnswer: string
}

export interface Quiz {
  id: number
  questions: Question[]
  createdAt: string
}

export const options = ["hit", "stand", "double", "split", "surrender"]

export const questions: Question[] = [
  {
    id: 1,
    question: {
      dealer: "A",
      player: ["5", "6"],
    },
    options,
    correctAnswer: "double",
  },
  {
    id: 2,
    question: {
      dealer: "J",
      player: ["K", "6"],
    },
    options,
    correctAnswer: "hit",
  },
  {
    id: 3,
    question: {
      dealer: "8",
      player: ["4", "K"],
    },
    options,
    correctAnswer: "hit",
  },
  {
    id: 4,
    question: {
      dealer: "9",
      player: ["7", "3"],
    },
    options,
    correctAnswer: "double",
  },
  {
    id: 5,
    question: {
      dealer: "9",
      player: ["K", "Q"],
    },
    options,
    correctAnswer: "stand",
  },
]
