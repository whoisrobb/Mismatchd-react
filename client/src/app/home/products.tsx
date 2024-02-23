import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    // SheetDescription,
    // SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Card,
    CardContent,
    CardDescription,
    // CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    // SelectGroup,
    SelectItem,
    // SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TCategory, TProduct } from "@/lib/types/types";
import { getCategory, getFilteredProducts } from "@/lib/server-functions/dashboard";
import ProductCard from "@/layouts/product-card";
import ContentSection from "@/layouts/content-section";
  
  
const Products = () => {
    const [products, setProducts] = useState<TProduct[] | null>(null);
    const [priceFrom, setPriceFrom] = useState<string | null>(null);
    const [priceTo, setPriceTo] = useState<string | null>(null);
    const [order, setOrder] = useState<string | null>(null);
    const [orderBy, setOrderBy] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<TCategory[]>([]);
  
    useEffect(() => {
      getCategories();
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [priceFrom, priceTo, order, orderBy, selectedCategory]);
  
    const fetchProducts = async () => {
      const data = await getFilteredProducts({ priceFrom, priceTo, order, orderBy, category: selectedCategory });
      setProducts(data);
    }
  
    const getCategories = async () => {
      const data = await getCategory();
      setCategories(data);
    }

    const handleOrder = (value: string) => {
        setOrder(value);
    }

    const handleOrderBy = (value: string) => {
        setOrderBy(value);
    }
    
    const handleCategory = (value: string) => {
        setSelectedCategory(value);
    }

    console.log(products)
  return (
    <ContentSection
        title="Products"
        subtitle={null}
        className=""
    >
        <div className="">
            <Sheet>
                <SheetTrigger>
                    <Button>Filters</Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col gap-4">
                    <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    {/* <SheetDescription></SheetDescription> */}
                    </SheetHeader>
                    <div className="">
                        <Card>
                            <CardHeader>
                                <CardTitle>Price</CardTitle>
                                <CardDescription>Set your price range</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="number"
                                        // value={}
                                        onChange={(e) => setPriceFrom(e.target.value)}
                                        placeholder="Price from"
                                    />
                                        <span>-</span>
                                    <Input
                                        type="number"
                                        // value={}
                                        onChange={(e) => setPriceTo(e.target.value)}
                                        placeholder="Price to"
                                    /> 
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Order</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <Select onValueChange={handleOrder}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Order:" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="asc">Ascending</SelectItem>
                                        <SelectItem value="desc">Descending</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select onValueChange={handleOrderBy}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Order By:" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="price">Price</SelectItem>
                                        <SelectItem value="createdAt">Date</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                        
                    <div className="">
                        <Select onValueChange={handleCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories?.map((cat) => (
                                    <SelectItem value={cat.title} key={cat.categoryId}>{cat.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full justify-self-end">Clear filters</Button>
                </SheetContent>
            </Sheet>
        </div>

        {products &&
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            {products.map((item) => (
                <ProductCard
                    product={item}
                />
            ))}
        </div>}
    </ContentSection>
  )
}

export default Products