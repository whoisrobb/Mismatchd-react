import ContentSection from "@/layouts/content-section";
import { getSingleStore } from "@/lib/server-functions/dashboard";
import { TStore } from "@/lib/types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const store = () => {
    const params = useParams();
    const [store, setStore] = useState<TStore | null>(null);

    useEffect(() => {
        fetchStore()
    }, [])
    
  const fetchStore = async () => {
    const data = await getSingleStore(params.storeId as string);
    setStore(data);
  };
  return (
    store && 
    <ContentSection
        title={`${store.name}`}
        subtitle='Manage your store products.'
        className='max-w-[900px]'
    >
        {JSON.stringify(params)}
    </ContentSection>
  )
}

export default store