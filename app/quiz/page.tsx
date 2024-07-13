"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { QuizChoices } from "./quizChoices"
import { redirect } from "next/navigation"
import { Question, quizOptions, type Quiz } from "@/types/quiz"
import { useEffect, useState } from "react"
import { getQuiz } from "./action"
import useSWR, { Fetcher } from "swr"
import { Loading } from "@/components/blocks/loading"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Schema for a single question's answer
export const questionAnswerSchema = z.object({
  questionId: z.number(),
  answer: quizOptions,
})

// Schema for the entire quiz form submission
export const QuizSchema = z.object({
  questions: z.array(questionAnswerSchema),
})

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([])

  const {
    data: quizData,
    error,
    isLoading,
  } = useSWR<Quiz, Error>("http://localhost:3000/api/quiz", fetcher)

  const form = useForm<z.infer<typeof QuizSchema>>({
    resolver: zodResolver(QuizSchema),
  })

  function onSubmit(data: z.infer<typeof QuizSchema>) {
    console.log("Submitted data:", data)
    redirect("/result")
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <p>Error</p>
  }

  return (
    <div className="prose container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Quiz Time</h1>
          <p className="text-muted-foreground">
            Test your knowledge with our fun and challenging quiz!
          </p>
        </div>
        <div className="mt-2 space-y-8">
          <div className="bg-background rounded-lg p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                {quizData?.questions.map((question, index) => (
                  <FormField
                    key={question.id}
                    control={form.control}
                    name={question.id.toString()}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <h2>Question {index + 1}</h2>
                        <FormLabel>
                          Dealer has a {question.question.dealer} card. You have
                          the {question.question.player[0]} and{" "}
                          {question.question.player[1]} cards.
                        </FormLabel>
                        <FormControl>
                          <QuizChoices
                            choices={question.options}
                            onValueChange={field.onChange}
                            // defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
                <FormMessage />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
