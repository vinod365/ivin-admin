import Image from "next/image";
import Link from "next/link";

const navbarItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  {name:  "Community" , href:"/community"},
  { name: "About Us", href: "/about-us" },
  { name: "Admin Login", href: "/admin-login" },
];

export default function Navbar() {
  return (
    <div className="bg-primary text-white">
      <div className="layout h-22 px-20 flex items-center gap-20">
        <Image width={116} height={48} alt="ivin logo" src="ivin-logo.svg" />
        <nav className=" w-full flex gap-6">
          {navbarItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${item.href === "/admin-login" && "underline ml-auto"}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
