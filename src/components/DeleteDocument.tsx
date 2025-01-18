'use client'
import { useRoom } from '@liveblocks/react'
import React, { useState, useTransition } from 'react'
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
import { deleteDocument } from '../../actions/actions'
import { toast } from 'sonner'

function DeleteDocument() {
    const [isOpen, SetIsOpen] = useState(false);
    const [isPending, startTranistion] = useTransition();
    const router = useRouter();
    const room = useRoom()
    const handleDelete = () => {
        const roomId = room.id;
        if(!roomId) {
            return null
        }
        startTranistion(async() => {
            const {success} = await deleteDocument(roomId);
            
            if(success) {
                SetIsOpen(false);
                router.replace("/")
                toast.success("Deleted Document Succesfully")
            } else {
                toast.error("Failed to delete document")
            }
        })
    }

  return (
    <Dialog open={isOpen} onOpenChange={SetIsOpen}>
        <Button asChild variant="destructive">
          <DialogTrigger>Delete</DialogTrigger>
        </Button>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action Will delete your document
                </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                    type='button'
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isPending}
                    >
                       {isPending ? "Deleting..." : "Delete"}
                    </Button>

                    <DialogClose asChild>
                        <Button
                        type='button' variant="secondary"
                        >
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
</Dialog>

  )
}

export default DeleteDocument