'use client'

import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useState} from "react";
import Link from "next/link";

const SubmitPrompt = ({className}: {className:string}) => {
    const [prompt, setPrompt] = useState<string>("")
  return (
      <section className={cn("z-10 w-full flex flex-col",className)}>
          <h1 className={"font-medium text-[#1e1e2e]"}>
              Write a topic on which you want to generate a PPT
          </h1>
       <div className={"flex flex-row w-full items-center"}>
           <Textarea
               value={prompt}
               onChange={(e)=>setPrompt(e.target.value)}
               className={"mr-2 my-2 border-[#1e1e2e]"}
               placeholder={"Enter your prompt"}/>
          <Link href={`/ppt/${encodeURIComponent(prompt)}`}>
              <Button className={"bg-[#1e1e2e] border-[#a7a9f7] hover:bg-[#5d8ff0]"}>
                  Submit
              </Button>
          </Link>
       </div>
      </section>
  )
}
export default SubmitPrompt
