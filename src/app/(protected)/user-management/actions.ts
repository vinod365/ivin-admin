"use server";

import {
  createSupabaseAdminClient,
  createSupabaseServerClient,
} from "@/lib/supabase/server";
import { Database } from "@/types/supabase";
import { revalidatePath } from "next/cache";

type ProfileRole = Database["public"]["Tables"]["profiles"]["Row"]["role"];
type ProfileStatus = Database["public"]["Tables"]["profiles"]["Row"]["status"];

interface UpdateProfileData {
  full_name?: string | null;
  username?: string | null;
  email?: string;
  phone?: string | null;
  avatar_url?: string | null;
  role?: ProfileRole;
  status?: ProfileStatus;
  password?: string;
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

export async function updateFullUserProfile(
  userId: string,
  formData: UpdateProfileData,
) {
  const supabaseAdmin = await createSupabaseAdminClient();
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized: User not logged in." };
  }

  const { data: currentUserProfile, error: profileError } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .single();

  if (profileError || currentUserProfile?.role !== "admin") {
    return { error: "Forbidden: Not an admin." };
  }

  if (userId === user.id) {
    if (
      formData.role &&
      formData.role !== "admin" &&
      currentUserProfile?.role === "admin"
    ) {
      return {
        error: "You cannot demote your own admin account. Another admin must do this.",
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

  const safeFormData = {
    ...formData,
    email: formData.email === null ? undefined : formData.email,
  };

  const { error } = await supabaseAdmin
    .from("profiles")
    .update(safeFormData)
    .eq("id", userId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/user-management");
  revalidatePath(`/user-management/edit/${userId}`);
  return { error: null };
}

export async function deleteUserAvatar(userId: string, avatarPath: string) {
  const supabaseAdmin = await createSupabaseAdminClient();
  const supabase = await createSupabaseServerClient();

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

  if (!avatarPath) {
    return { error: "No avatar path provided." };
  }

  const { error: storageError } = await supabaseAdmin.storage
    .from("avatars")
    .remove([avatarPath]);

  if (storageError) {
    return { error: storageError.message };
  }

  const { error: profileUpdateError } = await supabaseAdmin
    .from("profiles")
    .update({ avatar_url: null })
    .eq("id", userId);

  if (profileUpdateError) {
    return { error: profileUpdateError.message };
  }

  revalidatePath("/user-management");
  revalidatePath(`/user-management/edit/${userId}`);
  return { error: null };
}

export async function deleteUserProfile(userId: string) {
  const supabaseAdmin = await createSupabaseAdminClient();

  // First, delete the profile entry
  const { error: profileDeleteError } = await supabaseAdmin
    .from("profiles")
    .delete()
    .eq("id", userId);

  if (profileDeleteError) {
    return { error: profileDeleteError.message };
  }

  // Then, delete the user from Supabase Auth
  const { error: authDeleteError } = await supabaseAdmin.auth.admin.deleteUser(
    userId,
  );

  if (authDeleteError) {
    return { error: authDeleteError.message };
  }

  revalidatePath("/user-management");
  return { error: null };
}

export async function uploadAvatar({
  filePath,
  selectedFile,
}: {
  filePath: string;
  selectedFile: File;
}) {
  const supabaseAdmin = await createSupabaseAdminClient();
  const result = await supabaseAdmin.storage
    .from("avatars")
    .upload(filePath, selectedFile);
  return result;
}