'use client'
import React, { FormEvent, useEffect, useState, useTransition } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import Editor from './Editor'
import useOwner from "@/lib/useOwner";
import DeleteDocument from './DeleteDocument'
import InviteUserToRoom from './InviteUserToRoom'
import ManageUsers from './ManageUsers'
import Avatars from './Avatars'

function Document({id} : {id: string}) {
    const [input, setInput] = useState("")
    const [isUpdating, startTranistion] = useTransition()
    const[data, loading, error] = useDocumentData(doc(db, "documents", id))
    const isOwner = useOwner();

    useEffect(() => {
        if(data) {
            setInput(data.title)
        }
    }, [data])
    const handleupdateTitle = (e:FormEvent) => {
        // update data
        e.preventDefault()

        if (input.trim()) {
            startTranistion(async() => {
                await updateDoc(doc(db, "documents", id), {
                    title: input
                })
            })
        }
    }
  return (
    <div>
        <div className='flex max-w-6xl mx-auto justify-between pb-5'>
            <form className='flex flex-1 space-x-2' onSubmit={handleupdateTitle}>
                {/* update title */}
                <Input value={input} onChange={e => setInput(e.target.value)}/>

                <Button disabled={isUpdating} type='submit'>{isUpdating ? "Updating..." : "Update"}</Button>
                {/* If */}
                {/* isOwner InviteUser, DeleteDocument */}
                <InviteUserToRoom />
                <DeleteDocument />
            </form>
        </div>

 

        <div className='flex max-w-6xl mx-auto justify-between items-center mb-5'>
            {/* Manage users */}
            <ManageUsers />
            {/* Avatars */}
            <Avatars />

        </div>

        <hr className='pb-10'/>
        {/* Collaborative editor */}
        <Editor />

    </div>
  )
}

export default Document