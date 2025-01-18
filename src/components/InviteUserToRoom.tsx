'use client'
import { useRoom } from '@liveblocks/react'
import React, { FormEvent, useState, useTransition } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button'
import { DialogClose } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { deleteDocument, InviteUser } from '../../actions/actions'
import { toast } from 'sonner'
import { Input } from './ui/input'


function InviteUserToRoom() {
    const [isOpen, SetIsOpen] = useState(false);
    const [email, SetEmail] = useState("");
    const [isPending, startTranistion] = useTransition();
    const room = useRoom()
    const handleInvite = async (e:FormEvent) => {
        e.preventDefault()
        const roomId = room.id;
        if(!roomId) {
            return null
        }
        startTranistion(async() => {
            const {success} = await InviteUser(roomId, email);
            
            if(success) {
                SetIsOpen(false);
                SetEmail("")
                toast.success("Invited Successfully")
            } else {
                toast.error("Error occured during invitation")
            }
        })
    }

  return (
    <Dialog open={isOpen} onOpenChange={SetIsOpen}>
        <Button asChild variant="outline">
          <DialogTrigger>Invite</DialogTrigger>
        </Button>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Invite to an user</DialogTitle>
                <DialogDescription>
                    Inviting a user to your document for playing...
                </DialogDescription>
                </DialogHeader>
            <form
            className='flex gap-2'
              onSubmit={handleInvite}
            >
            <Input 
            type='email'
            placeholder='Email'
            className='w-full'
            value={email}
            onChange= {(e) => {
                SetEmail(e.target.value)
            }}
            />

            <Button type='submit' disabled={isPending}> 
                {isPending ? "Inviting..." : "Invite"}
            </Button>
            </form>
            </DialogContent>
          

</Dialog>

  )
}

export default InviteUserToRoom