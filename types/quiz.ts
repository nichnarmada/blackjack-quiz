import { z } from "zod"

export type question = {
  dealer: string
  player: string[]
}

export type questionList = {
  q1: question
  q2: question
  q3: question
  q4: question
  q5: question
}

export const choices = z.enum(["hit", "stand", "double", "split", "surrender"])
