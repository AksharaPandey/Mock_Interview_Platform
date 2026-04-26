"use client";

import React, { useState } from "react";
import { X, User, Mail, Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const EditProfileModal = ({ 
  user, 
  isOpen, 
  onClose,
  onUpdate
}: { 
  user: any; 
  isOpen: boolean; 
  onClose: () => void;
  onUpdate: (data: { name: string, image?: string | null }) => void;
}) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        toast.info("New profile picture selected");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onUpdate({ name, image });
    toast.success("Profile updated successfully!");
    setIsSaving(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-dark-200 border border-border w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-border flex items-center justify-between bg-dark-100/50">
          <h2 className="text-xl font-bold text-foreground">Edit Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
            <X className="w-5 h-5 text-light-100" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="flex flex-col items-center gap-4 mb-2">
            <div className="relative group">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                className="hidden" 
                accept="image/*"
              />
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-brand-primary to-primary-100 p-1">
                <div className="w-full h-full rounded-2xl bg-dark-300 flex items-center justify-center text-brand-primary overflow-hidden">
                  {image ? (
                    <img src={image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={40} />
                  )}
                </div>
              </div>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-brand-primary rounded-xl text-dark-100 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera size={14} />
              </button>
            </div>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Change Photo</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest px-1">Full Name</label>
              <div className="flex items-center gap-3 bg-white/5 border border-border rounded-xl px-4 py-3 focus-within:border-brand-primary/50 transition-all">
                <User className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm text-foreground w-full"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest px-1">Email Address</label>
              <div className="flex items-center gap-3 bg-white/5 border border-border rounded-xl px-4 py-3 focus-within:border-brand-primary/50 transition-all">
                <Mail className="w-4 h-4 text-gray-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm text-foreground w-full opacity-50 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-sm font-bold text-light-100 hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-6 py-3 rounded-xl bg-brand-primary text-sm font-bold text-dark-100 hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
