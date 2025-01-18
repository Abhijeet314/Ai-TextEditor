"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

function Breadcumbs() {
    const path = usePathname()
    const segments = path.split("/")
    console.log(segments)
  return (
    <div>
        <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbLink href="/components">{segments[1]}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbPage>{segments[2]}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
</Breadcrumb>

    </div>
  )
}

export default Breadcumbs