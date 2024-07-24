"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  quizOptions,
  quizOptionsEnum,
  QuizSubmission,
  type Quiz,
} from "@/types/quiz"
import { Loading } from "@/components/blocks/loading"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getQuiz, submitQuiz } from "./methods"

// Schema for the entire quiz form submission
export const QuizSchema = z.object({
  q1: quizOptionsEnum,
  q2: quizOptionsEnum,
  q3: quizOptionsEnum,
  q4: quizOptionsEnum,
  q5: quizOptionsEnum,
})

export default function Quiz() {
  const router = useRouter()

  // Queries
  const {
    data: quizData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["quiz"],
    queryFn: getQuiz,
  })
  const mutation = useMutation({
    mutationFn: submitQuiz,
  })

  // Forms
  const form = useForm<z.infer<typeof QuizSchema>>({
    resolver: zodResolver(QuizSchema),
  })
  function onSubmit(data: z.infer<typeof QuizSchema>) {
    // Re-map data to have dealer and player cards from question, and submitted answer
    const quizSubmission = {
      submission: quizData?.questions.map((q, index) => {
        return {
          question: q.question,
          answer: data[`q${index + 1}`],
        }
      }),
    }

    mutation.mutate(quizSubmission)
    // // Send POST request
    // console.log("Submitted quiz data:", quizSubmission)
    // trigger(quizSubmission)
    // // Pass the results response to results page
    // router.push("/result", {
    //   query: { result: JSON.stringify(resultData) }, // Pass data through query string
    // })
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
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
                    name={`q${index + 1}`}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <h2>Question {index + 1}</h2>
                        <FormLabel>
                          Dealer has the {question.question.dealer} card. You
                          have the {question.question.player[0]} and{" "}
                          {question.question.player[1]} cards.
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            className="flex flex-col space-y-1"
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            {quizOptions.map((option) => (
                              <FormItem
                                key={option}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem value={option} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option.charAt(0).toUpperCase() +
                                    option.slice(1)}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
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
