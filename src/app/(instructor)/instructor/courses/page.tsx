import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"
import { Plus } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import ShimmerButton from "@/components/magicui/shimmer-button"

const CoursesPage = () => {
  const { userId } = auth()
  if (!userId) return redirect("/sign-in")
  return (
    <div className="px-6 py-4">
      <Link href="/instructor/createcourse">
        <ShimmerButton
          className="shadow-2xl px-4 py-1"
          borderRadius={"10px"}
          shimmerColor={"#1F51FF"}
          shimmerSize={"0.05em"}
          background={"#32CD32"}
        >
          <span className="flex items-center whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            <Plus /> Create new course
          </span>
        </ShimmerButton>
      </Link>

      <div className="mt-5"></div>
    </div>
  )
}
export default CoursesPage
