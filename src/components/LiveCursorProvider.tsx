'use client'

import { useMyPresence,  useOthers } from '@liveblocks/react'
import React, { PointerEvent } from 'react'
import FollowPointer from './FollowPointer'

function LiveCursorProvider({children} : {children : React.ReactNode}) {
    // usePresence will handle the cursor movements
    const [presence, updatePresence] = useMyPresence()
    const others = useOthers()

    const handlePointerMove = (e : PointerEvent<HTMLDivElement>) => {
        const cursor = {x: Math.floor(e.pageX), y : Math.floor(e.pageY)}
        console.log(presence)
        updatePresence({cursor})
    }

    const handlePointerLeave = () => {
        updatePresence({cursor: null})
    }
  return (
    <div
    onPointerMove={handlePointerMove}
    onPointerLeave={handlePointerLeave}
    >
        {/* Render cursors */}
        {others.filter((other) => other.presence.cursor != null).map(({connectionId, info, presence}) => (
            <FollowPointer 
            key={connectionId}
            info={info}
            x = {presence.cursor!.x}
            y= {presence.cursor!.y}
            />
        ))}
        {children}
    </div>
  )
}

export default LiveCursorProvider