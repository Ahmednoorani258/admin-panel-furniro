"use client"

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Order } from "@/types/types";

import { Badge } from "@/components/ui/badge"; // For status styling

interface OrdersProps {
  orders: Order[];
}

const Orders = ({ orders }: OrdersProps) => {
  
 

  return (
    <div className="p-10 w-full">
      <h1 className="text-3xl font-bold text-gray-700">🛒 Order Management</h1>
      <div className="shadow-lg min-h-[500px] h-full rounded-md p-4 mt-4 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>#</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order._id} className="hover:bg-gray-50">
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {order.customer?.name || "N/A"}
                </TableCell>
                <TableCell>
                  {new Date(order.orderDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-semibold text-green-600">
                  ${order.totalAmount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`px-2 py-1 rounded-md text-white ${
                      order.paymentMethod === "online"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {order.paymentMethod.toUpperCase()}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    className={`px-2 py-1 rounded-md text-white ${
                      order.orderStatus === "completed"
                        ? "bg-green-600" // Success
                        : order.orderStatus === "pending"
                          ? "bg-yellow-500" // Warning
                          : order.orderStatus === "cancelled"
                            ? "bg-red-500" // Destructive
                            : "bg-gray-500" // Secondary
                    }`}
                  >
                    {order.orderStatus.toUpperCase()}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Button size="sm" variant="outline" className="mr-2">
                    View
                  </Button>
                  {order.orderStatus !== "completed" &&
                    order.orderStatus !== "cancelled" && (
                      <Button
                        size="sm"
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Cancel
                      </Button>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
