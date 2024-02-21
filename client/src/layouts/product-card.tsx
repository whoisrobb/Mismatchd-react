import { Button } from "@/components/ui/button"
import { serverUrl } from "@/lib/utils"
import { Link } from "react-router-dom"

type ProductCardProps = {
  image: string;
  name: string;
  price: number;
  productId: string;
  category: string;
}

const ProductCard = ({ image, name, price, productId, category }: ProductCardProps) => {
  return (
    <div className="border flex flex-col justify-between rounded-md overflow-hidden text-left">
      <Link to={`/products/${productId}`} className="">
        <div className="w-full h-56">
          <img src={`${serverUrl}/files/${image}`} className="w-full h-full object-cover" alt="" />
        </div>
      </Link>
      <div className="">
        <Link to={`/products/${productId}`} className="p-4 flex flex-col justify-self-end">
          <p className="text-muted-foreground capitalize">{category}</p>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-muted-foreground">{`KSH ${price}`}</p>
        </Link>
        <div className="mx-4 mb-4 justify-self-end">
          <Button size={'sm'} className="w-full">Add to cart</Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard