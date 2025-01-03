"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Plus, Minus, X, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import { Cart as CartType } from "@/lib/interfaces";
import { dummyCartData, dummyUserData } from "@/lib/dummyData";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/animated-modal";
import { IconShoppingCartBolt } from "@tabler/icons-react";
import { ScrollArea } from "./ui/scroll-area";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartType["items"]>(
    dummyCartData.items
  );
  const [userData] = useState(dummyUserData);
  const [cartSubtotal, setSubtotal] = useState<number>(0);
  const [cartTax, setTax] = useState<number>(0);
  const [cartShipping, setShipping] = useState<number>(0);
  const [cartTotal, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cartItems) {
      const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const tax = subtotal * 0.1; // Assuming 10% tax
      const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
      const total = subtotal + tax + shipping;

      setSubtotal(subtotal);
      setTax(tax);
      setShipping(shipping);
      setTotal(total);
    }
  }, [cartItems]);

  const handleIncreaseQuantity = async (productId: string) => {
    setIsLoading(true);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecreaseQuantity = async (productId: string) => {
    setIsLoading(true);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCartItems((prevItems) =>
        prevItems
          .map((item) =>
            item.id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    setIsLoading(true);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckoutWithStripe = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Checking out with Stripe");
      // Here you would typically redirect to Stripe checkout or handle the process
    } catch (error) {
      console.error("Error checking out with Stripe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-4 w-4" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg ">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            {cartItems.length > 0
              ? `You have ${cartItems.length} item(s) in your cart.`
              : "Your cart is empty."}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 space-y-4 mx-auto ">
          <ScrollArea className="max-h-[50vh] px-2 overflow-y-scroll">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="my-2 mx-auto max-w-xs sm:max-w-none"
                >
                  <Card>
                    <CardContent className="p-4 flex items-center space-x-4">
                      <Image
                        src={item.imageString}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDecreaseQuantity(item.id)}
                          disabled={isLoading}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleIncreaseQuantity(item.id)}
                          disabled={isLoading}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={isLoading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        </div>
        {cartItems.length > 0 && (
          <div className="mt-8">
            <Separator className="my-4" />
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${cartTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {cartShipping === 0 ? "Free" : `$${cartShipping.toFixed(2)}`}
                </span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-8">
              <Separator className="my-4" />
              <Modal>
                <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn cursor-pointer">
                  <span className="group-hover/modal-btn:translate-x-96 text-center transition duration-500">
                    Checkout
                  </span>
                  <div className="-translate-x-96 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                    <IconShoppingCartBolt size={24} color="blue" />
                  </div>
                </ModalTrigger>
                <ModalBody>
                  <ModalContent>
                    <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                      Checkout using:
                    </h4>
                    <div className="flex flex-col gap-4 justify-center items-center w-fit mx-auto">
                      {userData && (
                        <Link
                          href={`/razorpay?name=${
                            userData.given_name
                          }&amount=${cartTotal}&auth=${""}`}
                          className="w-full"
                        >
                          <Button
                            className="w-full"
                            variant={"default"}
                            size={"lg"}
                          >
                            <CheckCircle2 className="w-6 h-6 mr-2" />
                            <p>Razorpay</p>
                          </Button>
                        </Link>
                      )}
                      <Button className="" variant={"default"} size={"lg"}>
                        <CheckCircle2 className="w-6 h-6 mr-2" />
                        <p>Cash on Delivery</p>
                      </Button>
                    </div>
                  </ModalContent>
                  <ModalFooter className="">
                    <p>Select your payment method</p>
                  </ModalFooter>
                </ModalBody>
              </Modal>
            </div>
          </div>
        )}
        {cartItems.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-xl font-semibold mb-2">Your cart is empty</p>
            <p className="text-muted-foreground mb-4">
              Add items to your cart to see them here.
            </p>
            <SheetClose asChild>
              <Button asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
