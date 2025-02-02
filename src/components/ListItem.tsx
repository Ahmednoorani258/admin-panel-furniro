"use client"
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import { Button } from "./ui/button";
import {furnitureItems} from '../utils/data'




  const handleDelete = () => {
    alert("Item Deleted");
  }

const ListItem = () => {
  return (
    <div className="p-10 w-full  ">
      <h1 className="text-xl text-gray-400">All Items</h1>
      <Table className="w-full mt-5">
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {furnitureItems.map((item,index)=>(
                <TableRow key={index}>
                    <TableCell>
                        <Image src={item.image} alt={item.name} width={20} height={20} className="h-16 w-16 object-cover rounded-md"/>
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell onClick={handleDelete} className=" cursor-pointer flex flex-col gap-2">
                        <Button className="text-white bg-blue-500 h-6 w-20 rounded-none border hover:bg-blue-400">Edit</Button>
                        <Button className="text-white bg-red-500 h-6 w-20 rounded-none border hover:bg-red-400">Delete</Button>
                    </TableCell>
                </TableRow>
            ))}
          
        </TableBody>
      </Table>
    </div>
  );
};

export default ListItem;
