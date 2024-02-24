import { Route, Routes } from "react-router-dom";
import Account from "./app/dashboard/account";
import Blog from "./app/dashboard/blog";
import Site from "./app/dashboard/site";
import Stores from "./app/dashboard/stores";
import Store from "./app/dashboard/store";
import Home from "./app/home/home";
import { Toaster } from "./components/ui/sonner";
import Category from "./app/home/category";
import Product from "./app/home/product";
import ProductFilter from "./app/home/test";
import Products from "./app/home/products";
import Login from "./app/auth/sign-in";
import Layout from "./app/layout";


function App() {
  return (
    <div className="font-inter">
      <Routes>
        <Route path='/sign-in' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<Product />} />
          <Route path="categories/:category" element={<Category />} />
          <Route path="dashboard/account" element={<Account />} />
          <Route path="dashboard/blog" element={<Blog />} />
          <Route path="dashboard/site" element={<Site />} />
          <Route path="dashboard/stores" element={<Stores />} />
          <Route path="dashboard/store/:storeId" element={<Store />} />
        </Route>
        <Route path='/test' element={<ProductFilter />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
