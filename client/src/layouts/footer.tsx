import { ModeToggle } from "@/components/ui/mode-toggle"

const Footer = () => {
  return (
      <div className="w-full flex justify-between border-t py-2 max-h-24">
          <p>Footer</p>
          <ModeToggle />
      </div>
  )
}

export default Footer;