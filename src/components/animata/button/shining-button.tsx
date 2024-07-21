import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export default function ShiningButton({
  label,
  path,
  url,
}: {
  label: string
  path: string
  url: string
}) {
  return (
    <button className="group cursor-pointer rounded-xl border-nonne border-orange-800 border-opacity-0 bg-transparent p-1 transition-all duration-500 hover:border-opacity-100">
      <div
        className={`relative flex items-center justify-center gap-4 overflow-hidden rounded-lg ${
          url == path ? "bg-gradient-to-r from-sky-400 to-blue-700 shadow-lg " : "bg-slate-500"
        } px-6 py-1.5 font-bold text-white`}
      >
        {label}
        <ArrowRight className="transition-all" />
        <div
          className={cn(
            "absolute -left-16 top-0 h-full w-12 rotate-[30deg] scale-y-150 bg-white/10 transition-all duration-700 group-hover:left-[calc(100%+1rem)]"
          )}
        />
      </div>
    </button>
  )
}
