import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import * as RadixRadioGroup from "@radix-ui/react-radio-group"
import React from "react"

export interface QuizQuestionProps extends RadixRadioGroup.RadioGroupProps {
  choices: string[]
}

export const QuizChoices = ({ choices, ...props }: QuizQuestionProps) => {
  return (
    <RadioGroup className="flex flex-col space-y-1" {...props}>
      {choices.map((choice, index) => (
        <FormItem className="flex items-center space-x-3 space-y-0">
          <FormControl>
            <RadioGroupItem value={choice} />
          </FormControl>
          <FormLabel className="font-normal">
            {choice.charAt(0).toUpperCase() + choice.slice(1)}
          </FormLabel>
        </FormItem>
      ))}
    </RadioGroup>
  )
}
