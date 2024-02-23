import { CartProduct, useCart } from "@/checkout/cart-provider";
import { Button } from "@/components/ui/button"
import { TProduct } from "@/lib/types/types";
import { serverUrl } from "@/lib/utils"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom"

const ProductCard = ({ product }: { product: TProduct } ) => {
  const { getItemQuantity, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  
  const quantity = getItemQuantity(product.productId)
  return (
    <div className="border flex flex-col justify-between rounded-md overflow-hidden text-left">
      <Link to={`/products/${product.productId}`} className="">
        <div className="w-full h-56">
          <img src={`${serverUrl}/files/${product.imageUrls[1]}`} className="w-full h-full object-cover" alt="" />
        </div>
      </Link>
      <div className="">
        <Link to={`/products/${product.productId}`} className="p-4 flex flex-col justify-self-end">
          <p className="text-muted-foreground capitalize">{product.category}</p>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground">{`KSH ${product.price}`}</p>
        </Link>
        <div className="mx-4 mb-4 justify-self-end">
          {quantity > 0 ?
          <div className="flex items-center gap-2">
            <Button variant={'outline'} size={'icon'} className="" onClick={() => decreaseQuantity(product.productId)}><MinusIcon /></Button>
              <div className="">{quantity}</div>
              <Button variant={'outline'} size={'icon'} className="" onClick={() => increaseQuantity(product.productId)}><PlusIcon /></Button>
          </div>
          : <Button size={'sm'} onClick={() => addToCart(product as CartProduct)} className="w-full">Add to cart</Button>}
        </div>
      </div>
    </div>
  )
}

export default ProductCard