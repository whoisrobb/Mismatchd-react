import ContentSection from "@/layouts/content-section";
import { getSingleStore } from "@/lib/server-functions/dashboard";
import { TStore } from "@/lib/types/types";
import { PlusIcon } from "@radix-ui/react-icons";
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
import { Button } from "@/components/ui/button";
import ProductForm from "@/components/forms/product-form";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const store = () => {
    // const { storeId } = params;
    const { storeId } = useParams();
    const [store, setStore] = useState<TStore | null>(null);

    useEffect(() => {
        fetchStore()
    }, [])
    
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
                    // &::-webkit-scrollbar {
                    //   width: 0;
                    //   height: 0; /* Hide horizontal and vertical scrollbars */
                    // }
                  }}>
                  <ProductForm storeId={storeId as string} />
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </ContentSection>
  )
}

export default store