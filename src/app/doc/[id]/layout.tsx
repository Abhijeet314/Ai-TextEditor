import RoomProvider from '@/components/RoomProvider';
import React from 'react';
import { auth } from '@clerk/nextjs/server';

async function layout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  // Access the id directly from params
  const { id } = params;

  // Protect the route
  auth.protect();

  return (
    <RoomProvider roomId={id}>
      {children}
    </RoomProvider>
  );
}

export default layout;
