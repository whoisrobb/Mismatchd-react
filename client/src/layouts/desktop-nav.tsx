import React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    // NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    // NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
// import Link from "next/link";
import { siteConfig } from "@/lib/nav-config";
import { useLocation } from "react-router-dom";
import DashboardNav from "./dashboard-nav";
  

const DesktopNav = () => {
  const { pathname } = useLocation();
  return (
    <div className="hidden lg:block">
      {pathname.includes('dashboard') ?
      <DashboardNav />
      : <NavigationMenu>
          <NavigationMenuList>
              <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-muted-foreground text-lg">Lobby</NavigationMenuTrigger>
                  <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <li className="row-span-3">
                              <NavigationMenuLink asChild>
                              <a
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                  href="/"
                              >
                                  {/* <Icons.logo className="h-6 w-6" /> */}
                                  <div className="mb-2 mt-4 text-lg font-medium">
                                      {siteConfig.name}
                                  </div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                      {siteConfig.description}
                                  </p>
                              </a>
                              </NavigationMenuLink>
                          </li>
                          {siteConfig.siteNav.items.map((component) => (
                              <ListItem
                                  key={component.title}
                                  title={component.title}
                                  href={component.href}
                              >
                                  {component.description}
                              </ListItem>
                          ))}
                      </ul>
                  </NavigationMenuContent>
              </NavigationMenuItem>

              {siteConfig.mainNav.map((nav) => (
              <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-muted-foreground text-lg capitalize">{nav.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                          {nav.items.map((component) => (
                              <ListItem
                                  key={component.title}
                                  title={component.title}
                                  href={component.href}
                              >
                                  {component.description}
                              </ListItem>
                          ))}
                      </ul>
                  </NavigationMenuContent>
              </NavigationMenuItem>))}

          </NavigationMenuList>
      </NavigationMenu>}
    </div>
  )
}

export default DesktopNav;


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"