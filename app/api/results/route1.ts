// import { NextRequest, NextResponse } from "next/server"
// import { createClient } from "@/utils/supabase/client"
// import { QuizResult, Quiz } from "@/types/quiz"

// export async function POST(req: NextRequest) {
//   const body = await req.json()
//   const { userId, quizId, answers }: QuizResult = body

//   const supabase = createClient()

//   const { data: quiz, error: quizError } = await supabase
//     .from<Quiz>("quizzes")
//     .select("*")
//     .eq("id", quizId)
//     .single()

//   if (quizError) {
//     return NextResponse.json({ error: quizError.message }, { status: 500 })
//   }

//   let correctAnswersCount = 0

//   answers.forEach((answer) => {
//     const question = quiz.questions.find((q) => q.id === answer.questionId)
//     if (question && question.correctAnswer === answer.selectedAnswer) {
//       correctAnswersCount++
//     }
//   })

//   const { error } = await supabase.from("results").insert([
//     {
//       userId,
//       quizId,
//       answers,
//       correctAnswersCount,
//       createdAt: new Date().toISOString(),
//     },
//   ])

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }

//   return NextResponse.json({ correctAnswersCount }, { status: 200 })
// }

// export const runtime = "edge"
