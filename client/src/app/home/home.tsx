import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const Home = () => {
    const { user } = useUser();
  return (
    <div className="">
        <div className="flex flex-col items-center text-center h-[calc(100vh-5rem)] justify-center gap-4 max-w-6xl">
            <Button variant={'secondary'}>
                <Link to={'https://github.com/whoisrobb/mismatchd-react'} className="flex items-center">
                    <GitHubLogoIcon className="mr-2" />
                    Star on GitHub
                </Link>
            </Button>
            <h1 className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent text-7xl font-bold">
                No trends, just statement. Dress Loud. Express yourself loud.
            </h1>
            <p className="text-muted-foreground text-xl">
                Mismatchd is an enterprise ecommerce app with an intergrated CMS dashboard built with React, Express and PostgreSQL.
            </p>
            <div className="flex gap-2">
                <Button>
                    <Link to={user ? '/products' : '/sign-in'} className="flex items-center">
                        Buy now
                    </Link>
                </Button>
                <Button variant={'outline'}>
                    <Link to={'/dashboard/store'} className="flex items-center">
                        Sell now
                    </Link>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Home;