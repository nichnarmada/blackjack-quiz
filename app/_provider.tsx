"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function Provider({ children }: { children: ReactNode }) {
  // Create a client
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
