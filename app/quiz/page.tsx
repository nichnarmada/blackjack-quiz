/**
 * v0 by Vercel.
 * @see https://v0.dev/t/7C8G4m4XH5R
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Quiz Time</h1>
          <p className="text-muted-foreground">
            Test your knowledge with our fun and challenging quiz!
          </p>
        </div>
        <div className="mt-10 space-y-8">
          <div className="bg-background rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Question 1</h2>
            <p className="mb-4">What is the capital city of France?</p>
            <div className="grid grid-cols-1 gap-4">
              <button className="bg-muted rounded-md px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors">
                Paris
              </button>
              <button className="bg-muted rounded-md px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors">
                London
              </button>
              <button className="bg-muted rounded-md px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors">
                Madrid
              </button>
              <button className="bg-muted rounded-md px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors">
                Berlin
              </button>
            </div>
            <div className="mt-6 flex justify-end">
              <Button>Next</Button>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-2xl font-bold">Your Score: 0/1</p>
        </div>
      </div>
    </div>
  )
}
