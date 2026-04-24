import { getCurrentUser } from "@/lib/actions/auth.action";
import { signOut } from "@/lib/actions/auth.action";
import Link from "next/link";
import { redirect } from "next/navigation";
import { User, Mail, Calendar, LogOut, Edit2, BadgeCheck } from "lucide-react";

async function handleSignOut() {
  "use server";
  await signOut();
  redirect("/sign-in");
}

const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 w-full animate-fadeIn font-sans">
      <div className="bg-[#121214] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Banner Area */}
        <div className="h-32 bg-gradient-to-r from-brand-primary/20 via-brand-primary/5 to-transparent border-b border-white/5"></div>
        
        {/* Profile Content */}
        <div className="px-8 pb-10 relative">
          <div className="flex flex-col md:flex-row items-end -mt-16 gap-6 mb-10">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-brand-primary to-primary-100 flex items-center justify-center p-1 shadow-2xl ring-4 ring-dark-100">
              <div className="w-full h-full rounded-2xl bg-dark-200 flex items-center justify-center text-brand-primary">
                <User size={48} strokeWidth={1.5} />
              </div>
            </div>
            
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white tracking-tight">{user.name}</h1>
                <BadgeCheck className="w-6 h-6 text-brand-primary" />
              </div>
              <p className="text-gray-400 mt-1 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
            </div>

            <div className="flex gap-3 pb-2">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[13px] font-bold text-white hover:bg-white/10 transition-all uppercase tracking-wider">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
              <form action={handleSignOut}>
                <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-[13px] font-bold text-red-400 hover:bg-red-500/20 transition-all uppercase tracking-wider">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </form>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-[#1A1C20] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-brand-primary" />
                </div>
                <h3 className="font-bold text-white">Account Details</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-sm text-gray-500">Member Since</span>
                  <span className="text-sm font-medium text-gray-300">April 2024</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-sm text-gray-500">Total Interviews</span>
                  <span className="text-sm font-medium text-gray-300">12</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-gray-500">Account Type</span>
                  <span className="text-xs font-black bg-brand-primary text-dark-100 px-2.5 py-1 rounded-full uppercase tracking-tighter">Pro Member</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1C20] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6 font-bold text-white">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <BadgeCheck className="w-5 h-5 text-green-500" />
                </div>
                <h3>Active Skills</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'System Design', 'TypeScript', 'Node.js', 'Go'].map((skill) => (
                  <span key={skill} className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-gray-400 group hover:border-brand-primary/30 hover:text-white transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
              <button className="mt-6 text-xs font-bold text-brand-primary hover:underline uppercase tracking-widest">Add new skill +</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
