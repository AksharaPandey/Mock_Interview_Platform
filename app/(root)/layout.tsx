import React, { ReactNode } from 'react'
import { getCurrentUser, signOut } from '@/lib/actions/auth.action'
import { Button } from '@/components/ui/button'
import { LogOut, User as UserIcon, Bell, Search } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import NotificationMenu from '@/components/NotificationMenu'
import SearchInput from '@/components/SearchInput'
import ThemeToggle from '@/components/ThemeToggle'
import HeaderProfile from '@/components/HeaderProfile'

const RootLayout = async ({children}:{children:ReactNode}) => {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-dark-100 text-foreground selection:bg-brand-primary/30 font-mona-sans">
      {/* Fixed Sidebar */}
      <Sidebar user={user} />

      {/* Main Content Area */}
      <div className="flex flex-col min-h-screen transition-all duration-300 ease-in-out" style={{ paddingLeft: 'var(--sidebar-width)' }}>
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 md:px-12 border-b border-white/5 bg-dark-100/50 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-4">
             <h1 className="text-xl font-bold tracking-tight text-foreground">Dashboard</h1>
          </div>

          <div className="flex items-center gap-6">
            <SearchInput />

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <NotificationMenu />
            </div>

            {user ? (
               <HeaderProfile initialUser={user} />
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