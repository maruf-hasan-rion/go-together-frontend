import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["USER", "HOST", "ADMIN"],
        },
        {
          title: "My Profile",
          href: `/my-profile`,
          icon: "User",
          roles: ["USER", "HOST", "ADMIN"],
        },
      ],
    },
  ];
};

export const hostNavItems: NavSection[] = [
  {
    title: "Event Management",
    items: [
      {
        title: "Create Event",
        href: "/host/dashboard/create-event",
        icon: "Plus",
        roles: ["HOST"],
      },
      {
        title: "My Events",
        href: "/host/dashboard/my-events",
        icon: "Calendar",
        // badge: "3",
        roles: ["HOST"],
      },
      // {
      //   title: "Participants",
      //   href: "/host/dashboard/participants",
      //   icon: "Users",
      //   roles: ["HOST"],
      // },
      {
        title: "Reviews",
        href: "/host/dashboard/reviews",
        icon: "Star",
        roles: ["HOST"],
      },
    ],
  },
  {
    title: "Financial",
    items: [
      // {
      //   title: "Revenue",
      //   href: "/host/dashboard/revenue",
      //   icon: "DollarSign",
      //   roles: ["HOST"],
      // },
      {
        title: "Payments",
        href: "/host/dashboard/payments",
        icon: "CreditCard",
        roles: ["HOST"],
      },
    ],
  },
];

export const userNavItems: NavSection[] = [
  {
    title: "My Activities",
    items: [
      {
        title: "Joined Events",
        href: "/dashboard/my-bookings",
        icon: "Calendar",
        roles: ["USER"],
      },
      {
        title: "Explore Events",
        href: "/events",
        icon: "Search",
        roles: ["USER"],
      },
      // {
      //   title: "Saved Events",
      //   href: "/dashboard/saved-events",
      //   icon: "Bookmark",
      //   roles: ["USER"],
      // },
    ],
  },
  {
    title: "Beacome a Host",
    items: [
      {
        title: "Become a Host",
        href: "/dashboard/become-host",
        icon: "HomePlus",
        roles: ["USER"],
      },
    ],
  },
  // {
  //   title: "Social",
  //   items: [
  //     {
  //       title: "My Reviews",
  //       href: "/dashboard/my-reviews",
  //       icon: "MessageSquare",
  //       roles: ["USER"],
  //     },
  //     {
  //       title: "Notifications",
  //       href: "/dashboard/notifications",
  //       icon: "Bell",
  //       roles: ["USER"],
  //     },
  //   ],
  // },
];

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        href: "/admin/dashboard/users-management",
        icon: "Users",
        roles: ["ADMIN"],
      },
      {
        title: "Hosts",
        href: "/admin/dashboard/hosts-management",
        icon: "UserCheck",
        roles: ["ADMIN"],
      },
      {
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "Shield",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Host Management",
    items: [
      // {
      //   title: "All Hosts",
      //   href: "/admin/dashboard/hosts-management",
      //   icon: "UserCheck",
      //   roles: ["ADMIN"],
      // },
      {
        title: "Host Applications",
        href: "/admin/dashboard/host-applications",
        icon: "UserCheck",
        roles: ["ADMIN"],
      },
      // {
      //   title: "Admins",
      //   href: "/admin/dashboard/admins-management",
      //   icon: "Shield",
      //   roles: ["ADMIN"],
      // },
    ],
  },
  {
    title: "Event Management",
    items: [
      {
        title: "All Events",
        href: "/admin/dashboard/events-management",
        icon: "Calendar",
        roles: ["ADMIN"],
      },
      // {
      //   title: "Event Categories",
      //   href: "/admin/dashboard/categories-management",
      //   icon: "Grid",
      //   roles: ["ADMIN"],
      // },
      // {
      //   title: "Reported Events",
      //   href: "/admin/dashboard/reported-events",
      //   icon: "Flag",
      //   roles: ["ADMIN"],
      // },
    ],
  },
  // {
  //   title: "Platform Analytics",
  //   items: [
  //     {
  //       title: "Revenue",
  //       href: "/admin/dashboard/revenue",
  //       icon: "TrendingUp",
  //       roles: ["ADMIN"],
  //     },
  //     {
  //       title: "Reviews",
  //       href: "/admin/dashboard/reviews-management",
  //       icon: "Star",
  //       roles: ["ADMIN"],
  //     },
  //     {
  //       title: "Settings",
  //       href: "/admin/dashboard/settings",
  //       icon: "Settings",
  //       roles: ["ADMIN"],
  //     },
  //   ],
  // },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "HOST":
      return [...commonNavItems, ...hostNavItems];
    case "USER":
      return [...commonNavItems, ...userNavItems];
    default:
      return [];
  }
};
