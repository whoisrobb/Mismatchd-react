import { LayoutProps } from "@/lib/types/types";

const Container: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-[1440px] w-full">
        {children}
    </div>
  )
}

export default Container;