import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { dashboardNavConfig, siteConfig } from "@/lib/nav-config";
import { Link } from "react-router-dom";

  
const MobileNav = () => {
  return (
    <div className="lg:hidden">
        <Sheet>
            <SheetTrigger>
                <HamburgerMenuIcon />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{siteConfig.name}</SheetTitle>
                        <SheetDescription>
                        </SheetDescription>
                    </SheetHeader>

                    <div className="h-full overflow-y-scroll">
                        <Accordion type="multiple">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="capitalize text-secondary-foreground">{siteConfig.siteNav.title}</AccordionTrigger>
                                {siteConfig.siteNav.items.map((nav, index) => (
                                <div className="" key={index}>
                                    <AccordionContent>
                                        <Link to={nav.href} className="text-muted-foreground focus:text-secondary-foreground">{nav.title}</Link>
                                    </AccordionContent>
                                </div>))}
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger className="capitalize text-secondary-foreground">my account</AccordionTrigger>
                                {dashboardNavConfig.map((nav) => (
                                    <AccordionContent key={nav.title}>
                                        <Link to={nav.href} className="text-muted-foreground focus:text-secondary-foreground capitalize">{nav.title}</Link>
                                    </AccordionContent>
                                ))}
                            </AccordionItem>

                            {siteConfig.mainNav.map((nav, index) => (
                            <AccordionItem value={`item-${index+3}`} key={index}>
                                <AccordionTrigger className="capitalize text-secondary-foreground">{nav.title}</AccordionTrigger>
                                {nav.items.map((nav, index) => (
                                <div className="" key={index}>
                                    <AccordionContent>
                                        <Link to={nav.href} className="text-muted-foreground focus:text-secondary-foreground">{nav.title}</Link>
                                    </AccordionContent>
                                </div>))}
                            </AccordionItem>))}
                        </Accordion>
                    </div>

            </SheetContent>
        </Sheet>
    </div>
  )
}

export default MobileNav;