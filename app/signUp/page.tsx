import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { signup } from "./actions"

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign up for QuizSite
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Create an account to start taking quizzes and testing your
            knowledge.
          </p>
        </div>
        <form className="space-y-6" action="#" method="POST">
          {/* <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-muted-foreground"
            >
              Name
            </Label>
            <div className="mt-1">
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                placeholder="John Doe"
              />
            </div>
          </div> */}
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground"
            >
              Email address
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-muted-foreground"
            >
              Password
            </Label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
          <div>
            <Button
              formAction={signup}
              type="submit"
              className="flex w-full justify-center py-2 px-4"
            >
              Sign up
            </Button>
          </div>
        </form>
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button asChild variant="link">
            <Link href="/login" prefetch={false}>
              Sign in
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
