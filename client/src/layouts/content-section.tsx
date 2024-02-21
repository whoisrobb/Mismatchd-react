import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react"
import { Link } from "react-router-dom";

interface ContentSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode,
    title: string,
    subtitle: string | null,
}

const ContentSection: React.FC<ContentSectionProps> = ({ children, title, subtitle, className }) => {
  return (
    <div className={cn("space-y-6 min-h-[calc(100vh-5rem)] w-full my-4", className)}>
        <div className="mb-6">
            <Link to={'..'}>
                <Button variant={'outline'} size={'icon'} className="rounded-full mb-4"><ChevronLeftIcon /></Button>
            </Link>
            <h1 className="text-4xl font-bold capitalize">{title}</h1>
            {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
    </div>
  )
}

export default ContentSection;