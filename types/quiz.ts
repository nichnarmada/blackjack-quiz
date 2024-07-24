import { z } from "zod"

export interface QuestionAPI {
  id: number
  created_at: Date
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

export interface QuizSubmission {
  submission:
    | {
        questionId: number
        answer: string
      }[]
    | undefined
}

export interface QuizResult {
  userId: string
  quizId: string
  answers: {
    questionId: string
    selectedAnswer: string
  }[]
  correctAnswersCount: number
  createdAt: string
}

export const quizOptions = ["hit", "stand", "double", "split", "surrender"]

export const quizOptionsEnum = z.enum([
  "hit",
  "stand",
  "double",
  "split",
  "surrender",
])
export type QuizOptions = z.infer<typeof quizOptionsEnum>
