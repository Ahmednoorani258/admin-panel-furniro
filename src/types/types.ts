export interface Product {
  _id: string;
  name: string;
}

export interface OrderProduct {
  quantity: number;
  product: Product;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";
export type PaymentMethod = "cod" | "online";

export interface Order {
  _id: string;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  deliveryAddress: string;
  orderDate: string;
  totalAmount: number;
  products: OrderProduct[];
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  zipCode: string;
  companyName?: string;
  country: string;
  orders: Order[];
}
