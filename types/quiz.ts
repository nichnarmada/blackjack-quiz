import { z } from "zod"

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
