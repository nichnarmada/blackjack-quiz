import { LoaderCircle } from "lucide-react"

export const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <LoaderCircle className="animate-spin mr-2" /> Loading
    </div>
  )
}
