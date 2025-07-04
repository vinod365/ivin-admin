import Image from "next/image";
import Link from "next/link";
import Profile from "../profile";

const navbarItems = [{ name: "Admin Login", href: "/" }];

export default function Navbar() {
  return (
    <div className="bg-primary z-9999 text-white">
      <div className="layout  h-20 px-4 sm:px-20 flex items-center gap-20">
        <Image width={116} height={48} alt="ivin logo" src="ivin-logo.svg" />

        <nav className="w-full flex gap-6">
          {/* {navbarItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${item.href === "/" && "underline ml-auto"}`}
            >
              {item.name}
            </Link>
          ))} */}
          <div className="ml-auto">
            <Profile />
          </div>
        </nav>
      </div>
    </div>
  );
}
