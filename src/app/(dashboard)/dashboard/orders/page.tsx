import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
    {
        name: "John Snow",
        email: "johnsnow@koimail.com",
        status: "completed",
        date: "12-04-23",
        amount: "1300"
    },
]

export default function OrdersPage() {
  return (
    <Card>
      <CardHeader className="px-2 py-7 md:px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store!</CardDescription>

        <CardContent className="h-[75vh] md:h-[80h] overflow-scroll">
            
          <Table className="">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader >
              <TableRow>
                <TableHead className="w-[100px]">Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead >Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {
                    orders.map((order) => (

              <TableRow key={order.name}>
                <TableCell className="font-medium">
                    <p>Name</p>
                    <p className="hidden md:flex text-sm text-muted-foreground">email</p>
                </TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>123123</TableCell>
                <TableCell className="text-right text-green-500">₹250.00</TableCell>
              </TableRow>
                    ))
                }
            </TableBody>
          </Table>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
