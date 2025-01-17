import Navbar from "@/components/Navbar/Navbar"
import { ReactNode } from "react"

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  )
}
export default HomeLayout
