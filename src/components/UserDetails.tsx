"use client";

import React, { useState } from "react";
import type { Customer } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface UserDetailsProps {
  customers: Customer[];
}

const UserDetails: React.FC<UserDetailsProps> = ({ customers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterMinPurchase, setFilterMinPurchase] = useState<number | null>(null);
  const [filterMaxPurchase, setFilterMaxPurchase] = useState<number | null>(null);

  // Calculate total purchases
  const calculateTotalPurchases = (orders: Customer["orders"]) =>
    orders.reduce((total, order) => total + order.totalAmount, 0);

  // Filtering Logic
  const filteredCustomers = customers.filter((customer) => {
    const totalPurchases = calculateTotalPurchases(customer.orders);
    
    return (
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCity ? customer.city.toLowerCase().includes(filterCity.toLowerCase()) : true) &&
      (filterMinPurchase !== null ? totalPurchases >= filterMinPurchase : true) &&
      (filterMaxPurchase !== null ? totalPurchases <= filterMaxPurchase : true)
    );
  });

  return (
    <div className="p-10 w-full">
      <h1 className="text-2xl text-gray-400">All Users</h1>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search Name..."
          className="p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by City..."
          className="p-2 border rounded"
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Purchase (Rs.)"
          className="p-2 border rounded"
          value={filterMinPurchase || ""}
          onChange={(e) => setFilterMinPurchase(e.target.value ? Number(e.target.value) : null)}
        />
        <input
          type="number"
          placeholder="Max Purchase (Rs.)"
          className="p-2 border rounded"
          value={filterMaxPurchase || ""}
          onChange={(e) => setFilterMaxPurchase(e.target.value ? Number(e.target.value) : null)}
        />
      </div>

      <div className="shadow-[0_0_10px_3px_rgba(240,215,134,0.5)]">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Total Purchases</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer, index) => {
              const totalPurchases = calculateTotalPurchases(customer.orders);
              return (
                <TableRow key={customer._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell>
                    {customer.address}, {customer.city}, {customer.zipCode}
                  </TableCell>
                  <TableCell>Rs. {totalPurchases.toLocaleString()}</TableCell>
                  <TableCell>
                    <button className="text-blue-500 hover:underline">
                      View
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserDetails;
