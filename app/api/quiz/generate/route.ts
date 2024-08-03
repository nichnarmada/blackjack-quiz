import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/client"
import { QuestionAPI } from "@/types/quiz"

type DailyQuiz = {
  id: string
  date: string
  question_ids: number[]
}

export default async function handler(req: NextRequest) {
  const supabase = createClient()

  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
  }

  try {
    // Get all question IDs
    const { data: questions, error: questionsError } = await supabase
      .from("blackjack_questions")
      .select("id")
      .returns<QuestionAPI[]>()

    if (questionsError) throw questionsError

    // Randomly select 10 question IDs
    const selectedQuestionIds = questions
      .sort(() => 0.5 - Math.random())
      .slice(0, 10)
      .map((q) => q.id)

    // Insert new daily quiz
    const { data: quiz, error: quizError } = await supabase
      .from("daily_quizzes")
      .insert({
        date: new Date().toISOString().split("T")[0],
        question_ids: selectedQuestionIds,
      })
      .select()
      .single<DailyQuiz>()

    if (quizError) throw quizError

    NextResponse.json(
      { message: "Daily quiz generated successfully", quiz },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error generating daily quiz:", error)
    NextResponse.json(
      { message: "Error generating daily quiz" },
      { status: 500 }
    )
  }
}
