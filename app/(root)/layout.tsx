import Link from 'next/link'
import React, { ReactNode } from 'react'
import Image from 'next/image'
import { getCurrentUser, signOut } from '@/lib/actions/auth.action'
import { Button } from '@/components/ui/button'
import { LogOut, User as UserIcon } from 'lucide-react'

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
             <div className="flex items-center gap-4 bg-white/5 rounded-full pl-5 pr-2 py-1.5 border border-white/10 shadow-sm">
               <Link href="/profile" className="flex items-center gap-2.5 hover:text-white transition group">
                 <div className="bg-brand-primary/20 p-1.5 rounded-full group-hover:bg-brand-primary/30 transition">
                   <UserIcon className="w-4 h-4 text-brand-primary" />
                 </div>
                 <span className="text-sm font-semibold tracking-wide text-gray-200">{user.name}</span>
               </Link>
               <div className="w-[1px] h-5 bg-white/20 mx-1"></div>
               <form action={signOut}>
                 <Button type="submit" variant="ghost" className="hover:bg-white/10 text-xs w-9 h-9 p-0 rounded-full text-red-400 hover:text-red-300 transition-colors">
                   <LogOut className="w-4 h-4" />
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