import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialProducts, initialUsers } from "../data/mockData";
import type { CartItem, CheckoutPayload, Order, OrderStatus, Product, SignupPayload, User } from "../types";

interface AppContextValue {
  products: Product[];
  cart: CartItem[];
  users: User[];
  orders: Order[];
  currentUser: User | null;
  addToCart: (productId: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  placeOrder: (payload: CheckoutPayload) => { ok: boolean; orderNumber?: string; message?: string };
  findOrderByNumber: (orderNumber: string) => Order | undefined;
  login: (email: string, password: string) => { ok: boolean; message?: string };
  signup: (payload: SignupPayload) => { ok: boolean; message?: string };
  logout: () => void;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Omit<Product, "id">) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const storageKeys = {
  products: "abeiku_products",
  cart: "abeiku_cart",
  users: "abeiku_users",
  orders: "abeiku_orders",
  currentUser: "abeiku_current_user",
};

const parseStored = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

const calculateDeliveryFee = (option: CheckoutPayload["deliveryOption"], address: string) => {
  if (option === "Pickup") return 0;
  const normalized = address.toLowerCase();
  if (normalized.includes("accra") || normalized.includes("tema")) return 15;
  if (normalized.includes("kumasi") || normalized.includes("takoradi")) return 25;
  return 35;
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => parseStored(storageKeys.products, initialProducts));
  const [cart, setCart] = useState<CartItem[]>(() => parseStored(storageKeys.cart, []));
  const [users, setUsers] = useState<User[]>(() => parseStored(storageKeys.users, initialUsers));
  const [orders, setOrders] = useState<Order[]>(() => parseStored(storageKeys.orders, []));
  const [currentUser, setCurrentUser] = useState<User | null>(() => parseStored(storageKeys.currentUser, null));

  useEffect(() => localStorage.setItem(storageKeys.products, JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem(storageKeys.cart, JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem(storageKeys.users, JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem(storageKeys.orders, JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem(storageKeys.currentUser, JSON.stringify(currentUser)), [currentUser]);

  const addToCart = (productId: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: Math.max(1, item.quantity + quantity) } : item
        );
      }
      return [...prev, { productId, quantity: Math.max(1, quantity) }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) => prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)));
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => setCart([]);

  const login = (email: string, password: string) => {
    const found = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
    if (!found) return { ok: false, message: "Invalid email or password." };
    if (found.role === "admin") {
      return { ok: false, message: "Admin login is disabled on the public demo. Use the backend admin API instead." };
    }
    if (password.trim().length < 6) return { ok: false, message: "Invalid email or password." };
    setCurrentUser(found);
    return { ok: true };
  };

  const signup = (payload: SignupPayload) => {
    const exists = users.some((user) => user.email.toLowerCase() === payload.email.toLowerCase());
    if (exists) return { ok: false, message: "An account with this email already exists." };
    if (payload.password.trim().length < 6) {
      return { ok: false, message: "Password must be at least 6 characters." };
    }
    const newUser: User = {
      id: `u-${Date.now()}`,
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      role: "customer",
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { ok: true };
  };

  const logout = () => setCurrentUser(null);

  const placeOrder = (payload: CheckoutPayload) => {
    if (!currentUser) return { ok: false, message: "Please log in to place an order." };
    if (cart.length === 0) return { ok: false, message: "Your cart is empty." };

    const detailedItems = cart
      .map((item) => {
        const product = products.find((entry) => entry.id === item.productId);
        if (!product) return null;
        return {
          productId: product.id,
          productName: product.name,
          unitPrice: product.price,
          quantity: item.quantity,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item));

    const hasLowStock = detailedItems.some((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return !product || product.stock < item.quantity;
    });
    if (hasLowStock) {
      return { ok: false, message: "One or more products have insufficient stock." };
    }

    const subtotal = detailedItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const deliveryFee = calculateDeliveryFee(payload.deliveryOption, payload.deliveryAddress);
    const total = subtotal + deliveryFee;
    const orderNumber = `ABF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `o-${Date.now()}`,
      orderNumber,
      customerId: currentUser.id,
      customerName: payload.fullName,
      customerPhone: payload.phone,
      deliveryAddress: payload.deliveryAddress,
      gpsLocation: payload.gpsLocation,
      deliveryOption: payload.deliveryOption,
      paymentMethod: payload.paymentMethod,
      items: detailedItems,
      subtotal,
      deliveryFee,
      total,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setProducts((prev) =>
      prev.map((product) => {
        const ordered = detailedItems.find((item) => item.productId === product.id);
        if (!ordered) return product;
        return { ...product, stock: Math.max(0, product.stock - ordered.quantity) };
      })
    );
    clearCart();
    return { ok: true, orderNumber };
  };

  const findOrderByNumber = (orderNumber: string) =>
    orders.find((order) => order.orderNumber.toLowerCase() === orderNumber.toLowerCase());

  const addProduct = (product: Omit<Product, "id">) => {
    setProducts((prev) => [{ ...product, id: `p-${Date.now()}` }, ...prev]);
  };

  const updateProduct = (id: string, product: Omit<Product, "id">) => {
    setProducts((prev) => prev.map((item) => (item.id === id ? { ...product, id } : item)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setCart((prev) => prev.filter((item) => item.productId !== id));
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)));
  };

  const value = useMemo(
    () => ({
      products,
      cart,
      users,
      orders,
      currentUser,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      placeOrder,
      findOrderByNumber,
      login,
      signup,
      logout,
      addProduct,
      updateProduct,
      deleteProduct,
      updateOrderStatus,
    }),
    [products, cart, users, orders, currentUser]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used inside AppProvider");
  return context;
}
