// import { NextRequest, NextResponse } from "next/server"
// import { createClient } from "@/utils/supabase/client"
// import { QuizResult, QuizSubmission } from "@/types/quiz"

// async function evaluateQuiz(
//   quizSubmission: QuizSubmission
// ): Promise<QuizResult | null> {
//   const supabase = createClient()

//   const questionIds = quizSubmission.submission?.map(
//     (submissionItem) => submissionItem.questionId
//   )

//   const { data: questionEntries, error } = await supabase
//     .from("blackjack_questions")
//     .select("*")
//     .in("id", questionIds)

//   if (error) {
//     console.error("Error fetching data:", error)
//     return null
//   }

//   const answers = quizSubmission.submission?.map((s) => ({
//     ...s,
//     correctAnswer: questionEntries.find((entry) =>
//       entry.is_das_dependent ? entry.correct_move_no_das : entry.correct_move
//     ),
//   }))

//   const score = answers?.filter((s) => s.answer === s.correctAnswer).length

//   return {
//     // userId: string,
//     // quizId: string,
//     answers: answers,
//     correctAnswersCount: score,
//     createdAt: new Date().toISOString(),
//   }
// }

// export async function POST(request: NextRequest) {
//   const quizAnswers = await request.json()
//   const result = await evaluateQuiz(quizAnswers)

//   console.log(result)

//   return NextResponse.json(result, { status: 200 })
// }

// import { NextRequest, NextResponse } from "next/server"
// import { QuestionAPI, QuizResult, QuizSubmission } from "@/types/quiz"
// import { createClient } from "@/utils/supabase/client"

// export async function POST(request: NextRequest) {
//   const supabase = createClient()
//   const quizAnswers: QuizSubmission = await request.json()

//   // Check if user is authenticated
//   const {
//     data: { user },
//   } = await supabase.auth.getUser()
//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   const questionIds = quizAnswers.submission?.map(
//     (submissionItem) => submissionItem.questionId
//   )

//   const { data: questionsData, error: questionsDataError } = await supabase
//     .from("blackjack_questions")
//     .select("*")
//     .in("id", questionIds)

//   const questionEntries = questionsData as QuestionAPI[] | null

//   if (questionsDataError) {
//     console.error("Error fetching data:", questionsDataError)
//     return null
//   }

//   const answers = quizAnswers.submission?.map((s) => ({
//     ...s,
//     correctAnswer: questionEntries?.find((entry) => entry.id === s.questionId)
//       ?.correct_move,
//   }))

//   const score = answers?.filter((s) => s.answer === s.correctAnswer).length || 0

//   const result = {
//     answers: answers,
//     correctAnswersCount: score,
//     createdAt: new Date().toISOString(),
//   }

//   // const result = await evaluateQuiz(quizAnswers, supabase)

//   if (!result) {
//     return NextResponse.json(
//       { error: "Failed to evaluate quiz" },
//       { status: 500 }
//     )
//   }

//   // Insert the quiz submission
//   const { data, error } = await supabase
//     .from("quiz_submissions")
//     .insert({
//       user_id: user.id,
//       quiz_id: quizAnswers.quizId,
//       score: result.correctAnswersCount,
//       answers: result.answers,
//     })
//     .select()
//     .single()

//   if (error) {
//     console.error("Error inserting quiz submission:", error)
//     return NextResponse.json(
//       { error: "Failed to save quiz submission" },
//       { status: 500 }
//     )
//   }

//   return NextResponse.json({ submissionId: data.id }, { status: 200 })
// }

import { NextRequest, NextResponse } from "next/server"
import { QuestionAPI, QuizSubmission } from "@/types/quiz"
import { createClient } from "@/utils/supabase/client"

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const quizAnswers: QuizSubmission = await request.json()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const questionIds = quizAnswers.submission?.map(
    (submissionItem) => submissionItem.questionId
  )

  if (!questionIds || questionIds.length === 0) {
    return NextResponse.json(
      { error: "No question IDs provided" },
      { status: 400 }
    )
  }

  const { data: questionsData, error: questionsDataError } = await supabase
    .from("blackjack_questions")
    .select("*")
    .in("id", questionIds)

  if (questionsDataError) {
    console.error("Error fetching data:", questionsDataError)
    return NextResponse.json(
      { error: "Error fetching quiz questions" },
      { status: 500 }
    )
  }

  const questionEntries = questionsData as QuestionAPI[] | null

  const answers = quizAnswers.submission?.map((s) => ({
    ...s,
    correctAnswer: questionEntries?.find((entry) => entry.id === s.questionId)
      ?.correct_move,
  }))

  const score = answers?.filter((s) => s.answer === s.correctAnswer).length || 0

  const result = {
    answers: answers,
    correctAnswersCount: score,
    createdAt: new Date().toISOString(),
  }

  if (!result) {
    return NextResponse.json(
      { error: "Failed to evaluate quiz" },
      { status: 500 }
    )
  }

  // Insert the quiz submission
  const { data, error } = await supabase
    .from("quiz_submissions")
    .insert({
      user_id: user.id,
      quiz_id: quizAnswers.quizId,
      score: result.correctAnswersCount,
      answers: result.answers,
    })
    .select()
    .single()

  if (error) {
    console.error("Error inserting quiz submission:", error)
    return NextResponse.json(
      { error: "Failed to save quiz submission" },
      { status: 500 }
    )
  }

  return NextResponse.json({ submissionId: data.id }, { status: 200 })
}
