import ContentSection from "@/layouts/content-section";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import StoreForm from "@/components/forms/store-form";
import { getStores } from "@/lib/server-functions/dashboard";
import { useEffect, useState } from "react";
import { TStore } from "@/lib/types/types";
import { Link } from "react-router-dom";

const Stores = () => {
  const [stores, setStores] = useState<TStore[] | []>([]);

  useEffect(() => {
    fetchStores();
  }, [])

  const fetchStores = async () => {
    const data = await getStores();
    setStores(data);
  };
  return (
    <ContentSection
        title="Stores"
        subtitle='Manage your stores.'
        className='max-w-[900px]'
    >
      <div className="">
        <div className="">
            <Dialog>
              <DialogTrigger>
                <Button variant={'secondary'}>Create store <PlusIcon className='ml-2' /></Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a new category.</DialogTitle>
                  <DialogDescription>
                    
                    <StoreForm />

                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
      </div>
      <div className="">
        {stores.length > 0 && stores.map((store) => (
          <Button variant={'outline'} key={store.storeId} className="h-32 w-32">
            <Link to={`/dashboard/store/${store.storeId}`}>
              {store.name}
            </Link>
          </Button>
        ))}
      </div>
    </ContentSection>
  )
}

export default Stores;