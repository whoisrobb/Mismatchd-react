import { cn } from "@/lib/utils";
import { ReactNode } from "react"

interface SiteShellProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode,
    title: string,
}

const SiteShell: React.FC<SiteShellProps> = ({ children, title, className }) => {
  return (
    <div className={cn("space-y-6 w-full my-4", className)}>
        <div className="">
            <h1 className="text-xl font-bold">{title}</h1>
        </div>
        {children}
    </div>
  )
}

export default SiteShell;SiteShell