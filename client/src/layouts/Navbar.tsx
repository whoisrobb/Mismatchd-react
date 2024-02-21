import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";
import { SignedOut, SignedIn, SignInButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import UserButton from "./user-button";
import CartSheet from "@/checkout/cart-sheet";

const Navbar = () => {
  const { user } = useUser();
  return (
        <div className="w-full border-b px-2 flex items-center justify-between h-20">
            <div className="flex items-center gap-8">
                <Link to={'/'} className="font-bold text-xl">Mismatchd</Link>
                <DesktopNav />
            </div>
            <div className="flex items-center gap-2">
                <CartSheet />
                <MobileNav />
                
                <div className="hidden lg:block md:block">
                  <SignedIn>
                    {user?.hasImage &&
                    <UserButton />}
                  </SignedIn>
                </div>

                <SignedOut>
                  <SignInButton />
                </SignedOut>
            </div>
        </div>
  )
}

export default Navbar