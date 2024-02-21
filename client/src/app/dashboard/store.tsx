import ContentSection from "@/layouts/content-section";
import { getSingleStore, getStoreProducts } from "@/lib/server-functions/dashboard";
import { TProduct, TStore } from "@/lib/types/types";
import { PlusIcon, StarIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/forms/product-form";
import UpdateProductForm from "@/components/forms/update-product";

const store = () => {
    // const { storeId } = params;
    const { storeId } = useParams();
    const [store, setStore] = useState<TStore | null>(null);
    const [storeProducts, setStoreProducts] = useState<TProduct[] | []>([]);
  
    useEffect(() => {
      getCategories();
      fetchStore()
    }, [])
  
    const getCategories = async () => {
      const data = await getStoreProducts(storeId as string);
      setStoreProducts(data);
    }
    
  const fetchStore = async () => {
    const data = await getSingleStore(storeId as string);
    setStore(data);
  };
  return (
    store && 
    <ContentSection
        title={`${store.name}`}
        subtitle='Manage your store products.'
        className='max-w-[900px]'
    >
      <div className="flex flex-col gap-4">
        <div className="">
          <Dialog>
            <DialogTrigger>
              <Button variant={'secondary'}>Create product <PlusIcon className='ml-2' /></Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new product.</DialogTitle>
                <DialogDescription>
                  <div className="h-[80vh] rounded-md p-4 overflow-x-hidden"
                    style={{
                      overflowY: 'scroll',
                      scrollbarWidth: 'none',
                    }}>
                    <ProductForm storeId={storeId as string} />
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
        {storeProducts.length > 0 && storeProducts.map((product) => (
          <div key={product.productId} className="w-full">
            <Dialog>
              <DialogTrigger className="w-full h-full">
                <Card className="text-left hover:bg-secondary transition-colors h-full">
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="flex items-center gap-2">Sub-category <span className="text-muted-foreground">{product.subCategory}</span></p>
                    <p className="flex items-center gap-2">Rating <span className="text-muted-foreground flex items-center gap-1">{product.ratings} <StarIcon /></span></p>
                    <p className="flex items-center gap-2">Tag <span className="text-muted-foreground">{product.tags}</span></p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start">
                    <p className="">{`KSH ${product.price}`}</p>
                    <p className="flex items-center gap-2">{product.inventory}<span className="text-muted-foreground">in stock</span></p>
                  </CardFooter>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update product contents</DialogTitle>
                  <DialogDescription>
                    <div className="h-[80vh] rounded-md p-4 overflow-x-hidden"
                      style={{
                        overflowY: 'scroll',
                        scrollbarWidth: 'none',
                      }}>
                      <UpdateProductForm storeId={product.StoreStoreId as string} product={product} />
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>))}
        </div>
      </div>
    </ContentSection>
  )
}

export default store