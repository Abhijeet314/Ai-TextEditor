'use client'
import React from 'react'
import {LiveblocksProvider} from "@liveblocks/react/suspense"

function LiveBlocksProvider({children}: {children: React.ReactNode}) {
  console.log("Liveblocks Public Key:", process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY);

    if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
        throw new Error("Key not set")
    }
  return (
    <div>
        <LiveblocksProvider
        throttle={16} authEndpoint={"/auth-endpoint"}>
        {children}
        </LiveblocksProvider>
        {/* throttle gives you fps like how smooth collaborations will be  */}
        {/* auth-endpoint is for connecting with firestore for rooms */}
    </div>
  )
} 

export default LiveBlocksProvider