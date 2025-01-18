"use client"
import { useRoom, useSelf } from '@liveblocks/react'
import React, { useEffect, useState } from 'react'
import * as Y from "yjs"
import { Button } from './ui/button';
import {LiveblocksYjsProvider} from "@liveblocks/yjs";
import { MoonIcon, SunIcon } from 'lucide-react';
import {BlockNoteView} from '@blocknote/shadcn';
import {BlockNoteEditor} from "@blocknote/core";
import {useCreateBlockNote} from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css"
import stringToColor from '@/lib/stringToColor';
import TranslateDocument from './TranslateDocument';
import ChatDocument from "./chatDocument"

type EditorProps =  {
    doc: Y.Doc;
    provider : any;
    darkMode: boolean
}

function BlockNote({doc, provider, darkMode} : EditorProps) {
    const userinfo = useSelf((me) => me.info); // this give us the info about our collaborative human about if he/she is typing

    const editor : BlockNoteEditor = useCreateBlockNote({
        collaboration :{
            provider,
            fragment: doc.getXmlFragment("document-store"),
            user : {
                name: userinfo?.name || "",
                color: stringToColor(userinfo?.email || "")
            }
        }
    })
  return (
    <div>
        <BlockNoteView 
        className='min-h-screen'
        theme={
            darkMode ? "dark" : "light"
        }
        editor={editor}
        />
    </div>
  )
}


function Editor() {
    // get access to room
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc>(); // yjs is used when building a collaborative feature and our document is gonna be col.
    const [provider, setProvider] = useState<LiveblocksYjsProvider>();
    const [darkmode, setDarkmode] = useState(false);

    useEffect(() => {
        const ydoc = new Y.Doc();
        const yprovider = new LiveblocksYjsProvider(room,ydoc)

        setDoc(ydoc)
        setProvider(yprovider)

        return () => {
            ydoc?.destroy(),
            yprovider?.destroy()
        }
    }, [room])
    
    if (!doc || !provider) {
        return null;
    }

    const style = `hover:text-white ${
        darkmode ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700":
        "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-900"
    }`

    
  return (
    <div className='max-w-6xl mx-auto'>
        <div className='flex items-center justify-end gap-2 mb-10'>
            {/* Langchain Part */}
            {/* Translate the document */}
            <TranslateDocument doc={doc}/>
            {/* chat With document */}
            <ChatDocument doc={doc} />
            {/* Dark Mode */}
            <Button className={style} onClick={() => {
                setDarkmode(!darkmode)
            }}>
                {darkmode ? <SunIcon /> : <MoonIcon />}
            </Button>
        </div>

        {/* Block Note */}
        <BlockNote doc={doc} provider={provider} darkMode={darkmode} />
    </div>
  )
}

export default Editor