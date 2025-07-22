// app/user/edit/page.tsx
import { getSingleProfile } from "../../actions";
import UserEditForm from "./UserEditForm";

interface UserEditPageProps {
  params: Promise<{ userId: string }>;
}

export default async function UserEditPage({ params }: UserEditPageProps) {
  const { userId } = await params;

  const { currentUser, userProfile }: { userProfile: any; currentUser: any } =
    await getSingleProfile(userId);

  return (
    <UserEditForm
      userProfile={userProfile}
      currentAdminId={currentUser?.user?.id}
    />
  );
}
