import Navbar from "@/components/layout/navbar";
import Delete from "./assets/delete.svg";
import Image from "./assets/image.svg";

export default function page() {
  return (
    <>
      <Navbar />
      <div className="px-5 md:px-20 pt-6">
        <div className="flex flex-wrap w-full gap-4 justify-between items-center mb-8">
          <p className="font-fredoka font-semibold text-[20px] sm:text-[24px] lg:text-[32px]">
            Profile Admin
          </p>
          <div className="flex gap-5  items-center">
            <button className="font-fredoka font-semibold sm:text-[20px] text-[#E41000] outline-2 outline-[#E41000] rounded-full py-1 px-4  sm:py-2 sm:px-8 lg:py-4 lg:px-16">
              Cancel
            </button>
            <button className="font-fredoka font-semibold sm:text-[20px] text-white bg-primary rounded-full py-1 px-4  sm:py-2 sm:px-8 lg:py-4 lg:px-16">
              Save Change
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-20">
          <div className="flex flex-col items-center gap-6">
            <div className="bg-[#DDDDDD] h-[240px] w-[240px]"></div>

            <div className="flex gap-[12px] border-2 px-6 py-4 border-primary rounded-md">
              <Image />
              <p className="font-semibold text-primary">Pilih Foto</p>
            </div>

            <div className="flex gap-[12px] border-2 px-6 py-4 border-[#DA2328] rounded-md">
              <Delete />
              <p className="text-[#DA2328] font-semibold">Hapus Foto</p>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-8">
              <p className="text-[18px] font-semibold mb-4">Name*</p>
              <input
                className="bg-[#FAFAFA] w-full rounded-full border-2 px-8 py-4 border-[#E4E4E4]"
                placeholder="e.g. 1HGCM82633A004352"
              ></input>
            </div>
            <div className="mb-8">
              <p className="text-[18px] font-semibold mb-4">Username*</p>
              <input
                className="bg-[#FAFAFA] w-full rounded-full border-2 px-8 py-4 border-[#E4E4E4]"
                placeholder="e.g. 1HGCM82633A004352"
              ></input>
            </div>
            <div className="mb-8">
              <p className="text-[18px] font-semibold mb-4">Email*</p>
              <input
                className="bg-[#FAFAFA] w-full rounded-full border-2 px-8 py-4 border-[#E4E4E4]"
                placeholder="e.g. 1HGCM82633A004352"
              ></input>
            </div>
            <div>
              <p className="text-[18px] font-semibold mb-4">Phone*</p>
              <input
                className="bg-[#FAFAFA] w-full rounded-full border-2 px-8 py-4 border-[#E4E4E4]"
                placeholder="e.g. 1HGCM82633A004352"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
