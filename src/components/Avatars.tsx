'use client'
import { useOthers, useSelf } from '@liveblocks/react'
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function Avatars() {
    const self = useSelf()
    const others = useOthers()
    const all = [self, ...others]
  return (
    <div className='flex items-center gap-2'>
        <p className='font-light '>Users currently editing the document</p>
        <div className='flex -space-x-5'>
            {all.map((other, i) => (
                <TooltipProvider key={other?.id}>
                <Tooltip>
                    <TooltipTrigger>
                <Avatar className='border-2 hover:z-50'>
                    <AvatarImage src={other?.info.avatar} />
                    <AvatarFallback>{other?.info.name}</AvatarFallback>
                    </Avatar>
                    </TooltipTrigger>
                  <TooltipContent>
                    <p>{self?.id == other?.id ? "You" : other?.info.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
        </div>
    </div>
  )
}

export default Avatars