import Dashboard from "@/components/Dashboard";
import { query } from "@/sanity/queries/orderQuery";
import { customerQuery } from "@/sanity/queries/getCustomers";
import { Customer, Order } from "@/types/types";
import { client } from "@/sanity/lib/client";

export const revalidate = 5; // Revalidate every 5 seconds (adjust as needed)

export default async function Home() {

  const customers:Customer[] = await client.fetch(customerQuery)
  const orders:Order[] = await client.fetch(query)
  return <div>
    <Dashboard customers={customers} orders={orders}/>
  </div>;
}
