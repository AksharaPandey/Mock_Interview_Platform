"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Video, 
  MessageSquare, 
  User as UserIcon, 
  FileText, 
  Briefcase, 
  BookOpen,
  Settings,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/UserContext";

const navItems = [
  {
    group: "Dashboard",
    items: [
      { label: "Home", icon: Home, href: "/" },
      { label: "Interviews", icon: Video, href: "/interview" },
    ]
  },
  {
    group: "Contents",
    items: [
      { label: "History", icon: Video, href: "/interviews/history" },
      { label: "Feedback", icon: MessageSquare, href: "/interviews/feedback" },
      { label: "Resume", icon: FileText, href: "/resume" },
      { label: "Career", icon: Briefcase, href: "/career" },
      { label: "Courses", icon: BookOpen, href: "/courses" },
    ]
  },
  {
    group: "Account",
    items: [
      { label: "Profile", icon: UserIcon, href: "/profile" },
      { label: "Settings", icon: Settings, href: "/settings" },
    ]
  }
];

interface SidebarProps {
  user?: any;
}

const Sidebar = ({ user: propUser }: SidebarProps) => {
  const pathname = usePathname();
  const { user: globalUser } = useUser();
  const user = globalUser || propUser;
  const [collapsed, setCollapsed] = useState(true);

  // Sync sidebar width to a CSS variable for the layout to respond
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width", 
      collapsed ? "80px" : "288px"
    );
  }, [collapsed]);

  // No longer need this manual map as we updated navItems directly
  const updatedNavItems = navItems;

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-dark-200 border-r border-border flex flex-col z-50 shadow-2xl transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Brand Header */}
      <div className={cn(
        "p-6 flex items-center h-20",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-brand-primary p-1.5 rounded-lg shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform duration-300">
              <Image src="/logo.svg" alt="logo" height={16} width={18} className="brightness-0 invert" />
            </div>
            <h2 className="text-lg font-bold text-foreground tracking-tight group-hover:text-brand-primary transition-colors whitespace-nowrap">AlgoPanel</h2>
          </Link>
        )}
        {collapsed && (
          <div className="bg-brand-primary p-1.5 rounded-lg shadow-lg shadow-brand-primary/20">
            <Image src="/logo.svg" alt="logo" height={16} width={18} className="brightness-0 invert" />
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-white transition-all absolute -right-3 top-24 bg-brand-primary rounded-full p-1 border border-dark-100 z-50 shadow-xl"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-6 space-y-9 scrollbar-hide">
        {updatedNavItems.map((group) => (
          <div key={group.group} className="space-y-4">
            {!collapsed && (
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] px-3">
                {group.group}
              </h3>
            )}
            <nav className="space-y-1.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                      collapsed ? "justify-center" : "justify-start gap-4",
                      isActive 
                        ? "bg-brand-primary/10 text-foreground border border-brand-primary/20" 
                        : "text-light-100 hover:text-foreground hover:bg-white/5 border border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-3.5 z-10 shrink-0">
                      <item.icon className={cn(
                        "w-[20px] h-[20px] transition-colors duration-300",
                        isActive ? "text-brand-primary" : "group-hover:text-brand-primary"
                      )} />
                    </div>
                    {!collapsed && (
                      <span className={cn(
                        "text-[14.5px] font-bold tracking-tight transition-colors duration-300 whitespace-nowrap",
                        isActive ? "text-foreground" : "text-light-100 group-hover:text-foreground"
                      )}>{item.label}</span>
                    )}
                    
                    {isActive && (
                      <div 
                        className="absolute left-0 w-1 h-6 bg-brand-primary rounded-r-full shadow-[0_0_10px_rgba(202,197,254,0.5)]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Profile Shortcut / Settings */}
      <div className="p-4 mt-auto">
        <div className={cn(
          "bg-dark-200 border border-border rounded-2xl flex items-center transition-all group hover:border-brand-primary/30",
          collapsed ? "p-2 justify-center" : "p-3 justify-between gap-3"
        )}>
          <Link
            href="/profile"
            className={cn(
              "flex items-center gap-4 rounded-2xl hover:bg-white/5 transition-all group overflow-hidden",
              collapsed ? "p-1 justify-center" : "px-4 py-3"
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-primary-100 flex items-center justify-center p-0.5 shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
               <div className="w-full h-full rounded-lg bg-dark-300 flex items-center justify-center text-brand-primary font-bold overflow-hidden">
                {user?.image ? (
                  <img src={user.image} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={20} />
                )}
               </div>
            </div>
            {!collapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-foreground whitespace-nowrap truncate">
                  {user?.name || "Guest User"}
                </span>
              </div>
            )}
          </Link>
          <Link href="/settings" className="p-1 hover:bg-white/5 rounded-md transition-colors">
            <Settings className={cn(
              "w-4 h-4 transition-colors",
              collapsed ? "text-gray-400" : "text-gray-600 group-hover:text-white"
            )} />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
