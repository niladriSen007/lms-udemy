"use client"
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { BorderBeam } from "../magicui/border-beam";

export async function GradualSpacingDemo() {
  return (
    <div className="my-6 py-16 relative rounded-md ">
      <GradualSpacing
      className="font-display text-center text-4xl text-blue-700 font-bold tracking-[-0.1em]  py-16 dark:text-white md:text-7xl md:leading-[5rem]"
      text="Welcome to Alpha Vision."
    />
     <BorderBeam />
    </div>
  );
}
