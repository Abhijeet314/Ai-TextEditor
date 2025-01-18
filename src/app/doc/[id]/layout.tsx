import RoomProvider from '@/components/RoomProvider';
import React from 'react';
import { auth } from '@clerk/nextjs/server';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  }
}

// Add explicit type definition for the layout component
const Layout = async ({ children, params }: LayoutProps) => {
  const { id } = params;
  
  // Protect the route
  await auth();  // Make sure to await the auth call

  return (
    <RoomProvider roomId={id}>
      {children}
    </RoomProvider>
  );
};

export default Layout;