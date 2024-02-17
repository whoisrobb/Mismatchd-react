import { Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/footer";
import Account from "./app/dashboard/account";
import Blog from "./app/dashboard/blog";
import Site from "./app/dashboard/site";
import Stores from "./app/dashboard/stores";
import Home from "./app/home/home";


function App() {
  return (
    <div className="flex flex-col items-center px-4 lg:px-12 font-inter">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="dashboard/account" element={<Account />} />
        <Route path="dashboard/blog" element={<Blog />} />
        <Route path="dashboard/site" element={<Site />} />
        <Route path="dashboard/stores" element={<Stores />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
