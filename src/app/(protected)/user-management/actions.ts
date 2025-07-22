"use server";

import {
  createSupabaseAdminClient,
  createSupabaseServerClient,
} from "@/lib/supabase/server";
import { Database } from "@/types/supabase"; // Your Supabase types
import { revalidatePath } from "next/cache";

type ProfileRole = Database["public"]["Tables"]["profiles"]["Row"]["role"];
type ProfileStatus = Database["public"]["Tables"]["profiles"]["Row"]["status"];
type ProfilesTable = Database["public"]["Tables"]["profiles"]["Row"];

// Interface for the data that can be updated from the form
interface UpdateProfileData {
  full_name?: string | null;
  username?: string | null;
  email?: string | null;
  phone?: string | null;
  avatar_url?: string | null;
  role?: ProfileRole;
  status?: ProfileStatus;
  // Add any other fields you want to be able to update from the form
}

export async function getSingleProfile(userId: string) {
  const supabase = await createSupabaseAdminClient();
  const { data: userProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  const { data: currentUser } = await supabase.auth.getUser();
  return { currentUser, userProfile };
}

// Server Action for updating a user's full profile
export async function updateFullUserProfile(
  userId: string,
  formData: UpdateProfileData
) {
  const supabaseAdmin = await createSupabaseAdminClient();
  const supabase = await createSupabaseServerClient();

  // --- Admin authorization check (important for any admin action) ---
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized: User not logged in." };
  }
  const { data: currentUserProfile, error: profileError } = (await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()) as { data: UpdateProfileData; error: any };

  if (profileError || currentUserProfile?.role !== "admin") {
    return { error: "Forbidden: Not an admin." };
  }
  // --- End Admin authorization check ---

  // Handle self-editing rules
  if (userId === user.id) {
    if (
      formData.role &&
      formData.role !== "admin" &&
      currentUserProfile?.role === "admin"
    ) {
      return {
        error:
          "You cannot demote your own admin account. Another admin must do this.",
      };
    }
    if (
      formData.status &&
      formData.status === "inactive" &&
      currentUserProfile?.status === "active"
    ) {
      return { error: "You cannot deactivate your own account." };
    }
  }

  // Update logic
  const safeFormData = {
    ...formData,
    email: formData.email === null ? undefined : formData.email,
  };
  const { error } = await supabaseAdmin
    .from("profiles")
    .update(safeFormData)
    .eq("id", userId);

  if (error) {
    console.error(`Error updating user profile (ID: ${userId}):`, error);
    return { error: error.message };
  }

  revalidatePath("/user-management");
  revalidatePath(`/user-management/edit/${userId}`);
  return { error: null };
}

// --- NEW Server Action for deleting avatar ---
export async function deleteUserAvatar(userId: string, avatarPath: string) {
  const supabaseAdmin = await createSupabaseAdminClient();
  const supabase = await createSupabaseServerClient();

  // --- Admin authorization check ---
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized: User not logged in." };
  }
  const { data: currentUserProfile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || currentUserProfile?.role !== "admin") {
    return { error: "Forbidden: Not an admin." };
  }
  // --- End Admin authorization check ---

  if (!avatarPath) {
    return { error: "No avatar path provided." };
  }

  // Delete the file from Supabase Storage
  const { error: storageError } = await supabaseAdmin.storage
    .from("avatars")
    .remove([avatarPath]);

  if (storageError) {
    console.error("Error deleting avatar from storage:", storageError);
    return { error: storageError.message };
  }

  // Update the user's profile to remove the avatar_url
  const { error: profileUpdateError } = await supabaseAdmin
    .from("profiles")
    .update({ avatar_url: null }) // Set avatar_url to null
    .eq("id", userId);

  if (profileUpdateError) {
    console.error(
      "Error updating profile after avatar deletion:",
      profileUpdateError
    );
    // You might want to re-add the file if profile update fails, or handle rollback
    return { error: profileUpdateError.message };
  }

  revalidatePath("/user-management");
  revalidatePath(`/user-management/edit/${userId}`);
  return { error: null };
}

export async function deleteUserProfile(userId: string) {
  const supabaseAdmin = await createSupabaseAdminClient();
  console.log(userId, "userid")
  const { error: authError } = await supabaseAdmin.from("profiles").delete().eq("id", userId);
  if (authError) {
    console.error("Error deleting user from auth.users:", authError);
    return { error: authError.message };
  }
  revalidatePath("/user-management");
  return { error: null };
}

export async function uploadAvatar({filePath, selectedFile}:{filePath:string, selectedFile: File}) {
  console.log(selectedFile)
  const supabaseAdmin = await createSupabaseAdminClient();
  const result =  await supabaseAdmin.storage.from("avatars").upload(filePath, selectedFile)
  return result
}
