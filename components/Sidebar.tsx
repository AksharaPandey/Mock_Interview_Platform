"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Video, 
  MessageSquare, 
  User, 
  FileText, 
  Briefcase, 
  BookOpen,
  Settings,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    group: "Dashboard",
    items: [
      { label: "Home", icon: Home, href: "/" },
      { label: "Interviews", icon: Video, href: "/interviews" },
    ]
  },
  {
    group: "Contents",
    items: [
      { label: "Feedback", icon: MessageSquare, href: "/interviews" },
      { label: "Resume", icon: FileText, href: "/resume" },
      { label: "Career", icon: Briefcase, href: "/career" },
      { label: "Courses", icon: BookOpen, href: "/courses" },
    ]
  },
  {
    group: "Account",
    items: [
      { label: "Profile", icon: User, href: "/profile" },
      { label: "Settings", icon: Settings, href: "/settings" },
    ]
  }
];

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  // Sync sidebar width to a CSS variable for the layout to respond
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width", 
      collapsed ? "80px" : "288px"
    );
  }, [collapsed]);

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-dark-200 border-r border-white/5 flex flex-col z-50 shadow-2xl transition-all duration-300 ease-in-out",
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
            <div className="bg-brand-primary p-2 rounded-xl shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform duration-300">
              <Image src="/logo.svg" alt="logo" height={22} width={26} className="brightness-0 invert" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight group-hover:text-brand-primary transition-colors whitespace-nowrap">AlgoPanel</h2>
          </Link>
        )}
        {collapsed && (
          <div className="bg-brand-primary p-2 rounded-xl shadow-lg shadow-brand-primary/20">
            <Image src="/logo.svg" alt="logo" height={20} width={24} className="brightness-0 invert" />
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
        {navItems.map((group) => (
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
                        ? "bg-brand-primary/10 text-white border border-brand-primary/20" 
                        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
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
                        isActive ? "text-white" : "text-gray-400 group-hover:text-white"
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
          "bg-[#1A1C20] border border-white/5 rounded-2xl flex items-center transition-all cursor-pointer group hover:border-brand-primary/30",
          collapsed ? "p-2 justify-center" : "p-3 justify-between gap-3"
        )}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 min-w-10 rounded-full bg-gradient-to-tr from-brand-primary to-primary-100 flex-center shrink-0">
              <User className="w-5 h-5 text-dark-100" />
            </div>
            {!collapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-white whitespace-nowrap truncate">Guest User</span>
                <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">Free Plan</span>
              </div>
            )}
          </div>
          {!collapsed && <Settings className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
