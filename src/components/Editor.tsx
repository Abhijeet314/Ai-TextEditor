"use client";
import { useRoom, useSelf } from "@liveblocks/react";
import React, { useEffect, useState } from "react";
import * as Y from "yjs";
import { Button } from "./ui/button";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { MoonIcon, SunIcon } from "lucide-react";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import stringToColor from "@/lib/stringToColor";
import TranslateDocument from "./TranslateDocument";
import ChatDocument from "./chatDocument";


type EditorProps = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
  darkMode: boolean;
};

function BlockNote({ doc, provider, darkMode }: EditorProps) {
  const userinfo = useSelf((me) => me.info); // Get user info

  const editor: BlockNoteEditor | null = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userinfo?.name || "",
        color: stringToColor(userinfo?.email || ""),
      },
    },
  });

  return (
    <div>
      <BlockNoteView
        className="min-h-screen"
        theme={darkMode ? "dark" : "light"}
        editor={editor}
      />
    </div>
  );
}

function Editor() {
  // Access room
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<LiveblocksYjsProvider | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const yprovider = new LiveblocksYjsProvider(room, ydoc);

    setDoc(ydoc);
    setProvider(yprovider);

    // Cleanup function
    return () => {
      ydoc.destroy();
      yprovider.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  const style = `hover:text-white ${
    darkMode
      ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
      : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-900"
  }`;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-end gap-2 mb-10">
        {/* Translate the document */}
        <TranslateDocument doc={doc} />
        {/* Chat with document */}
        <ChatDocument doc={doc} />
        {/* Dark Mode */}
        <Button
          className={style}
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>

      {/* Block Note */}
      <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  );
}

export default Editor;
