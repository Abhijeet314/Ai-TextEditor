'use client' 

// any interactive element or componenet needs to be use client because its on client side not server side

import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import { createNewDocument } from '../../actions/actions';
import { auth } from '@clerk/nextjs/server';

const NewDocumentButton = () => {
  auth.protect()
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  const handleCreateNewDocument = () => {
    // with the help of UseTransition hook we get isPending option where we can use it to create a condition for good UI 
    // so that till the below function is working isPending will be true
    startTransition(async () => {
      // create a new Document in server and fetch id from firestore
      const {docId} = await createNewDocument();
      router.push(`/doc/${docId}`)
    })
  }
  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
      {isPending ? "Creating....": "New Document"}
    </Button>
  )
}

export default NewDocumentButton
