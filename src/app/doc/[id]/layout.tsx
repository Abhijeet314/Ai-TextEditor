import RoomProvider from '@/components/RoomProvider';
import React from 'react';
import { auth } from '@clerk/nextjs/server';

// Add explicit type definition for the layout component
function layout({children, params: {id}} : {children: React.ReactNode, params: {id: string}}) {
  auth.protect()
  return (

    <RoomProvider roomId={id}>
      {children}
    </RoomProvider>
  )
}
export default layout;

