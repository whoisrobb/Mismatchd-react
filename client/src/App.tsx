import { Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/footer";
import Account from "./app/dashboard/account";
import Blog from "./app/dashboard/blog";
import Site from "./app/dashboard/site";
import Stores from "./app/dashboard/stores";
import Store from "./app/dashboard/store";
import Home from "./app/home/home";
import { Toaster } from "./components/ui/sonner";
import Category from "./app/home/category";


function App() {
  return (
    <div className="flex flex-col items-center px-4 lg:px-12 font-inter">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/categories/:category" element={<Category />} />
        <Route path="dashboard/account" element={<Account />} />
        <Route path="dashboard/blog" element={<Blog />} />
        <Route path="dashboard/site" element={<Site />} />
        <Route path="dashboard/stores" element={<Stores />} />
        <Route path="dashboard/store/:storeId" element={<Store />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
