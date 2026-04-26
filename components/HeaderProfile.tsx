"use client";

import React from "react";
import Link from "next/link";
import { User as UserIcon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { signOut } from "@/lib/actions/auth.action";

const HeaderProfile = ({ initialUser }: { initialUser: any }) => {
  const { user: globalUser } = useUser();
  const user = globalUser || initialUser;

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 bg-white/5 rounded-2xl pl-3 pr-2 py-1.5 border border-border shadow-sm hover:bg-white/10 transition-all">
      <Link href="/profile" className="flex items-center gap-3 group">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-primary/20 blur-md rounded-full"></div>
          <div className="bg-brand-primary/20 w-8 h-8 rounded-xl group-hover:bg-brand-primary/30 transition relative z-10 overflow-hidden flex items-center justify-center">
            {user.image ? (
              <img src={user.image} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="w-4 h-4 text-brand-primary" />
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold leading-none text-foreground">{user.name}</span>
        </div>
      </Link>
      <div className="w-[1px] h-8 bg-white/10 mx-1"></div>
      <button 
        onClick={() => signOut()}
        className="hover:bg-red-500/10 text-xs w-9 h-9 p-0 rounded-xl text-red-400 transition-all flex items-center justify-center"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
};

export default HeaderProfile;
