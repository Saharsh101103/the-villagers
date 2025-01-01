"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
// import { redis } from "./lib/redis";
import { revalidatePath } from "next/cache";
import { businessDetails } from "@/lib/data";
import { bannerSchema, productSchema } from "@/lib/zodSchemas";
import prisma from "@/lib/db";
// import { Cart } from "./lib/interfaces";

// import Stripe from "stripe";
// import { stripe } from "@/lib/stripe";

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== businessDetails.adminEmail) {
    return redirect("/shop");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const variants = submission.value.variants.map((variant) => ({
    color: variant.color,
    size: variant.size,
    stock: variant.stock,
  }));
try {
  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
      variants: {
        create: variants, // This is the correct format for nested creation
      },
    },
  });

} catch (error) {
  console.error(error)
}

  redirect("/dashboard/products");
}

export async function editProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== businessDetails.adminEmail) {
    return redirect("/shop");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const productId = formData.get("productId") as string;
  try {
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: submission.value.name,
        description: submission.value.description,
        category: submission.value.category,
        price: submission.value.price,
        isFeatured: submission.value.isFeatured === true ? true : false,
        status: submission.value.status,
        images: flattenUrls,
      },
    });
  } catch (error) {
    console.log(error)
  }
  

  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== businessDetails.adminEmail) {
    return redirect("/shop");
  }

  await prisma.product.delete({
    where: {
      id: formData.get("productId") as string,
    },
  });

  redirect("/dashboard/products");
}

export async function createBanner(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== businessDetails.adminEmail) {
    return redirect("/shop");
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect("/dashboard/banner");
}

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== businessDetails.adminEmail) {
    return redirect("/shop");
  }

  await prisma.banner.delete({
    where: {
      id: formData.get("bannerId") as string,
    },
  });

  redirect("/dashboard/banner");
}

// export async function addItem(productId: string) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     return redirect("/shop");
//   }

//   let cart: Cart | null = await redis.get(`cart-${user.id}`);

//   const selectedProduct = await prisma.product.findUnique({
//     select: {
//       id: true,
//       name: true,
//       price: true,
//       images: true,
//     },
//     where: {
//       id: productId,
//     },
//   });

//   if (!selectedProduct) {
//     throw new Error("No product with this id");
//   }
//   let myCart = {} as Cart;

//   if (!cart || !cart.items) {
//     myCart = {
//       userId: user.id,
//       items: [
//         {
//           price: selectedProduct.price,
//           id: selectedProduct.id,
//           imageString: selectedProduct.images[0],
//           name: selectedProduct.name,
//           quantity: 1,
//         },
//       ],
//     };
//   } else {
//     let itemFound = false;

//     myCart.items = cart.items.map((item) => {
//       if (item.id === productId) {
//         itemFound = true;
//         item.quantity += 1;
//       }

//       return item;
//     });

//     if (!itemFound) {
//       myCart.items.push({
//         id: selectedProduct.id,
//         imageString: selectedProduct.images[0],
//         name: selectedProduct.name,
//         price: selectedProduct.price,
//         quantity: 1,
//       });
//     }
//   }

//   await redis.set(`cart-${user.id}`, myCart);

//   revalidatePath("/shop", "layout");
// }



// export async function removeItem(productId: string) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     return redirect("/shop");
//   }

//   // Retrieve the cart from Redis
//   let cart: Cart | null = await redis.get(`cart-${user.id}`);

//   if (!cart || !cart.items || cart.items.length === 0) {
//     throw new Error("No items in the cart");
//   }

//   // Find the index of the product in the cart
//   const itemIndex = cart.items.findIndex((item) => item.id === productId);

//   if (itemIndex === -1) {
//     throw new Error("Product not found in the cart");
//   }

//   // Decrease the quantity of the item
//   const item = cart.items[itemIndex];
//   if (item.quantity > 1) {
//     item.quantity -= 1; // Decrement the quantity
//   } else {
//     // If quantity is 1, remove the item from the cart
//     cart.items.splice(itemIndex, 1);
//   }

//   // Save the updated cart back to Redis
//   await redis.set(`cart-${user.id}`, cart);

//   // Revalidate the path to ensure the UI reflects the changes
//   revalidatePath("/shop", "layout");
// }


// export async function delItem(formData: FormData) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     return redirect("/shop");
//   }

//   const productId = formData.get("productId");

//   let cart: Cart | null = await redis.get(`cart-${user.id}`);

//   if (cart && cart.items) {
//     const updateCart: Cart = {
//       userId: user.id,
//       items: cart.items.filter((item) => item.id !== productId),
//     };

//     await redis.set(`cart-${user.id}`, updateCart);
//   }

//   revalidatePath("/shop/bag");
// }

// export async function checkOutWithStripe() {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     return redirect("/shop");
//   }

//   let cart: Cart | null = await redis.get(`cart-${user.id}`);

//   if (cart && cart.items) {
//     const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
//       cart.items.map((item) => ({
//         price_data: {
//           currency: "inr",
//           unit_amount: item.price * 100,
//           product_data: {
//             name: item.name,
//             images: [item.imageString],
//           },
//         },
//         quantity: item.quantity,
//       }));

//     const session = await stripe.checkout.sessions.create({
//       mode: "payment",
//       line_items: lineItems,
//       success_url:
//         process.env.NODE_ENV === "development"
//           ? "http://localhost:3000/shop/payment/success"
//           : "https://deployment-url/shop/payment/success",
//       cancel_url:
//         process.env.NODE_ENV === "development"
//           ? "http://localhost:3000/shop/payment/cancel"
//           : "https://deployment-url/shop/payment/cancel",
//       metadata: {
//         userId: user.id,
//       },
//     });

//     return redirect(session.url as string);
//   }
// }