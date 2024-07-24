export interface QuestionAPI {
  id: number
  created_at?: Date
  dealer_card: string
  player_hand: string[]
  correct_move: string
  correct_move_no_das?: string
  is_das_dependent: boolean
}

export interface Question extends QuestionAPI {
  options: string[]
}

export interface Quiz {
  id: number
  questions: Question[]
  createdAt: string
}

export const options = ["hit", "stand", "double", "split", "surrender"]

export const questions: Question[] = [
  {
    id: 78,
    dealer_card: "A",
    player_hand: ["5", "6"],
    options,
    correct_move: "double",
    is_das_dependent: false,
  },
  {
    id: 916,
    dealer_card: "J",
    player_hand: ["6", "K"],
    options,
    correct_move: "hit",
    is_das_dependent: false,
  },
  {
    id: 650,
    dealer_card: "8",
    player_hand: ["4", "K"],
    options,
    correct_move: "hit",
    is_das_dependent: false,
  },
  {
    id: 717,
    dealer_card: "9",
    player_hand: ["3", "7"],
    options,
    correct_move: "double",
    is_das_dependent: false,
  },
  {
    id: 777,
    dealer_card: "9",
    player_hand: ["Q", "K"],
    options,
    correct_move: "stand",
    is_das_dependent: false,
  },
]
