import Navbar from "@/components/layout/navbar";
import UserManagement from "@/components/user-management";

export default function page() {
  return (
    <>
      <Navbar></Navbar>
      <div className="px-5 md:px-20 pt-3 md:pt-6">
        <div>
          <div className="flex flex-wrap w-full gap-4 justify-between items-center mb-8">
            <p className="font-fredoka font-semibold text-[20px] sm:text-[24px] lg:text-[32px]">
              Manage Password
            </p>

            <div className="flex gap-5  items-center">
              <button className="font-fredoka font-semibold sm:text-[20px] text-[#E41000] outline-2 outline-[#E41000] rounded-full py-1 px-4  sm:py-2 sm:px-8 lg:py-4 lg:px-16">
                Cancel
              </button>
              <button className="font-fredoka font-semibold sm:text-[20px] text-white bg-primary rounded-full py-1 px-4  sm:py-2 sm:px-8 lg:py-4 lg:px-16">
                Change Password
              </button>
            </div>
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
          <p className="text-[18px] font-semibold mb-4">
            Confirm New Password*
          </p>
          <input
            className="bg-[#FAFAFA] w-full rounded-full border-2 px-8 py-4 border-[#E4E4E4]"
            placeholder="e.g. 1HGCM82633A004352"
          ></input>
        </div>
      </div>
    </>
  );
}
