import RoomProvider from '@/components/RoomProvider';
import React from 'react';
import { auth } from '@clerk/nextjs/server';

async function layout({ children, params }: { children: React.ReactNode; params: {id : string}}) {
  // Await the params to extract the id
  const {id} = await params
  // Protect the route
  auth.protect();

  return (
    <RoomProvider roomId={id}>
      {children}
    </RoomProvider>
  );
}

export default layout;
