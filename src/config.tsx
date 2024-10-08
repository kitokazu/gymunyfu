import { usePathname } from "next/navigation";
import { Bell, Briefcase, Home, Settings, User, LogOut } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

export const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  return [
    {
      name: "Home",
      href: "/home",
      icon: <Home size={20} />,
      active: pathname === "/",
      position: "top",
    },
    {
      name: "Profile",
      href: "/profile",
      icon: <User size={20} />,
      active: isNavItemActive(pathname, "/profile"),
      position: "top",
    },
    {
      name: "Sign Out",
      href: "/",
      icon: (
        <>
          <SignOutButton>
            <LogOut size={20} />
          </SignOutButton>
        </>
      ),
      active: isNavItemActive(pathname, "/settings"),
      position: "bottom",
    },
  ];
};
