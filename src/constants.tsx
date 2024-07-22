import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Profile",
    path: "/profile",
    icon: <Icon icon="bi:house-door" />,
  },
  {
    title: "Investments",
    path: "/investments",
    icon: <Icon icon="bi:house-door" />,
  },
  {
    title: "Q&A",
    path: "/qna",
    icon: <Icon icon="bi:house-door" />,
  },
];
