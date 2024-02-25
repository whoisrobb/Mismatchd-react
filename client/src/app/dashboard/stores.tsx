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
import StoreCard from "@/layouts/store-card";

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
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {stores.length > 0 && stores.map((store) => (
          <Link to={`/dashboard/store/${store.storeId}`}>
            <StoreCard name={store.name} description={store.description} />
          </Link>
        ))}
      </div>
    </ContentSection>
  )
}

export default Stores;