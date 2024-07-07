"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronsDown, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboBoxProps {
  options: { label: string; value: string }[]
  value?: string
  onChange: (value: string) => void
  field?: string
}

export function Combobox({ options, value, onChange,field }: ComboBoxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between border border-gray-300"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : `${ field == "subCategory" ? "Select sub category..." :"Select category..."}`}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 border border-gray-300">
        <Command>
          <CommandInput placeholder={`${ field == "subCategory" ? "Search sub category..." :"Search category..."}`} />
          <CommandEmpty>${ field == "subCategory" ? "No sub category found." :"No category found."}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                className="cursor-pointer border-b border-slate-300/80"
                value={option.value}
                onSelect={() => {
                  onChange(option.value === value ? "" : option.value)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
