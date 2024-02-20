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
            <Button variant={'secondary'}>
                <Link to={'https://github.com/whoisrobb/mismatchd-react'} className="flex items-center">
                    <GitHubLogoIcon className="mr-2" />
                    Star on GitHub
                </Link>
            </Button>
            <h1 className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent text-7xl font-bold">
                No trends, just statement. Dress Loud. Express yourself loud.
            </h1>
            <p className="text-muted-foreground text-xl">
                Mismatchd is an enterprise ecommerce app with an intergrated CMS dashboard built with React, Express and PostgreSQL.
            </p>
            <div className="flex gap-2">
                <Button>
                    <Link to={user ? '/products' : '/sign-in'} className="flex items-center">
                        Buy now
                    </Link>
                </Button>
                <Button variant={'outline'}>
                    <Link to={'/dashboard/store'} className="flex items-center">
                        Sell now
                    </Link>
                </Button>
            </div>
        </div>
        <ProductShell
            title='Featured Products'
            subtitle='Explore products from around the world'
            href='products'
            linkName="View all products"
            className=""
        >
            <div className="w-full grid grid-cols-4 gap-4">
                {products.length > 1 &&
                products.map((item) => (
                    <ProductCard image={item.imageUrls[1]} name={item.name} price={item.price} productId={item.productId} />
                ))}
            </div>
            {/* productId: string;
                name: string;
                description: string;
                category: string;
                subCategory: string;
                imageUrls: string[];
                price: number;
                inventory: number;
                ratings: number;
                tags: string;
                StoreStoreId: string; */}
        </ProductShell>
    </div>
  )
}

export default Home;