import Image from "next/image"
import { Button } from "../ui/button"
import { AlarmClockCheck, CircleUser, GraduationCap } from "lucide-react"
import { MarqueeDemo } from "../custom/MarqueeDemo"
import Link from "next/link"

const Homepage = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-7 justify-center items-center my-24">
      <div className="flex flex-col gap-1 items-center justify-center">
        <span className="font-light">Anywhere access easy learning</span>
        <h1 className="text-6xl font-semibold ">The <span className="font-black text-blue-700 ">Best Platform</span> For Enhancing Your Skills</h1>
        <p>Working collaboratively to ensure every student achieves academically, scially and emotionaly.</p>
      </div>
      <div className="flex gap-4">
        <Link href={"/categories/all"}>
          <Button className="bg-transparent hover:bg-slate-200 border-2 border-slate-300 text-black">
            Search by category
          </Button>
        </Link>
        <Link href={"/courses"}>
          <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300">
            Explore Courses
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <GraduationCap /> <span>Learn Anywhere</span>
        </div>
        <div className="flex items-center gap-2">
          <AlarmClockCheck /> <span>Lifetime Access</span>
        </div>
        <div className="flex items-center gap-2">
          <CircleUser /> <span>Expert educator</span>
        </div>
      </div>
      <MarqueeDemo />
    </div>
  )
}
export default Homepage