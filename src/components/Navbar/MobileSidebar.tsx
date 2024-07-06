import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import Link from "next/link"
import { usePathname } from "next/navigation"
const MobileSidebar = () => {
  const topRoutes = [
    { label: "Instructor", path: "/instructor/courses" },
    { label: "Learning", path: "/learning" },
  ]
  const sidebarRoutes = [
    { label: "Courses", path: "/instructor/courses" },
    {
      label: "Performance",
      path: "/instructor/performance",
    },
  ]
  const pathName = usePathname()
  return (
    <div className="z-20 sm:hidden mt-2">
      <Sheet>
        <SheetTrigger>
          <Menu className="w-8 h-8" />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {topRoutes.map((route) => (
              <Link
                href={route.path}
                key={route.path}
                className="text-sm font-medium hover:text-[#FDAB04]"
              >
                {route.label}
              </Link>
            ))}
          </div>

          {pathName.startsWith("/instructor") && (
            <div className="flex flex-col gap-4">
              {sidebarRoutes.map((route) => (
                <Link
                  href={route.path}
                  key={route.path}
                  className="text-sm font-medium hover:text-[#FDAB04]"
                >
                  {route.label}
                </Link>
              ))}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
export default MobileSidebar
