'use client'

import Link from 'next/link'
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import { doc } from 'firebase/firestore'
import { usePathname } from 'next/navigation'

function SidebarOption({href, id}: {href:string,  id: string}) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id))
    const path = usePathname()
    const isActive = href.includes(path) && path!== "/" // just checking if Link is active or not by ensuring correct path
    if (!data) return null;

  return (
    
    <Link href={href} className={`border p-2 rounded-md ${isActive ? "bg-gray-300 font-bold border-black" : "border-gray-300"}`}>
        {/* get our data but how => we can use a hook which is useDocumentData */}
        <p className='truncate'>{data.title}</p>
        {/* classname here means if title is very big it will truncate */}
    </Link>
  )
}

export default SidebarOption