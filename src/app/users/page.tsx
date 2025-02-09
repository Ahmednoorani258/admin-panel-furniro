import UserDetails from "@/components/UserDetails";
import React from "react";
import { customerQuery } from "@/sanity/queries/getCustomers";
import { Customer } from "@/types/types";
import { client } from "@/sanity/lib/client";

export const revalidate = 5; // Revalidate every 5 seconds (adjust as needed)

const Page = async () => {
  const customers: Customer[] = await client.fetch(customerQuery);

  return (
    <>
      <UserDetails customers={customers} />
    </>
  );
};

export default Page;
