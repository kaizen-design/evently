"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathname = usePathname();
  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map(({ route, label }, i) => {
        const isActive:Boolean = route === pathname;
        return (
          <li 
            key={i} 
            className={`${isActive && "text-primary-500 cursor-default"} flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link href={route}>
              {label}
            </Link>
          </li>  
        )
      })}
    </ul>
  )
};

export default NavItems;