'use client'
import { useRoom } from '@liveblocks/react'
import React, { useState, useTransition } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button'

import { removeUserFromRoom } from '../../actions/actions'
import { toast } from 'sonner'

import { useUser } from '@clerk/nextjs'
import useOwner from '@/lib/useOwner'

import {collectionGroup, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'


function ManageUsers() {
    const [isOpen, SetIsOpen] = useState(false);
    const [isPending, startTranistion] = useTransition();
    const room = useRoom()
    const user = useUser()
    const isOwner = useOwner()
    const [usersInRoom] = useCollection(
        user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
    );
    
    const handledelete = async(userId: string) => {
        if(!userId) {
            return 
        }
        startTranistion(async() => {
            const {success} = await removeUserFromRoom(room.id, userId)
        
            if(success){
                toast.success("Delete the User from room Successfully")
            } else{
                toast.error("Error Deleting the User")
            }
        })
        
    }

  return (
    <Dialog open={isOpen} onOpenChange={SetIsOpen}>
        <Button asChild variant="outline">
          <DialogTrigger>Users ({usersInRoom?.docs.length})</DialogTrigger>
        </Button>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Access to Users</DialogTitle>
                <DialogDescription>
                    Below Users have access to the documents
                </DialogDescription>
                </DialogHeader>

                {/* looping through all users */}
                <div className='flex flex-col space-y-2'>
                    {usersInRoom?.docs.map((doc) => (
                        <div
                        key={doc.data().userId}
                        className='flex items-center justify-between'
                        >
                            <p className='font-light'>
                                {doc.data().userId === user?.user?.emailAddresses[0].toString() ? `You ${doc.data().userId}`: doc.data().userId}
                            </p>

                            <div className='flex items-center gap-2'>
                                <Button variant='outline' >
                                    {doc.data().role}
                                </Button>

                                {isOwner && doc.data().userId !== user?.user?.emailAddresses[0].toString() && (
                                    <Button
                                    variant="destructive"
                                    onClick={() => handledelete(doc.data().userId)}
                                    disabled={isPending}
                                    size="sm"
                                    >
                                        {isPending ? "Removing" : "X"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
          

</Dialog>

  )
}

export default ManageUsers