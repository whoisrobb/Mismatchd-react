import { Button } from "@/components/ui/button";
import { dashboardNavConfig } from "@/lib/nav-config"
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom"

const DashboardNav = () => {
    const { pathname } = useLocation();
  return (
    <div className="flex gap-2">
        {dashboardNavConfig.map((nav) => (
            <Button variant={'ghost'} key={nav.title}>
                <Link to={nav.href} className={cn(
                    'capitalize text-lg',
                    nav.href.includes(pathname)
                    ? 'text-accent-foreground'
                    : 'text-muted-foreground'
                )}>
                    {nav.title}
                </Link>
            </Button>
        ))}
    </div>
  )
}

export default DashboardNav