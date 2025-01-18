"use client"
import Document from '@/components/Document'
import React from 'react'

function page({params : {id}} : {params : {id: string}}) {
  return (
    <div className='font-bold'>
        <Document id={id} />
    </div>
  )
}

export default page