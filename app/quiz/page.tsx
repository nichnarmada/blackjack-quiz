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
import { questionList } from "@/types/quiz"

const choices = ["hit", "stand", "double", "split", "surrender"]

const questions: questionList = {
  q1: {
    dealer: "10",
    player: ["6", "5"],
  },
  q2: {
    dealer: "10",
    player: ["6", "5"],
  },
  q3: {
    dealer: "10",
    player: ["6", "5"],
  },
  q4: {
    dealer: "10",
    player: ["6", "5"],
  },
  q5: {
    dealer: "10",
    player: ["6", "5"],
  },
}

const QuizSchema = z.object({
  q1: z.enum(["hit", "stand", "double", "split", "surrender"]),
  q2: z.enum(["hit", "stand", "double", "split", "surrender"]),
  q3: z.enum(["hit", "stand", "double", "split", "surrender"]),
  q4: z.enum(["hit", "stand", "double", "split", "surrender"]),
  q5: z.enum(["hit", "stand", "double", "split", "surrender"]),
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
                {Object.entries(questions).map(([key, value], index) => (
                  <FormField
                    control={form.control}
                    name={key as keyof questionList}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <h2>Question {index + 1}</h2>
                        <FormLabel>
                          Dealer has a {value.dealer} card. You have the{" "}
                          {value.player} cards.
                        </FormLabel>
                        <FormControl>
                          <QuizChoices
                            choices={choices}
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
