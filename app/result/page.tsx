export default function Quiz() {
  const correctAnswers = 4
  const totalQuestions = 5

  return (
    <div className="prose container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1>Quiz Results</h1>
        <h2>Congratulations for Completing the Quiz!</h2>
        <p>
          You`&apos;`ve just completed the Blackjack Perfect Strategy Daily
          Quiz. Let`&apos;`s see how well you did!
        </p>
        <h2>Your Score:</h2>
        <h1 className="text-center">
          {correctAnswers}/{totalQuestions}
        </h1>
        <p>
          You answered correctly {correctAnswers} out of {totalQuestions}{" "}
          questions!
        </p>
        <p>Accuracy: {(correctAnswers / totalQuestions) * 100}%</p>
      </div>
    </div>
  )
}
