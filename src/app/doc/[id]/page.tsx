"use client"
import Document from '@/components/Document'
import React from 'react'

async function page({params} : {params: Promise<{id : string}> }) {
  const id = (await (params)).id
  return (
    <div className='font-bold'>
        <Document id={id} />
    </div>
  )
}

export default page