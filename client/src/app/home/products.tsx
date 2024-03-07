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
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
  
  
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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    console.log('currentPage', currentPage)
    console.log('totalPages', totalPages)
  
    useEffect(() => {
      getCategories();
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [priceFrom, priceTo, order, orderBy, category, subCategory, currentPage]);
  
    const fetchProducts = async () => {
      const { products, page, totalPages } = await getFilteredProducts({ priceFrom, priceTo, order, orderBy, category, subCategory, currentPage });
      setProducts(products);
      setCurrentPage(page)
      setTotalPages(totalPages)
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
            products.length > 0 ?
            <div className="">
                <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 gap-4">
                    {products?.map((item) => (
                        <ProductCard
                            product={item}
                        />
                    ))}
                </div>
                {totalPages &&
                <div className="w-full flex justify-center">
                <div className="flex items-center gap-2">
                    <Button variant={'ghost'} className='text-muted-foreground' onClick={() => setCurrentPage((prev) => prev -= 1)} disabled={currentPage == 1}>
                    <ChevronLeftIcon />
                    Previous
                    </Button>
        
                    {currentPage > 1 &&
                    <Button variant={'ghost'} disabled>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    </Button>}
        
                    <Button variant={'outline'} size={'icon'}>{currentPage}</Button>
        
                    {currentPage < totalPages &&
                    <Button variant={'ghost'} disabled>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    </Button>}
        
                    <Button variant={'ghost'} className='text-muted-foreground' onClick={() => setCurrentPage((prev) => prev += 1)} disabled={currentPage == totalPages}>
                    Next
                    <ChevronRightIcon />
                    </Button>
                </div>
                </div>}
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