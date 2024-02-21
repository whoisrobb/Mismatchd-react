import { Button } from "@/components/ui/button";
import ProductCard from "@/layouts/product-card";
import ProductShell from "@/layouts/product-shell";
import { getProducts } from "@/lib/server-functions/dashboard";
import { TProduct } from "@/lib/types/types";
import { useUser } from "@clerk/clerk-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const { user } = useUser();
    const [products, setProducts] = useState<TProduct[] | []>([]);
  
    useEffect(() => {
      getCategories();
    }, [])
  
    const getCategories = async () => {
      const data = await getProducts();
      setProducts(data);
    }
  return (
    <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center text-center h-[calc(100vh-5rem)] justify-center gap-4 max-w-6xl">
            <Link to={'https://github.com/whoisrobb/mismatchd-react'}>
                <Button variant={'secondary'} className="flex items-center">
                        <GitHubLogoIcon className="mr-2" />
                    Star on GitHub
                </Button>
            </Link>
            <h1 className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent lg:text-7xl text-5xl font-bold">
                No trends, just statement. Dress Loud. Express yourself loud.
            </h1>
            <p className="text-muted-foreground lg:text-xl">
                Mismatchd is an enterprise ecommerce app with an intergrated CMS dashboard built with React, Express and PostgreSQL.
            </p>
            <div className="flex gap-2">
                <Link to={user ? '/products' : '/sign-in'}>
                    <Button>
                        Buy now
                    </Button>
                </Link>
                <Link to={'/dashboard/store'}>
                    <Button variant={'outline'}>
                        Sell now
                    </Button>
                </Link>
            </div>
        </div>
        <div className="flex flex-col gap-24">
            <ProductShell
                title='Featured Products'
                subtitle='Fashion foward selections just for you'
                href='products'
                linkName="View all products"
                className=""
            >
                <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 gap-4">
                    {products.length > 1 &&
                    products.map((item) => (
                        <ProductCard image={item.imageUrls[1]} name={item.name} price={item.price} productId={item.productId} category={item.category} />
                    ))}
                </div>
            </ProductShell>

            <ProductShell
                title='Featured Stores'
                subtitle='Curated collections from our featured stores'
                href='stores'
                linkName="View all stores"
                className=""
            >
            <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 gap-4">
                content here
            </div>
            </ProductShell>
        </div>
    </div>
  )
}

export default Home;