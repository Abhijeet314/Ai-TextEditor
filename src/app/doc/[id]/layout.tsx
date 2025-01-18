import RoomProvider from '@/components/RoomProvider';
import React from 'react';
import { auth } from '@clerk/nextjs/server';
import {use} from "react"

// Add explicit type definition for the layout component
function layout({children, params} : {children: React.ReactNode, params: Promise<{id : string}>}) {
  const {id} = use(params)
  auth.protect()
  return (

    <RoomProvider roomId={id}>
      {children}
    </RoomProvider>
  )
}
export default layout;

