import { getCurrentUser } from "@/lib/actions/auth.action";
import Link from "next/link";
import { User, Shield, Bell, CreditCard, ChevronRight } from "lucide-react";

const SettingsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-10 h-full">
        <h2 className="text-xl mb-4 text-gray-300">You need to sign in to view settings.</h2>
        <Link href="/sign-in" className="btn py-2 px-6">Sign In</Link>
      </div>
    );
  }

  const settingsSections = [
    {
      title: "Profile Settings",
      icon: User,
      description: "Update your personal information and profile picture",
      href: "/profile",
    },
    {
      title: "Account Security",
      icon: Shield,
      description: "Manage your password and secondary authentication",
      href: "/profile",
    },
    {
      title: "Notifications",
      icon: Bell,
      description: "Configure how you receive interview reminders and feedback",
      href: "/settings",
      comingSoon: true,
    },
    {
      title: "Billing & Subscription",
      icon: CreditCard,
      description: "Manage your Pro membership and billing history",
      href: "/settings",
      comingSoon: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 w-full animate-fadeIn font-sans">
      <header className="mb-10 text-left border-b border-gray-800 pb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-gray-400 mt-2">Manage your account preferences and application settings.</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {settingsSections.map((section) => (
          <Link 
            key={section.title} 
            href={section.href}
            className={`group relative overflow-hidden bg-[#121214] border border-gray-800 rounded-2xl p-6 transition-all hover:border-brand-primary/50 hover:bg-[#16181f] ${section.comingSoon ? 'opacity-70 grayscale pointer-events-none' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-brand-primary/10 group-hover:border-brand-primary/20 transition-all">
                  <section.icon className="w-6 h-6 text-gray-400 group-hover:text-brand-primary transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    {section.title}
                    {section.comingSoon && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-500 uppercase font-black tracking-widest">coming soon</span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{section.description}</p>
                </div>
              </div>
              {!section.comingSoon && (
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-all transform group-hover:translate-x-1" />
              )}
            </div>
            
            {/* Hover Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-8 bg-brand-primary/5 border border-brand-primary/10 rounded-2xl">
        <h3 className="text-lg font-bold text-white mb-2">Pro Membership Active</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          You are currently on the Pro Plan. Enjoy unlimited AI interviews, advanced resume analysis, and priority support.
        </p>
        <button className="text-sm font-bold text-brand-primary hover:text-brand-primary/80 transition-colors uppercase tracking-widest">
          View Membership Details &rarr;
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
