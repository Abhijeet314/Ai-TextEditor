'use client'
import React, { useEffect, useState } from 'react'
import NewDocumentButton from './NewDocumentButton'
import { useCollection } from 'react-firebase-hooks/firestore';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import { useUser } from '@clerk/nextjs';
import { collectionGroup, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { DocumentData } from 'firebase-admin/firestore';
import SidebarOption from './SidebarOption';

interface RoomDocument extends DocumentData {
  createdAt: string,
  role: "owner" | "editor",
  roomId: string,
  userId: string
}

const Sidebar = () => {

  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[],
    editor: RoomDocument[]
  }>({
    owner: [],
    editor: []
  })

    const menuoptions = (
        <>
          <NewDocumentButton />

          {/* MyDocuments */}
          <div className='flex py-4 flex-col space-y-4 md:max-w-36'> 
            {groupedData.owner.length === 0 ? (
              <h2 className='text-black font-semibold text-sm'>No documents Found</h2>
              
            ): (
              <>
              <h2 className='text-gray-200 font-semibold text-sm'>
                My Documents
              </h2>
              {groupedData.owner.map((doc) => (
                <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`}/>
              ))}
               </>
            )}
             </div> 

             {/* Shared with me */}
             <div className='flex py-4 flex-col space-y-4 md:max-w-36'> 
            {groupedData.editor.length === 0 ? (
              <h2 className='text-black font-semibold text-sm'>No documents Found</h2>
              
            ): (
              <>
              <h2 className='text-black font-semibold text-sm'>
                Shared with me
              </h2>
              {groupedData.editor.map((doc) => (
                <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`}/>
              ))}
               </>
            )}
             </div> 
          
        </>
    );

const {user} = useUser();
const [data, loading, error] = useCollection(
  user && 
    query(
      collectionGroup(db,"rooms"),
      where("userId" , "==" , user.emailAddresses[0].toString())
  )
)



useEffect(() => {
  if (!data) return;
  const group = data.docs.reduce<{
    owner: RoomDocument[],
    editor: RoomDocument[]
  }>(
    (acc, curr) => {
      const roomData = curr.data() as RoomDocument
      if (roomData.role == "owner") {
        acc.owner.push({
          id: curr.id,
          ...roomData
        })
      }else{
        acc.editor.push({
          id: curr.id,
          ...roomData
        })
      }
      return acc
    }, {
      owner: [],
      editor: []
    }
  )
  setGroupedData(group)
}, [data])
  return (
    <div className='p-2 md:p-5 bg-gray-200 relative'>
        <div className='md:hidden lg:hidden'>
        <Sheet>
        <SheetTrigger>
            <MenuIcon 
            className='p-2 hover:opacity-30 rounded-lg'
            />
        </SheetTrigger>
        {/* from left side window will open */}
        <SheetContent side="left">  
            <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <div>
                {menuoptions}
            </div>
            <SheetDescription>
            </SheetDescription>
            </SheetHeader>
        </SheetContent>
        </Sheet>
        </div>
        {/* hidden in mobile screen because above one will execute and when medium and large screen normal one will appear */}
        <div className='hidden md:inline'>
           {menuoptions}
        </div> 
    </div>
  )
}

export default Sidebar