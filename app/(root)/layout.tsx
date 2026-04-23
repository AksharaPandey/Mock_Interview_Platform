import Link from 'next/link'
import React, { ReactNode } from 'react'
import Image from 'next/image'
import { getCurrentUser, signOut } from '@/lib/actions/auth.action'
import { Button } from '@/components/ui/button'

const RootLayout = async ({children}:{children:ReactNode}) => {
  const user = await getCurrentUser();

  return (
    <div className='root-layout'>
       <nav className="flex justify-between items-center w-full">
         <Link href="/" className='flex items-center gap-2'>
            <Image src="/logo.svg" alt="logo" height={32} width={38}/>
            <h2 className='text-primary-100'>AlgoPanel</h2>
         </Link>
         
         <div className="flex items-center gap-4">
           {user ? (
             <div className="flex items-center gap-3">
               <span className="text-sm text-gray-300 font-medium">{user.name}</span>
               <form action={async () => {
                 "use server";
                 await signOut();
               }}>
                 <Button type="submit" variant="outline" className="text-white border-white/20 bg-transparent hover:bg-white/10 text-xs py-1 h-8">
                   Sign Out
                 </Button>
               </form>
             </div>
           ) : (
             <Link href="/sign-in">
               <Button className="btn py-1 h-8 px-4 text-xs">
                 Sign In
               </Button>
             </Link>
           )}
         </div>
       </nav>
       {children}
    </div>
  )
}

export default RootLayout