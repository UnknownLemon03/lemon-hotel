'use client'
import { LogOut } from "@/backend/Auth";
import { link } from "fs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

export function Navbar({ isLogin }: { isLogin: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { name: "Home", href: "/", onClick: () => {} },
    { name: "Hotels", href: "/hotels", onClick: () => {} },
  ];
  if (isLogin)
    links.push(
      { name: "Dashboard", href: "/dashboard", onClick: () => {} },
      { name: "Logout", href: "#", onClick: () => { LogOut(); toast.success("Logout Successful"); } }
    );
  else
    links.push({ name: "Login/SignUp", href: "/auth", onClick: () => {} });

  const path = usePathname();

  if (path.split("/")[1] == "dashboard") return null;
  return (
    <nav className="dark:bg-gray-900 mb-5">
      <div className="max-w-screen flex flex-wrap items-center justify-between p-4 mx-[6%]">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
        <button onClick={() => setMenuOpen(!menuOpen)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${menuOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {links.map((e, i) => (
              <li key={i} className="my-1">
                <Link onClick={e.onClick} href={e.href} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
                  {e.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
