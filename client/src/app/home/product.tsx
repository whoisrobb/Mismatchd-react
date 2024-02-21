import { Button } from "@/components/ui/button";
import ContentSection from "@/layouts/content-section"
import { getSingleProduct } from "@/lib/server-functions/dashboard";
import { TProduct } from "@/lib/types/types";
import { serverUrl } from "@/lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const Product = () => {
    const { productId } = useParams();
    const [productData, setProductData] = useState<TProduct | null>(null);

    useEffect(() => {
        getCategories();
    }, []);
    
    const getCategories = async () => {
        const data = await getSingleProduct(productId as string);
        setProductData(data);
    }

    const ratingElements = Array.from({ length: productData?.ratings as number }, (_, index) => (
        <StarFilledIcon key={index} />
    ));
  return (
    productData &&
    <ContentSection
        title={productData.name}
        subtitle={productData.category}
    >
        <div className="lg:flex md:flex gap-12">
            <div className="max-w-2xl w-full lg:m-0 mb-8">
                <img src={`${serverUrl}/files/${productData.imageUrls[0]}`} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-full flex flex-col gap-6">
                <div className="">
                    <h1 className="text-5xl font-bold">{productData.name}</h1>
                    <p className="text-muted-foreground text-lg">{productData.subCategory}</p>
                </div>
                <div className="">
                    <p className="text-lg text-muted-foreground">{productData.description}</p>
                </div>
                <div className="">
                    <h1 className="text-xl font-bold">{`KSH ${productData.price}`}</h1>
                    <div className="text-yellow-400 flex items-center gap-1">
                        {ratingElements}
                    </div>
                    <div className="text-muted-foreground">
                        {productData.inventory > 0
                        ? <p>(in stock)</p>
                        : <p>(out of stock)</p>}
                    </div>
                </div>
                <div className="">
                    <Button className="w-full">Add to cart</Button>
                </div>
            </div>
        </div>
    </ContentSection>
  )
}

export default Product