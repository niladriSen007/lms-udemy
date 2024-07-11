"use client"

import { BarChart4, MonitorPlay } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Sidebar = () => {
  const pathname = usePathname()

  const sidebarRoutes = [
    { icon: <MonitorPlay />, label: "Courses", path: "/instructor/courses" },
    {
      icon: <BarChart4 />,
      label: "Performance",
      path: "/instructor/performance",
    },
  ]

  return (
    <div className="max-sm:hidden flex h-screen flex-col w-64 border-r shadow-md px-3 my-4 gap-4 text-sm font-medium fixed  left-0 top-20">
      {sidebarRoutes.map((route) => (
        <Link
          href={route.path}
          key={route.path}
          className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 
          ${
            pathname.startsWith(route.path)
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "hover:bg-slate-300 hover:text-gray-600"
          }
          `}
        >
          {route.icon} {route.label}
        </Link>
      ))}
    </div>
  )
}

export default Sidebar
