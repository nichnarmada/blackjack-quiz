import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/client"
import { quizzes } from "./data"
import { QuizSchema } from "@/app/quiz/page"

export async function GET(request: NextRequest) {
  // const supabase = createClient()

  const dailyQuiz = quizzes.questions.map(({ id, question, options }) => ({
    id,
    question,
    options,
  }))

  // Validate the data
  // try {
  //   QuizSchema.parse({ questions: dailyQuiz })
  // } catch (error) {
  //   // return new Response(JSON.stringify({ error: error.errors }), {
  //   //   status: 400,
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   // })
  //   return NextResponse.json({ error: error.message }, { status: 500 })
  // }

  return NextResponse.json(dailyQuiz, { status: 200 })
}
