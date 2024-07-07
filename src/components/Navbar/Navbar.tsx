"use client"
import { useAuth, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "../ui/button"
import MobileSidebar from "./MobileSidebar"
import SearchInput from "./SearchInput"

const Navbar = () => {
  const [searchInput, setsearchInput] = useState("")
  const { isSignedIn } = useAuth()
  const topRoutes = [
    { label: "Instructor", path: "/instructor/courses" },
    { label: "Learning", path: "/learning" },
  ]
  return (
    <div className="flex items-center justify-between px-8 h-16">
      <Link href={"/"}>
        <Image
          src="/av.png"
          width={2400}
          height={2400}
          className="w-12 h-12"
          alt="Logo for Alpha Vision Academy"
        />
      </Link>
      <SearchInput {...{ searchInput, setsearchInput }} />
      <div className="flex gap-6 items-center">
        <div className="max-sm:hidden flex gap-6">
          {topRoutes.map((route) => (
            <Link
              href={route.path}
              key={route.path}
              className="text-sm font-medium hover:text-blue-700"
            >
              {route.label}
            </Link>
          ))}
        </div>
        <MobileSidebar />
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
export default Navbar