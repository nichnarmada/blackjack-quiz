import { Quiz, QuizResult, QuizSubmission } from "@/types/quiz"
import axios from "axios"

export const getQuiz = (): Promise<Quiz> =>
  axios
    .get("http://localhost:3000/api/quiz")
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
    })

export const submitQuiz = (input: QuizSubmission): Promise<QuizResult> =>
  axios
    .post("http://localhost:3000/api/quiz/submit", input)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
    })
