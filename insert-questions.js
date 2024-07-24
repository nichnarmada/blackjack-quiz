// insert-questions.ts

async function insertQuestions() {
  // Insert default questions (non-DAS dependent)
  for (const question of blackjackQuestions) {
    const { data, error } = await supabase.from("blackjack_questions").insert({
      player_hand: question.playerHand,
      dealer_card: question.dealerCard,
      correct_move_default: question.correctMove,
      correct_move_no_das: null,
      is_das_dependent: false,
    })

    if (error) {
      console.error("Error inserting default question:", error)
    } else {
      console.log("Default question inserted successfully:", data)
    }
  }

  // Insert DAS-dependent questions
  for (let i = 0; i < dasQuestions.length; i++) {
    const dasQuestion = dasQuestions[i]
    const noDasQuestion = noDasQuestions[i]

    const { data, error } = await supabase.from("blackjack_questions").insert({
      player_hand: dasQuestion.playerHand,
      dealer_card: dasQuestion.dealerCard,
      correct_move_default: dasQuestion.correctMove,
      correct_move_no_das: noDasQuestion.correctMove,
      is_das_dependent: true,
    })

    if (error) {
      console.error("Error inserting DAS-dependent question:", error)
    } else {
      console.log("DAS-dependent question inserted successfully:", data)
    }
  }
}

// Run the function
insertQuestions().then(() => console.log("Finished inserting questions"))
