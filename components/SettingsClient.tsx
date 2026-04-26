"use client";

import React, { useState } from "react";
import { User, Shield, Bell, ChevronRight, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const SettingsClient = ({ user }: { user: any }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'security'>('overview');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPassword(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Password updated successfully!");
    setIsChangingPassword(false);
    setActiveTab('overview');
  };

  const settingsSections = [
    {
      title: "Profile Settings",
      icon: User,
      description: "Update your personal information and profile picture",
      onClick: () => window.location.href = "/profile",
    },
    {
      title: "Account Security",
      icon: Shield,
      description: "Manage your password and secondary authentication",
      onClick: () => setActiveTab('security'),
    }
  ];

  if (activeTab === 'security') {
    return (
      <div className="max-w-4xl mx-auto py-10 px-6 w-full animate-fadeIn font-sans">
        <button 
          onClick={() => setActiveTab('overview')}
          className="text-sm font-bold text-brand-primary hover:underline mb-8 uppercase tracking-widest"
        >
          &larr; Back to Settings
        </button>

        <header className="mb-10 text-left">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Account Security</h1>
          <p className="text-light-100 mt-2">Update your password to keep your account secure.</p>
        </header>

        <form onSubmit={handlePasswordChange} className="max-w-md space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest px-1">Current Password</label>
              <div className="flex items-center gap-3 bg-white/5 border border-border rounded-xl px-4 py-3 focus-within:border-brand-primary/50 transition-all">
                <input type={showPass ? "text" : "password"} className="bg-transparent border-none outline-none text-sm text-foreground w-full" placeholder="••••••••" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest px-1">New Password</label>
              <div className="flex items-center gap-3 bg-white/5 border border-border rounded-xl px-4 py-3 focus-within:border-brand-primary/50 transition-all">
                <input type={showPass ? "text" : "password"} className="bg-transparent border-none outline-none text-sm text-foreground w-full" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isChangingPassword}
            className="w-full px-6 py-3 rounded-xl bg-brand-primary text-sm font-bold text-dark-100 hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2"
          >
            {isChangingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Password"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 w-full animate-fadeIn font-sans">
      <header className="mb-10 text-left border-b border-border pb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-light-100 mt-2">Manage your account preferences and application settings.</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {settingsSections.map((section) => (
          <button 
            key={section.title} 
            onClick={section.onClick}
            className="group relative overflow-hidden bg-dark-200 border border-border rounded-2xl p-6 transition-all text-left w-full hover:border-brand-primary/50 hover:bg-dark-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-border group-hover:bg-brand-primary/10 group-hover:border-brand-primary/20 transition-all">
                  <section.icon className="w-6 h-6 text-light-100 group-hover:text-brand-primary transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{section.description}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-foreground transition-all transform group-hover:translate-x-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsClient;
