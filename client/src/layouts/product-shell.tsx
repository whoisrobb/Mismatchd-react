import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ProductShellProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    title: string,
    subtitle: string,
    href: string,
    linkName: string,
}

const ProductShell: React.FC<ProductShellProps> = ({ children, title, subtitle, href, linkName, className }) => {
  return (
    <div className={cn('w-full flex flex-col items-center text-center gap-4', className)}>
        <div className="">
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>
        {children}
        <div className="">
            <Button variant={'outline'} size={'lg'}>
                <Link to={`/${href}`} className="flex items-center space-x-2 text-lg">
                    <p className="">{linkName}</p>
                    <ChevronRightIcon />
                </Link>
            </Button>
        </div>
    </div>
  )
}

export default ProductShell