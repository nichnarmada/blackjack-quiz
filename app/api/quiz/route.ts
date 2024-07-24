import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/client"
import { questions } from "./data"

export async function GET(request: NextRequest) {
  // const supabase = createClient()

  const dailyQuiz = {
    id: Date().toString(),
    createdAt: Date().toString(),
    questions: questions.map(({ id, dealer_card, player_hand, options }) => ({
      id,
      dealer_card,
      player_hand,
      options,
    })),
  }

  return NextResponse.json(dailyQuiz, { status: 200 })
}
