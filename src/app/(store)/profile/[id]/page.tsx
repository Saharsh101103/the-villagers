import { ProfilePage } from "@/components/profile/profile-page";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";



export default async function Page({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    });

    const orders = await prisma.order.findMany({
      where: {
        userId: params.id,
      },
    });
    const reviews = await prisma.review.findMany({
      where: {
        userId: params.id,
      },
    });
    const addresses = await prisma.address.findMany({
      where: {
        userId: params.id,
      },
    });

    if(!user || !orders || !reviews || !addresses) {
      redirect('/');
    }

    const User = {
      ...user,
      orders,
      reviews,
      addresses,
    };

  return <ProfilePage user={User}/>;
}