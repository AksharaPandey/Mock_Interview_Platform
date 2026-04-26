import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import SettingsClient from "@/components/SettingsClient";

const SettingsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <SettingsClient user={user} />;
};

export default SettingsPage;
