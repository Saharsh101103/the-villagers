import { RecentSales } from "@/components/dashboard/RecentSales";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { businessDetails } from "@/lib/data";
import prisma from "@/lib/db";
import {
  BarChart3,
  IndianRupee,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import React from "react";

// Function to fetch revenue data from the database
async function getRevenueData() {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const result = data.map((item) => ({
    date: new Intl.DateTimeFormat("en-US").format(item.createdAt),
    revenue: item.amount / 100, // Assuming the amount is in cents
  }));

  return result;
}

// Function to fetch overall stats from the database
async function getStats() {
  const totalRevenue = await prisma.order.aggregate({
    _sum: {
      amount: true,
    },
  });

  const totalSales = await prisma.order.count();

  const totalProducts = await prisma.product.count();

  const totalUsers = await prisma.user.count();


  return {
    totalRevenue: totalRevenue._sum.amount! / 100, // Convert from cents to INR
    totalSales,
    totalProducts,
    totalUsers,
  };
}


async function getRecentOrders() {
  // Fetch the 10 most recent orders along with user details (name, email, avatar)
  const recentOrders = await prisma.order.findMany({
    take: 10, // Limit the number of results to 10
    orderBy: {
      createdAt: 'desc', // Order by most recent orders
    },
    include: {
      user: { // Explicitly include the related 'user' data
        select: {
          firstName: true,
          email: true,
          profileImage: true,
        },
      },
    },
  });

  // Map the fetched data to the required format
  const formattedOrders = recentOrders.map(order => ({
    name: order.user?.firstName || "Unknown",  // Handle the case where user might be null
    email: order.user?.email || "No email",  // Handle null user scenario
    amount: (order.amount / 100).toFixed(2), // Assuming amount is in cents, convert to proper currency format
    avatar: order.user?.profileImage || "",  // Fallback in case avatar is missing
  }));

  return formattedOrders;
}

export default async function Dashboard() {
  const stats = await getStats();
  const revenueData = await getRevenueData();
  const recentSales = await getRecentOrders()

  const statItems = [
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toFixed(2)}`,
      description: `Based on ${stats.totalSales} orders`,
      icon: IndianRupee,
      color: "green-500",
    },
    {
      title: "Total Sales",
      value: stats.totalSales.toString(),
      description: `Total Sales on ${businessDetails.name}`,
      icon: ShoppingBag,
      color: "blue-500",
    },
    {
      title: "Total Products",
      value: stats.totalProducts.toString(),
      description: `Current Products`,
      icon: Package,
      color: "indigo-500",
    },
    {
      title: "Total Users",
      value: stats.totalUsers.toString(),
      description: `Total Users Signed-in`,
      icon: Users,
      color: "orange-500",
    },
  ];

  return (
    <div className="flex-1 p-4 sm:px-6 lg:px-8 max-w-xs md:max-w-full">
      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {statItems.map((stat) => (
          <Card className="p-6" key={stat.title}>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                </div>
                <div>
                  <h2 className="text-base font-medium text-primary">{stat.title}</h2>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Revenue Over Time Chart */}
      <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-4 p-6">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium">Revenue Over Time</h3>
              </div>
            </CardTitle>
          </CardHeader>
          {/* Pass data to RevenueChart */}
          <RevenueChart chartData={revenueData} />
        </Card>

        {/* Recent Sales */}
        <Card className="hidden lg:block col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-3 p-6">
          <CardHeader>
            <CardTitle>
              <h3 className="font-medium">Recent Sales</h3>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales recentSales={recentSales} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
