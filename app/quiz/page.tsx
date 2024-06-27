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

const choices = ["hit", "stand", "double", "split", "surrender"]

const questions = [
  {
    dealer: "10",
    player: ["6", "5"],
  },
  {
    dealer: "10",
    player: ["6", "5"],
  },
  {
    dealer: "10",
    player: ["6", "5"],
  },
  {
    dealer: "10",
    player: ["6", "5"],
  },
  {
    dealer: "10",
    player: ["6", "5"],
  },
]

const QuizSchema = z.object({
  questions: z
    .array(
      z.object({
        answer: z.enum(["hit", "stand", "double", "split", "surrender"]),
      })
    )
    .length(5),
})

export default function Quiz() {
  const form = useForm<z.infer<typeof QuizSchema>>({
    resolver: zodResolver(QuizSchema),
  })

  function onSubmit(data: z.infer<typeof QuizSchema>) {
    console.log("Submitted data:", data)
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
        <div className="mt-10 space-y-8">
          <div className="bg-background rounded-lg p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                {questions.map((question, index) => (
                  <FormField
                    control={form.control}
                    name="questions"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <h2>Question {index + 1}</h2>
                        <FormLabel>
                          Dealer has a {question.dealer} card. You have the{" "}
                          {question.player} cards.
                        </FormLabel>
                        <FormControl>
                          <QuizChoices
                            choices={choices}
                            onValueChange={field.onChange}
                            // defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
