import { getCookie } from "@/services/auth/tokenHandlers";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
// import LogoutButton from "../shared/LogoutButton";
import Logo from "./Logo";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import NavbarAuthButtons from "./NavbarAuthButtons";

// interface NavbarProps {
//   accessToken: string | null;
//   role: string | null;
// }

// const PublicNavbar = async ({ accessToken, role }: NavbarProps) => {
const PublicNavbar = async () => {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Explore Events" },
    // { href: "/events", label: "Explore Events" },
    // { href: "/become-host", label: "Become a Host" },
    // { href: "/dashboard", role: "USER", label: "Dashboard" },
  ];

  const accessToken = await getCookie("accessToken");
  const userInfo = accessToken ? await getUserInfo() : null;
  const dashboardRoute = userInfo
    ? getDefaultDashboardRoute(userInfo.role)
    : "/";

  if (userInfo && userInfo.role === "USER") {
    navItems.push(
      { href: "dashboard/become-host", label: "Become a Host" },
      { href: "dashboard/my-bookings", label: "My Bookings" }
    );
  }
  if (userInfo && userInfo.role === "HOST") {
    navItems.push(
      { href: "/host/dashboard/create-event", label: "Create Event" },
      { href: "/host/dashboard/my-events", label: "My Events" }
    );
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur  dark:bg-background/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo></Logo>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          {/* <AISearchDialog /> */}
          <NavbarAuthButtons
            initialHasToken={!!accessToken}
            initialUserInfo={userInfo}
            initialDashboardRoute={dashboardRoute}
          />
        </div>

        {/* <div className="hidden md:flex items-center space-x-2">
          {accessToken ? (
            <LogoutButton />
          ) : (
            <div>
              <Link href="/login">
                <Button className="text-white px-6 py-2 rounded-lg transition-colors">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="text-white px-6 py-2 rounded-lg transition-colors ml-2">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div> */}

        {/* Mobile Menu */}

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-lg font-medium"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                {/* <div className="border-t pt-4 flex flex-col space-y-4">
                  <div className="flex justify-center"></div>
                  <Link
                    href="/login"
                  >
                    <Button className=" text-white px-6 py-2 rounded-lg transition-colors">Login</Button>
                  </Link>
                  <Link
                    href="/register"
                    
                  >
                    <Button className=" text-white px-6 py-2 rounded-lg transition-colors">Register</Button>
                  </Link>
                </div> */}

                <div className="flex items-center space-x-2">
                  <NavbarAuthButtons
                    initialHasToken={!!accessToken}
                    initialUserInfo={userInfo}
                    initialDashboardRoute={dashboardRoute}
                  />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
