export type Category =
  | "Vegetables"
  | "Fruits"
  | "Tubers"
  | "Grains"
  | "Poultry"
  | "Livestock";

export interface Product {
  id: string;
  name: string;
  category: Category;
  productType: string;
  price: number;
  stock: number;
  unit: string;
  image: string;
  description: string;
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export type OrderStatus = "Pending" | "Processing" | "Out for delivery" | "Delivered";

export type DeliveryOption = "Delivery" | "Pickup";

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  gpsLocation: string;
  deliveryOption: DeliveryOption;
  paymentMethod: "MTN Mobile Money" | "Telecel Cash" | "AirtelTigo Money" | "Card payment";
  items: Array<{
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "admin" | "customer";
}

export interface CheckoutPayload {
  fullName: string;
  phone: string;
  deliveryAddress: string;
  gpsLocation: string;
  deliveryOption: DeliveryOption;
  paymentMethod: Order["paymentMethod"];
}