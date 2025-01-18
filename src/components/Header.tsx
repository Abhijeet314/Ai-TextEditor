'use client'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useUser } from '@clerk/nextjs'
import Breadcumbs from './Breadcumbs'

const Header = () => {
    const {user} = useUser()
  return (
    <div className='flex items-center justify-between p-5'>
        {user && (
            <h1>{user?.firstName}{`'s`} Space</h1>
        )}

        {/* Breadcumbs */}
        <Breadcumbs />
        <div>
            {/* if signed out then show signed in button */}
            <SignedOut>
                <SignInButton />
            </SignedOut>

            {/* If signed in then show UserButton */}
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    </div>
  )
}

export default Header