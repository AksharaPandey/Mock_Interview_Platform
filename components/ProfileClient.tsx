"use client";

import React, { useState, useEffect } from "react";
import { User as UserIcon, Mail, Calendar, LogOut, Edit2, BadgeCheck } from "lucide-react";
import SkillsManager from "./SkillsManager";
import EditProfileModal from "./EditProfileModal";
import { signOut } from "@/lib/actions/auth.action";

import { useUser } from "@/contexts/UserContext";

const ProfileClient = ({ user: initialUser }: { user: any }) => {
  const { user, updateUser, isLoading } = useUser();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Initialize context with server content if context is empty
  useEffect(() => {
    if (!user && initialUser) {
      updateUser(initialUser);
    }
  }, [initialUser, user, updateUser]);

  const handleUpdateUser = (newData: { name: string, image?: string | null }) => {
    updateUser(newData);
  };

  if (isLoading || !user) return null; // Wait for localStorage

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/sign-in";
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 w-full animate-fadeIn font-sans">
      <div className="bg-dark-200 border border-border rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Banner Area */}
        <div className="h-32 bg-gradient-to-r from-brand-primary/20 via-brand-primary/5 to-transparent border-b border-border"></div>
        
        {/* Profile Content */}
        <div className="px-8 pb-10 relative">
          <div className="flex flex-col md:flex-row items-end -mt-16 gap-6 mb-10">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-brand-primary to-primary-100 flex items-center justify-center p-1 shadow-2xl ring-4 ring-dark-100">
              <div className="w-full h-full rounded-2xl bg-dark-300 flex items-center justify-center text-brand-primary overflow-hidden">
                {user.image ? (
                    <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <UserIcon size={48} strokeWidth={1.5} />
                )}
              </div>
            </div>
            
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">{user.name}</h1>
                <BadgeCheck className="w-6 h-6 text-brand-primary" />
              </div>
              <p className="text-light-100 mt-1 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
            </div>

            <div className="flex gap-3 pb-2">
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-border text-[13px] font-bold text-foreground hover:bg-white/10 transition-all uppercase tracking-wider"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-[13px] font-bold text-red-400 hover:bg-red-500/20 transition-all uppercase tracking-wider"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-dark-300 border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-brand-primary" />
                </div>
                <h3 className="font-bold text-foreground">Account Details</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-sm text-gray-500">Member Since</span>
                  <span className="text-sm font-medium text-light-100">April 2026</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-sm text-gray-500">Total Interviews</span>
                  <span className="text-sm font-medium text-light-100">12</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-gray-500">Account Status</span>
                  <span className="text-xs font-black text-brand-primary uppercase tracking-widest">Active</span>
                </div>
              </div>
            </div>

            <SkillsManager initialSkills={['React', 'Next.js', 'System Design', 'TypeScript', 'Node.js', 'Go']} />
          </div>
        </div>
      </div>

      <EditProfileModal 
        user={user} 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onUpdate={handleUpdateUser}
      />
    </div>
  );
};

export default ProfileClient;
