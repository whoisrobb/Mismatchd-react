import { ModeToggle } from "@/components/ui/mode-toggle"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
      <div className="w-full flex justify-between border-t py-2 max-h-24">
          <p>Built by <Link to={'#'} className="underline">Robbie</Link>. Source code available on <Link to={'https://github.com/whoisrobb/mismatchd-react'} className="underline">GitHub</Link></p>
          <ModeToggle />
      </div>
  )
}

export default Footer;