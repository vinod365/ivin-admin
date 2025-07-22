"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import DeleteIcon from "../assets/delete.svg";
import ImageIcon from "../assets/image.svg";

import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { deleteUserAvatar, updateFullUserProfile } from "../../actions";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

interface UserEditFormProps {
  userProfile: ProfileRow;
  currentAdminId: string | undefined;
}

export default function UserEditForm({
  userProfile,
  currentAdminId,
}: UserEditFormProps) {
  const router = useRouter();
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [isDeletingAvatar, setIsDeletingAvatar] = useState(false);

  // State to manage form inputs
  const [formData, setFormData] = useState<Partial<ProfileRow>>({
    full_name: userProfile?.full_name || "",
    username: userProfile?.username || "",
    email: userProfile?.email || "",
    phone: userProfile?.phone || "",
    avatar_url: userProfile?.avatar_url || "",
  });

  const [displayedAvatarUrl, setDisplayedAvatarUrl] = useState<string | null>(
    formData.avatar_url || null
  );

  const isSelfEditing = userProfile?.id === currentAdminId;

  // --- Effect to fetch signed URL for avatar on initial load or avatar_url change ---
  // useEffect(() => {
  //   async function getPublicUrl() {
  //     if (formData.avatar_url) {
  //       const supabase = await createSupabaseBrowserClient();
  //       const { data } = await supabase.storage
  //         .from("avatars")
  //         .download(formData.avatar_url)
  //         console.log(formData.avatar_url)
  //         console.log(data?.arrayBuffer)
  //       // const url = URL.createObjectURL(data)
  //       // setDisplayedAvatarUrl(url);
  //     } else {
  //       setDisplayedAvatarUrl(null);
  //     }
  //   }
  //   getPublicUrl();
  // }, [formData]);

  // --- Input change handler ---
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Avatar Upload Handler ---
  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setIsUploading(true);
      console.log();
      const supabase = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
      );
      const fileExt = selectedFile.name.split(".").pop();
      // Ensure unique file path to prevent conflicts. Use userId and timestamp/random.
      const filePath = `${userProfile.id}/${Date.now()}.${fileExt}`;

      // If there's an old avatar, delete it first to prevent orphaned files
      if (formData.avatar_url) {
        const { error: deleteOldError } = await supabase.storage
          .from("avatar")
          .remove([formData.avatar_url]);
        if (deleteOldError) {
          console.error("Error deleting old avatar:", deleteOldError);
          // Don't toast error here, proceed with new upload
        }
      }

      // console.log(selectedFile, "selectedFile", filePath, "filepath");

      const { error: uploadError, data } = await supabase.storage
        .from("avatar")
        .upload(filePath, selectedFile);
      if (uploadError) {
        setIsUploading(false);
        return toast.error(uploadError.message || "Can't upload avatar");
      }
      // Update formData with the new avatar_url path
      const { data: avatar } = supabase.storage
        .from("avatar")
        .getPublicUrl(filePath);

      setDisplayedAvatarUrl(avatar.publicUrl);
      setFormData((prev) => ({ ...prev, avatar_url: avatar.publicUrl }));
      setIsUploading(false);
      toast.success("Avatar uploaded! Click 'Save Changes' to confirm.");
    }
  };

  // --- Avatar Delete Handler ---
  const handleDeleteAvatar = async () => {
    if (!formData.avatar_url) {
      toast.error("No avatar to delete.");
      return;
    }

    if (!confirm("Are you sure you want to delete this avatar?")) {
      return;
    }

    setIsDeletingAvatar(true);
    // Call the server action to delete avatar and update profile
    startTransition(() => {
      const deleteAvatar = async () => {
        const { error } = await deleteUserAvatar(
          userProfile.id,
          formData.avatar_url as string
        ); // Ensure it's string

        if (error) {
          toast.error(`Failed to delete avatar: ${error}`);
        } else {
          toast.success("Avatar deleted successfully!");
          setFormData((prev) => ({ ...prev, avatar_url: null }));
          setDisplayedAvatarUrl(null);
          router.refresh();
        }
        setIsDeletingAvatar(false);
      };
      deleteAvatar();
    });
  };

  // --- Form Submission Handler ---
  const handleSaveChanges = async () => {
    // Collect only the changed fields for update, or all if you prefer
    const dataToUpdate: Partial<ProfileRow> = {};

    // Check if each field has changed from its initial `userProfile` value
    if (formData.full_name !== userProfile.full_name)
      dataToUpdate.full_name = formData.full_name;
    if (formData.username !== userProfile.username)
      dataToUpdate.username = formData.username;
    if (formData.email !== userProfile.email)
      dataToUpdate.email = formData.email;
    if (formData?.phone !== userProfile?.phone)
      dataToUpdate.phone = formData?.phone;
    if (formData.avatar_url !== userProfile.avatar_url)
      dataToUpdate.avatar_url = formData.avatar_url;

    // Role and Status specific checks
    const currentRole = formData.role || userProfile.role;
    const currentStatus = formData.status || userProfile.status;

    if (currentRole && currentRole !== userProfile.role)
      dataToUpdate.role = currentRole;
    if (currentStatus && currentStatus !== userProfile.status)
      dataToUpdate.status = currentStatus;

    // Self-editing prevention (should also be in server action, but good client-side UX)
    if (isSelfEditing) {
      if (
        dataToUpdate.role &&
        dataToUpdate.role !== "admin" &&
        userProfile.role === "admin"
      ) {
        toast.error(
          "You cannot demote your own admin account. Another admin must do this."
        );
        return;
      }
      if (
        dataToUpdate.status &&
        dataToUpdate.status === "inactive" &&
        userProfile.status === "active"
      ) {
        toast.error("You cannot deactivate your own account.");
        return;
      }
    }

    if (Object.keys(dataToUpdate).length > 0) {
      startTransition(() => {
        const saveChanges = async () => {
          const { error } = await updateFullUserProfile(
            userProfile.id,
            dataToUpdate
          );
          if (error) {
            console.error("Error saving profile changes:", error);
            return toast.error(`Failed to update profile: ${error}`);
          }
          toast.success("Profile updated successfully!");
          router.push("/user-management");
          router.refresh();
        };
        saveChanges();
      });
    } else {
      toast.error("No changes to save.");
    }
  };

  return (
    <div className="">
      <div className="flex flex-wrap w-full gap-4 justify-between items-center mb-8">
        <p className="font-fredoka font-semibold text-[20px] sm:text-[24px] lg:text-[32px]">
          Edit Profile for {userProfile.full_name || userProfile.email}
        </p>
        <div className="flex gap-5 items-center">
          <button
            onClick={() => router.push("/user-management")} // Use router.push for client-side navigation
            className="font-fredoka font-semibold sm:text-[20px] text-[#E41000] border-2 border-[#E41000] rounded-full py-1 px-4 sm:py-2 sm:px-8 lg:py-4 lg:px-16"
            disabled={isPending || isUploading || isDeletingAvatar}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="font-fredoka font-semibold sm:text-[20px] text-white bg-primary rounded-full py-1 px-4 sm:py-2 sm:px-8 lg:py-4 lg:px-16"
            disabled={isPending || isUploading || isDeletingAvatar}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-12">
        <div className="flex-1 order-1 sm:order-0">
          <div className="mb-8">
            <p className="text-[18px] font-semibold mb-4">Full Name*</p>
            <input
              className="bg-[#FAFAFA] w-full rounded-full border-2 px-8 py-4 border-[#E4E4E4]"
              placeholder="Full Name"
              name="full_name"
              value={formData.full_name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-8">
            <p className="text-[18px] font-semibold mb-4">Username*</p>
            <input
              className="bg-[#FAFAFA] w-full rounded-full border-2 px-8 py-4 border-[#E4E4E4]"
              placeholder="Username"
              name="username"
              value={formData.username || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-8">
            <p className="text-[18px] font-semibold mb-4">Email*</p>
            {/* Email field might need special handling if you want to change auth email. For now, display only or make it readOnly if not changing via profiles table. */}
            <input
              className="bg-[#FAFAFA] w-full rounded-full border-2 px-8 py-4 border-[#E4E4E4]"
              placeholder="Email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              readOnly // Often emails are updated via auth methods, not direct profile updates
            />
          </div>
          <div>
            <p className="text-[18px] font-semibold mb-4">Phone*</p>
            <input
              className="bg-[#FAFAFA] w-full rounded-full border-2 px-8 py-4 border-[#E4E4E4]"
              placeholder="Phone Number"
              name="phone"
              value={formData?.phone || ""}
              onChange={handleChange}
            />
          </div>

          {/* Role and Status Selectors */}
          <div className="mb-8 mt-8">
            <p className="text-[18px] font-semibold mb-4">Role</p>
            <select
              className="bg-[#FAFAFA] w-full rounded-full border-2 px-8 py-4 border-[#E4E4E4]"
              name="role"
              value={formData.role || "user"} // Default to 'user' if null/undefined
              onChange={handleChange}
              disabled={isSelfEditing && formData.role === "admin"} // Admin cannot demote self
            >
              <option value="user">User</option>
              <option value="dealer">Dealer</option>
              <option value="admin">Admin</option>
            </select>
            {isSelfEditing && formData.role === "admin" && (
              <p className="mt-1 text-sm text-red-600">
                You cannot demote your own admin account.
              </p>
            )}
          </div>

          <div className="mb-8">
            <p className="text-[18px] font-semibold mb-4">Status</p>
            <select
              className="bg-[#FAFAFA] w-full rounded-full border-2 px-8 py-4 border-[#E4E4E4]"
              name="status"
              value={formData.status || "active"} // Default to 'active' if null/undefined
              onChange={handleChange}
              disabled={isSelfEditing && formData.status === "inactive"} // Admin cannot deactivate self
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {isSelfEditing && formData.status === "inactive" && (
              <p className="mt-1 text-sm text-red-600">
                You cannot deactivate your own account.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="bg-[#DDDDDD] h-[240px] w-[240px] flex items-center justify-center overflow-hidden rounded-md">
            {displayedAvatarUrl ? (
              <img
                alt="Profile pic"
                width={240}
                height={240}
                src={displayedAvatarUrl}
                // objectFit="cover"
                className=" overflow-hidden"
              />
            ) : (
              <span className="text-gray-500 text-sm">No Avatar</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <input
              type="file"
              name="avatar"
              id="avatar"
              hidden
              accept="image/*"
              ref={avatarRef}
              onChange={handleUpload}
              disabled={isUploading || isPending || isDeletingAvatar}
            />
            <button
              type="button" // Important: type="button" to prevent form submission
              onClick={() => avatarRef.current?.click()}
              className="flex gap-[12px] items-center px-6 py-4 font-fredoka rounded-md disabled:opacity-50"
              disabled={isUploading || isPending || isDeletingAvatar}
            >
              <ImageIcon />
              <p className="font-semibold text-primary sm:text-[20px]">
                {isUploading ? "Uploading..." : "Change Image"}
              </p>
            </button>
            <button
              type="button" // Important: type="button"
              onClick={handleDeleteAvatar}
              className="flex gap-[12px] items-center px-6 py-4 font-fredoka rounded-md disabled:opacity-50"
              disabled={
                !formData.avatar_url ||
                isDeletingAvatar ||
                isPending ||
                isUploading
              } // Disable if no avatar or operations active
            >
              <DeleteIcon />
              <p className="text-[#DA2328] font-semibold sm:text-[20px]">
                {isDeletingAvatar ? "Deleting..." : "Delete Image"}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
