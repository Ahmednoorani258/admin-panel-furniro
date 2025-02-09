"use client";

import React, { useState, useMemo } from "react";
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
  const [filterMinPurchase, setFilterMinPurchase] = useState<number | null>(
    null
  );
  const [filterMaxPurchase, setFilterMaxPurchase] = useState<number | null>(
    null
  );

  // Calculate total purchases
  const calculateTotalPurchases = (orders: Customer["orders"]) =>
    orders.reduce((total, order) => total + order.totalAmount, 0);

  // Optimized filtering using useMemo
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const totalPurchases = calculateTotalPurchases(customer.orders);

      return (
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!filterCity ||
          customer.city.toLowerCase().includes(filterCity.toLowerCase())) &&
        (filterMinPurchase === null || totalPurchases >= filterMinPurchase) &&
        (filterMaxPurchase === null || totalPurchases <= filterMaxPurchase)
      );
    });
  }, [customers, searchTerm, filterCity, filterMinPurchase, filterMaxPurchase]);

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl text-gray-500 font-semibold mb-4">All Users</h1>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row md:space-x-4 gap-2 mb-4">
        <input
          type="text"
          placeholder="Search Name..."
          className="p-2 border rounded-md shadow-sm focus:ring focus:ring-yellow-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by City..."
          className="p-2 border rounded-md shadow-sm focus:ring focus:ring-yellow-600"
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Purchase (Rs.)"
          className="p-2 border rounded-md shadow-sm focus:ring focus:ring-yellow-600"
          value={filterMinPurchase || ""}
          onChange={(e) =>
            setFilterMinPurchase(e.target.value ? Number(e.target.value) : null)
          }
        />
        <input
          type="number"
          placeholder="Max Purchase (Rs.)"
          className="p-2 border rounded-md shadow-sm focus:ring focus:ring-yellow-600"
          value={filterMaxPurchase || ""}
          onChange={(e) =>
            setFilterMaxPurchase(e.target.value ? Number(e.target.value) : null)
          }
        />
      </div>

      {/* Table Section */}
      <div className="shadow-md border rounded-lg overflow-hidden">
        <Table className="w-full bg-white">
          <TableHeader className="bg-gray-200">
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
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer, index) => {
                const totalPurchases = calculateTotalPurchases(customer.orders);
                return (
                  <TableRow key={customer._id} className="hover:bg-gray-100">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-semibold">
                      {customer.name}
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phoneNumber}</TableCell>
                    <TableCell>
                      {customer.address}, {customer.city}, {customer.zipCode}
                    </TableCell>
                    <TableCell className="font-semibold">
                      Rs. {totalPurchases.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <button className="px-3 py-1 text-blue-600 hover:underline font-medium">
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-4 text-gray-500"
                >
                  No matching users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserDetails;
