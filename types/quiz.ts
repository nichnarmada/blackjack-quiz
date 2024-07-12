import { z } from "zod"

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: string
}

export interface Quiz {
  id: string
  questions: QuizQuestion[]
  createdAt: string
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

export const quizOptions = z.enum([
  "hit",
  "stand",
  "double",
  "split",
  "surrender",
])
export type QuizOptions = z.infer<typeof quizOptions>
