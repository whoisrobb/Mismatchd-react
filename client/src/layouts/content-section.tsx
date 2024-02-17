import { cn } from "@/lib/utils";
import { ReactNode } from "react"

interface ContentSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode,
    title: string,
    subtitle: string,
}

const ContentSection: React.FC<ContentSectionProps> = ({ children, title, subtitle, className }) => {
  return (
    <div className={cn("space-y-6 min-h-[calc(100vh-5rem)] w-full my-4", className)}>
        <div className="mb-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>
        {children}
    </div>
  )
}

export default ContentSection;