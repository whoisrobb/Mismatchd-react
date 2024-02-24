import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col items-center px-4 lg:px-12">
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout