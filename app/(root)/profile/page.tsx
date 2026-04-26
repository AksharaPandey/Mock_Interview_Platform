import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import ProfileClient from "@/components/ProfileClient";

const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <ProfileClient user={user} />;
};

export default ProfilePage;
