import { ModeToggle } from "@/components/ui/mode-toggle"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
      <div className="w-full flex justify-between border-t py-2 max-h-24">
        <div className="lg:flex lg:items-center">
          <p>Built by <Link to={'#'} className="underline">Robbie</Link>.</p>
          <p>Source code available on <Link to={'https://github.com/whoisrobb/mismatchd-react'} className="underline">GitHub</Link>.</p>
        </div>
          <ModeToggle />
      </div>
  )
}

export default Footer;