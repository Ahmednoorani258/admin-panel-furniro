import UserDetails from '@/components/UserDetails'
import React from 'react'
import { customerQuery } from '@/sanity/queries/getCustomers'
import { Customer } from '@/types/types'
import { client } from '@/sanity/lib/client'


const page =async () => {
  const customers:Customer[] =await client.fetch(customerQuery) 
  return (
    <>
    <UserDetails customers={customers}/>
    </>
  )
}

export default page