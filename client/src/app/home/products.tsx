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
import { useSearchParams } from "react-router-dom";
  
  
const Products = () => {
    
    const DEFAULT_FILTERS = {
        priceFrom: "",
        priceTo: "",
        order: "",
        orderBy: "price",
        category: "",
        subCategory: "",
    };

    const [searchParams, setSearchParams] = useSearchParams(DEFAULT_FILTERS);

    const priceFrom = searchParams.get("priceFrom");
    const priceTo = searchParams.get("priceTo");
    const order = searchParams.get("order");
    const orderBy = searchParams.get("orderBy");
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");

    const [products, setProducts] = useState<TProduct[] | null>(null);
    const [categories, setCategories] = useState<TCategory[]>([]);
  
    useEffect(() => {
      getCategories();
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [priceFrom, priceTo, order, orderBy, category, subCategory]);
  
    const fetchProducts = async () => {
      const data = await getFilteredProducts({ priceFrom, priceTo, order, orderBy, category, subCategory });
      setProducts(data);
    }
  
    const getCategories = async () => {
      const data = await getCategory();
      setCategories(data);
    }

    const handleOrder = (value: string) => {
        setSearchParams(prev => {
            prev.set("order", value)
            return prev
        })
    }

    const handleOrderBy = (value: string) => {
        setSearchParams(prev => {
            prev.set("orderBy", value)
            return prev
        })
    }
    
    const handleCategory = (value: string) => {
        setSearchParams(prev => {
            prev.set("category", value)
            return prev
        })
    }
    
    const handleSubcategory = (value: string) => {
        setSearchParams(prev => {
            prev.set("subCategory", value)
            return prev
        })
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
                                        onChange={(e) => setSearchParams((prev) => ({ ...prev, priceFrom: e.target.value }))}
                                        placeholder="Price from"
                                    />
                                        <span>-</span>
                                    <Input
                                        type="number"
                                        onChange={(e) => setSearchParams((prev) => ({ ...prev, priceTo: e.target.value }))}
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
                        
                    <div className="grid grid-cols-2 gap-2">
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
                    
                        <Select onValueChange={handleSubcategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Set sub-category" />
                            </SelectTrigger>
                            <SelectContent>
                                
                            {categories.map((category) => (
                                <div key={category.categoryId}>
                                {category.Subcategories.map((subcategory) => (
                                    <SelectItem value={subcategory.title} key={subcategory.subcategoryId} className="subcategory">{subcategory.title}</SelectItem>
                                ))}
                                </div>
                            ))}
                            </SelectContent>
                        </Select>
                    </div>


                    <Button className="w-full justify-self-end" onClick={() => setSearchParams(DEFAULT_FILTERS)}>Clear filters</Button>
                </SheetContent>
            </Sheet>
        </div>

        {products ?
            products.length > 1 ?
                <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 gap-4">
                    {products?.map((item) => (
                        <ProductCard
                            product={item}
                        />
                    ))}
                </div>
            :   <div className="text-center">
                    <h1 className="text-3xl font-bold">No products found</h1>
                    <p className="text-muted-foreground text-lg">Try changing your filters,<br/>or check back later for new products</p>
                </div>
        :   <div className="">
            {/* skeleton goes here */}
            </div>}
    </ContentSection>
  )
}

export default Products