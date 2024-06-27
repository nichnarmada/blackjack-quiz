import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="prose">
        <h2 className="">Blackjack Perfect Strategy Daily Quiz</h2>
        <h3>Welcome to the Ultimate Blackjack Quiz!</h3>
        <p>
          Test your knowledge and sharpen your skills with our daily quiz. Each
          day, you'll face new challenges designed to help you master the
          perfect strategy for playing Blackjack. Whether you're a beginner
          looking to learn the basics or an experienced player aiming to refine
          your tactics, this quiz is for you.
        </p>
        <h3>How It Works:</h3>
        <ul>
          <li>
            Daily Questions: Every day, a new set of questions will be
            available.
          </li>
          <li>
            Instant Feedback: Get immediate feedback on your answers to learn as
            you go.
          </li>
          <li>
            Track Progress: Monitor your progress over time and see how much
            you've improved.
          </li>
          <li>
            Compete and Compare: See how you stack up against other players.
          </li>
        </ul>
        <p>Are you ready to become a Blackjack pro? Let's get started!</p>
      </div>

      <div className="text-center">
        <Button size="lg" asChild>
          <Link href="/quiz">Start Today's Quiz!</Link>
        </Button>
      </div>
    </main>
  )
}
