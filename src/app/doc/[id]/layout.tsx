import RoomProvider from '@/components/RoomProvider';
import React from 'react';
import { auth } from '@clerk/nextjs/server';


// Add explicit type definition for the layout component
async function Layout({children, params} : {children: React.ReactNode, params: Promise<{id : string}>}) {
  const id = (await (params)).id
  auth.protect()
  return (
    <RoomProvider roomId={id}>
      {children}
    </RoomProvider>
  )
}
export default Layout;

