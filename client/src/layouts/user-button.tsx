import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { DashboardIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";

const UserButton = () => {
    const navigate = useNavigate();
    const { user } = useUser();
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>
                {user?.firstName ? <p className="">{user.firstName}</p> : <p className="">{user?.username}</p> }
                <p className="text-muted-foreground">{user?.emailAddresses[0].emailAddress}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Link to={'/dashboard/account'} className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                    </svg>
                    <p>Profile</p>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link to={'/dashboard/stores'} className="flex items-center space-x-2">
                    <DashboardIcon />
                    <p>Dashboard</p>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link to={'/settings'} className="flex items-center space-x-2">
                    <GearIcon/>
                    <p>Settings</p>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="space-x-2">
                <ExitIcon />
                <SignOutButton signOutCallback={() => navigate('/')} />
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default UserButton;