'use client';
import React, { FormEvent, useState, useTransition } from 'react';
import * as Y from 'yjs';
import { Button } from './ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BotIcon, LanguagesIcon } from 'lucide-react';
import { toast } from 'sonner';

type Language =
  | 'english'
  | 'spanish'
  | 'portugese'
  | 'marathi'
  | 'hindi'
  | 'french';

const languages: Language[] = [
  'english',
  'spanish',
  'portugese',
  'marathi',
  'hindi',
  'french',
];

function TranslateDocument({ doc }: { doc: Y.Doc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [language, setLanguage] = useState('');
  const [summary, setSummary] = useState('');

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();
    
    startTransition(async() => {
      try {
        const documentData = doc.get('document-store').toJSON();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            document_data: documentData,
            Language: language,
          }),
        });
  
        if (res.ok) {
          const { response } = await res.json();
          setSummary(response);
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
    
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <LanguagesIcon /> Translate
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate the Document</DialogTitle>
          <DialogDescription>
            Select a language, and AI will translate the summary of the document.
          </DialogDescription>
          <hr className="mt-5" />
        </DialogHeader>

        {summary && (
          <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                GPT {isPending ? 'is thinking...' : 'says'}
              </p>
            </div>
            <p>{isPending ? 'Thinking...' : <>{summary}</>}</p>
          </div>
        )}

        <form className="flex gap-2" onSubmit={handleAskQuestion}>
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type="submit" disabled={isPending}>
            {isPending ? 'Translating...' : 'Translate'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TranslateDocument;
