export default function Page() {
  return (
    <div className="w-full h-full flex justify-center items-center bg-[linear-gradient(180deg,_#D8ACFF_0%,_#ECD7FF_48.08%,_#D8ACFF_100%)]">
      <div className="px-6 py-6 rounded-[16px] w-full h-full max-w-140 max-h-150 bg-white flex flex-col justify-between">
        <div className="mb-5 w-full flex flex-col justify-center items-center">
          <img className="mb-5" src={"ivin-logo-login.svg"} />
          <p className="font-fredoka font-medium text-[24px]">
            Sign in to your account
          </p>
          <p className="font-fredoka font-medium text-[16px] text-[#4D4D4D]">
            Enter your details to proceed further
          </p>
        </div>

        <div className="w-full mb-8">
        <p className="mb-4 text-primary font-semibold">Email</p>
        <input
          className="bg-[#FAFAFA]  px-8 py-4 border border-[#E4E4E4]  rounded-full w-full focus:outline-primary"
          placeholder="Enter your email"
        ></input>
      </div>
      <div className="w-full mb-8">
        <p className="mb-4 text-primary font-semibold">Password</p>
        <input
          className="bg-[#FAFAFA]  px-8 py-4 border border-[#E4E4E4]  rounded-full w-full focus:outline-primary"
          placeholder="Enter your password"
        ></input>
      </div>

      <div className="flex justify-between w-full mb-8">
        <div className="flex gap-[12px] cursor-pointer">
          <input
            className=" accent-primary outline-none"
            type="checkbox"
            id="remember"
            name="remember"
            value="remember"
          />
          <label htmlFor="remember" className="text-[18px]">
            Remember me
          </label>
        </div>
        <p className="text-primary text-[18px] font-semibold">
          Forgot Password
        </p>
      </div>

      <button className="px-10 py-4 font-fredoka bg-primary text-white font-semibold rounded-full w-full whitespace-nowrap">
        Sign in{" "}
      </button>


      </div>
    </div>
  );
}
