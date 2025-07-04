import Navbar from "@/components/layout/navbar";
import UserManagement from "@/components/user-management";

export default function page() {
  return (
    <>
    <Navbar></Navbar>
    <div className="px-20 pt-6">
      <div className="flex justify-between items-center mb-8">
        <p className="font-Fredoka font-semibold text-[32px]">
          Manage Password
        </p>

        <div className="flex gap-5 items-center">
          <button className="font-Fredoka font-semibold text-[20px] text-[#E41000] outline-2 outline-[#E41000] rounded-full py-4 px-16">
            Cancel
          </button>
          <button className="font-Fredoka font-semibold text-[20px] text-white bg-primary rounded-full py-4 px-16">
            Change Password
          </button>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-[18px] font-semibold mb-4">Current Password*</p>
        <input
          className="bg-[#FAFAFA] w-full rounded-full border-2 px-8 py-4 border-[#E4E4E4]"
          placeholder="e.g. 1HGCM82633A004352"
        ></input>
      </div>
      <div className="mb-8">
        <p className="text-[18px] font-semibold mb-4">New Password*</p>
        <input
          className="bg-[#FAFAFA] w-full rounded-full border-2 px-8 py-4 border-[#E4E4E4]"
          placeholder="e.g. 1HGCM82633A004352"
        ></input>
      </div>
      <div>
        <p className="text-[18px] font-semibold mb-4">Confirm New Password*</p>
        <input
          className="bg-[#FAFAFA] w-full rounded-full border-2 px-8 py-4 border-[#E4E4E4]"
          placeholder="e.g. 1HGCM82633A004352"
        ></input>
      </div>
    </div>
    </>
  );
}
