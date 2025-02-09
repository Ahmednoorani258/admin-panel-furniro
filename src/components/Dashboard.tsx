"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Customer, Order } from "@/types/types";
import { Product } from "@/sanity/queries/fetch";
import { Loader2, Users, ShoppingBag, DollarSign, Package } from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

interface DashboardProps {
  customers: Customer[];
  orders: Order[];
}

const Dashboard = ({ customers, orders }: DashboardProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalInventoryValue, setTotalInventoryValue] = useState(0);
  const [categoryRevenue, setCategoryRevenue] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/products");
        const data: Product[] = await response.json();
        setProducts(data);

        // Calculate total inventory value
        const totalValue = data.reduce((acc, product) => acc + (product.stockLevel || 0) * product.price, 0);
        setTotalInventoryValue(totalValue);

        // Calculate revenue by category
        const revenueByCategory: { [key: string]: number } = {};
        data.forEach((product) => {
          const category = product.category || "Others";
          revenueByCategory[category] = (revenueByCategory[category] || 0) + product.price * (product.stockLevel || 0);
        });
        setCategoryRevenue(revenueByCategory);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const pieData = Object.entries(categoryRevenue).map(([name, value]) => ({ name, value }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      {/* Total Customers */}
      <Card className="shadow-lg bg-white p-6 flex flex-col items-center rounded-xl hover:scale-105 transition-transform">
        <Users className="text-blue-500 w-12 h-12" />
        <CardTitle className="mt-3 text-lg font-semibold">Total Customers</CardTitle>
        <CardContent className="text-4xl font-bold text-blue-600">{customers.length}</CardContent>
      </Card>

      {/* Total Orders */}
      <Card className="shadow-lg bg-white p-6 flex flex-col items-center rounded-xl hover:scale-105 transition-transform">
        <ShoppingBag className="text-green-500 w-12 h-12" />
        <CardTitle className="mt-3 text-lg font-semibold">Total Orders</CardTitle>
        <CardContent className="text-4xl font-bold text-green-600">{orders.length}</CardContent>
      </Card>

      {/* Net Sales */}
      <Card className="shadow-lg bg-white p-6 flex flex-col items-center rounded-xl hover:scale-105 transition-transform">
        <DollarSign className="text-red-500 w-12 h-12" />
        <CardTitle className="mt-3 text-lg font-semibold">Net Sales</CardTitle>
        <CardContent className="text-4xl font-bold text-red-600">
          ${orders.reduce((acc, order) => acc + order.totalAmount, 0).toFixed(2)}
        </CardContent>
      </Card>

      {/* Inventory Value */}
      <Card className="shadow-lg bg-white p-6 flex flex-col items-center rounded-xl hover:scale-105 transition-transform">
        <Package className="text-purple-500 w-12 h-12" />
        <CardTitle className="mt-3 text-lg font-semibold">Total Inventory Value</CardTitle>
        <CardContent className="text-4xl font-bold text-purple-600">
          {loading ? <Loader2 className="animate-spin text-gray-500" size={24} /> : `$${totalInventoryValue.toFixed(2)}`}
        </CardContent>
      </Card>

      {/* Revenue by Category - Pie Chart */}
      <Card className="shadow-lg col-span-1 md:col-span-3 p-8 bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Revenue by Category</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card className="shadow-lg p-8 bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">🔥 Top Products</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="animate-spin text-gray-500" size={24} />
            </div>
          ) : (
            <ul className="space-y-3">
              {products
                .sort((a, b) => b.price - a.price)
                .slice(0, 5)
                .map((product) => (
                  <li
                    key={product._id}
                    className="flex justify-between bg-gray-50 shadow-md p-3 rounded-lg hover:bg-gray-100 transition"
                  >
                    <span className="font-medium">{product.name}</span>
                    <span className="text-gray-600">${product.price.toFixed(2)}</span>
                  </li>
                ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
