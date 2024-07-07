import Sidebar from "@/components/layouts/Sidebar"
import Navbar from "@/components/Navbar/Navbar"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
const InstructorLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/sign-in")
  }
  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
export default InstructorLayout
