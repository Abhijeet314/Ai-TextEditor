'use client'

import React, { FormEvent, useState, useTransition } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button'
import { toast } from 'sonner'
import { Input } from './ui/input'
import { BotIcon, MessageCircleCode } from 'lucide-react'
import * as Y from "yjs"



function ChatDocument({doc} : {doc: Y.Doc}) {
    const [isOpen, SetIsOpen] = useState(false);
    const [isPending, startTranistion] = useTransition();
    const [input, setInput] = useState("");
    const [answer, setAnswer] = useState("");

    const handleAskQuestion = async (e:FormEvent) => {
        e.preventDefault()

        startTranistion(async () => {
          try {
            const documentData = doc.get('document-store').toJSON();
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                document_data: documentData,
                input: input
              }),
            });
      
            if (res.ok) {
              const { response } = await res.json();
              setInput("")
              setAnswer(response)
              toast.success('Translation successful!');
            } else {
              const error = await res.json();
              toast.error(`Error: ${error.error}`);
            }
          } catch (err) {
            toast.error('Failed to fetch the translation.');
            console.error(err);
          }
        })   
    }

  return (
    <Dialog open={isOpen} onOpenChange={SetIsOpen}>
        <Button asChild variant="outline">
          <DialogTrigger>
            <MessageCircleCode />
            Chat with Document
          </DialogTrigger>
        </Button>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Chat</DialogTitle>
                <DialogDescription>
                    Ask Ai your questions related to document
                </DialogDescription>

                <hr className='pb-10'/>

                {input && <p className='font-light'>Q: {input}</p>}
                </DialogHeader>

                {answer && (
           <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                GPT {isPending ? 'is thinking...' : 'says'}
              </p>
            </div>
            <p>{isPending ? 'Thinking...' : <>{answer}</>}</p>
          </div>
        )}
            <form
            className='flex gap-2'
              onSubmit={handleAskQuestion}
            >
            <Input 
            type='text'
            placeholder='What is this about?'
            className='w-full'

            onChange= {(e) => {
                setInput(e.target.value)
            }}
            />

            <Button type='submit' disabled={isPending}> 
                {isPending ? "Asking..." : "Ask"}
            </Button>
            </form>
            </DialogContent>
          

</Dialog>

  )
}

export default ChatDocument