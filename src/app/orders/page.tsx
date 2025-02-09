import Orders from '@/components/Orders'
import React from 'react'
import { query } from '@/sanity/queries/orderQuery'
import { client } from '@/sanity/lib/client'
import { Order } from '@/types/types'

export const revalidate = 5; // Revalidate every 5 seconds (adjust as needed)
const OrdersPage = async() => {
  const orders:Order[] = await client.fetch(query)
  return (
    <>
      <Orders orders={orders}/>
    </>
  )
}

export default OrdersPage