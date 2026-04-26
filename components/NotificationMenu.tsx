"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, MessageSquare, FileText, Settings, Info, Check } from "lucide-react";
import { dummyNotifications } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const NotificationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(dummyNotifications);
  const menuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const toggleMenu = () => setIsOpen(!isOpen);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "feedback":
        return <MessageSquare className="w-4 h-4 text-emerald-400" />;
      case "resume":
        return <FileText className="w-4 h-4 text-brand-primary" />;
      case "system":
        return <Info className="w-4 h-4 text-amber-400" />;
      default:
        return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={cn(
          "relative p-2.5 text-gray-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 rounded-xl border border-white/5",
          isOpen && "bg-white/10 text-white border-brand-primary/30"
        )}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-primary rounded-full border-2 border-dark-100 animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 md:w-[450px] bg-dark-200 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-dark-100/50">
            <h3 className="font-bold text-white tracking-tight">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Check className="w-3 h-3" />
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[500px] overflow-y-auto scrollbar-hide">
            {notifications.length > 0 ? (
              <div className="flex flex-col">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors relative group",
                      !notification.isRead && "bg-brand-primary/5"
                    )}
                  >
                    {!notification.isRead && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary" />
                    )}
                    <div className="flex gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                        notification.type === 'feedback' && "bg-emerald-500/10",
                        notification.type === 'resume' && "bg-brand-primary/10",
                        notification.type === 'system' && "bg-amber-500/10"
                      )}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-bold text-white leading-none">
                            {notification.title}
                          </p>
                          <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">
                            {dayjs(notification.createdAt).fromNow()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                          {notification.message}
                        </p>
                        {notification.link && (
                          <Link
                            href={notification.link}
                            onClick={() => {
                                markAsRead(notification.id);
                                setIsOpen(false);
                            }}
                            className="inline-block pt-1 text-[11px] font-bold text-brand-primary hover:underline"
                          >
                            View Details →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-6 h-6 text-gray-600" />
                </div>
                <p className="text-sm text-gray-400 font-medium">No new notifications</p>
              </div>
            )}
          </div>

          <div className="p-3 bg-dark-100/50 border-t border-white/5 text-center px-4 py-3">
             <Link href="/settings" className="text-[11px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
                <Settings className="w-3 h-3" />
                Notification Settings
             </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;
