"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    // SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "./cart-provider";
import { serverUrl } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
  
const CartSheet = () => {
    const { cartQuantity, cartItems, increaseQuantity, decreaseQuantity } = useCart();
  return (
    <Sheet>
        <SheetTrigger>
            <Button size={'icon'} className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                {cartQuantity > 0 && <span className="absolute rounded-full bg-red-600 h-5 w-5 bottom-[-.5rem] right-[-.5rem] text-sm text-[#fff] flex items-center justify-center">{JSON.stringify(cartQuantity)}</span>}
            </Button>
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
            <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
                <SheetDescription>
                    {cartItems && cartItems.length > 0 ?
                    cartItems.map((item) => (
                        <div className="grid grid-cols-5 gap-2 border-b py-2 items-start" key={item.productId}>
                            <div className="">
                                <img src={`${serverUrl}/files/${item.imageUrls[0]}`} alt="" />
                            </div>
                            <p className="">{item.name}</p>
                            <p className="">{`KSH ${item.price}`}</p>
                            <div className="flex items-center gap-2">
                                <Button variant={'outline'} size={'icon'} className="" onClick={() => decreaseQuantity(item.productId)}><MinusIcon /></Button>
                                <div className="">{item.quantity}</div>
                                <Button variant={'outline'} size={'icon'} className="" onClick={() => increaseQuantity(item.productId)}><PlusIcon /></Button>
                            </div>
                            <p className="">{`KSH ${item.quantity * item.price}`}</p>
                        </div>))
                    : <div className=""></div>}
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
  )
}

export default CartSheet;