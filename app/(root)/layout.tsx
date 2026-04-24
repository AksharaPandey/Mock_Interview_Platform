import React, { ReactNode } from 'react'
import { getCurrentUser, signOut } from '@/lib/actions/auth.action'
import { Button } from '@/components/ui/button'
import { LogOut, User as UserIcon, Bell, Search } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'

const RootLayout = async ({children}:{children:ReactNode}) => {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-dark-100 text-white selection:bg-brand-primary/30 font-mona-sans">
      {/* Fixed Sidebar */}
      <Sidebar user={user} />

      {/* Main Content Area */}
      <div className="flex flex-col min-h-screen transition-all duration-300 ease-in-out" style={{ paddingLeft: 'var(--sidebar-width)' }}>
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 md:px-12 border-b border-white/5 bg-dark-100/50 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-4">
             <h1 className="text-xl font-bold tracking-tight text-white">Dashboard</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-gray-400 group focus-within:border-brand-primary/50 transition-all">
               <Search className="w-4 h-4 group-hover:text-white transition-colors" />
               <span className="text-sm font-medium">Search anything...</span>
               <kbd className="ml-4 text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono text-gray-500 uppercase tracking-tighter">⌘K</kbd>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative p-2.5 text-gray-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 rounded-xl border border-white/5">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-primary rounded-full border-2 border-dark-100"></span>
              </button>
            </div>

            {user ? (
               <div className="flex items-center gap-3 bg-white/5 rounded-2xl pl-3 pr-2 py-1.5 border border-white/10 shadow-sm hover:bg-white/10 transition-all">
                  <Link href="/profile-old" className="flex items-center gap-3 group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-brand-primary/20 blur-md rounded-full"></div>
                      <div className="bg-brand-primary/20 p-2 rounded-xl group-hover:bg-brand-primary/30 transition relative z-10">
                        <UserIcon className="w-4 h-4 text-brand-primary" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold leading-none text-gray-200">{user.name}</span>
                      <span className="text-[10px] text-brand-primary/60 font-black uppercase tracking-tighter mt-1">Pro Member</span>
                    </div>
                  </Link>
                  <div className="w-[1px] h-8 bg-white/10 mx-1"></div>
                  <form action={signOut}>
                    <Button type="submit" variant="ghost" className="hover:bg-red-500/10 text-xs w-9 h-9 p-0 rounded-xl text-red-400 transition-all">
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
            ) : (
              <Link href="/sign-in">
                <Button className="!bg-brand-primary !text-dark-100 !font-black rounded-full px-8 py-6 text-sm shadow-lg shadow-brand-primary/20 hover:scale-105 transition-transform">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-x-hidden">
           <div className="max-w-7xl mx-auto space-y-12">
             {children}
           </div>
        </main>

        <footer className="p-8 text-center text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] border-t border-white/5">
          AlgoPanel &copy; 2026 &bull; AI Interview Master
        </footer>
      </div>
    </div>
  )
}

export default RootLayout