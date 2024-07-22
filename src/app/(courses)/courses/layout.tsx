import Navbar from "@/components/Navbar/Navbar"
import { ReactNode } from "react"

const CourseLayout = ({children} : {children : ReactNode}) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
export default CourseLayout