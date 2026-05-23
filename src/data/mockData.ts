import type { Product, User } from "../types";

export const categories = ["Vegetables", "Fruits", "Tubers", "Grains", "Poultry", "Livestock"] as const;

export const categoryFoodTypes: Record<(typeof categories)[number], string[]> = {
  Vegetables: ["Tomatoes", "Onions", "Pepper", "Cabbage", "Garden Eggs", "Carrots", "Cucumber", "Lettuce"],
  Fruits: ["Pineapple", "Mango", "Banana", "Orange", "Watermelon", "Papaya", "Avocado", "Apple"],
  Tubers: ["Yam", "Cassava", "Potato", "Sweet Potato", "Cocoyam"],
  Grains: ["Maize", "Rice", "Millet", "Sorghum", "Soybean", "Groundnut", "Beans"],
  Poultry: ["Broiler Chicken", "Layer Chicken", "Turkey", "Duck", "Guinea Fowl", "Eggs"],
  Livestock: ["Goat", "Sheep", "Cattle", "Pig", "Rabbit"],
};

export const initialProducts: Product[] = [
  {
    id: "p1",
    name: "Organic Tomatoes",
    category: "Vegetables",
    productType: "Tomatoes",
    price: 32,
    stock: 120,
    unit: "crate",
    image:
      "https://images.unsplash.com/photo-1546470427-e26264be0b0d?auto=format&fit=crop&w=1200&q=80",
    description: "Sun-ripened tomatoes harvested from trusted partner farms around the Eastern Region.",
    featured: true,
  },
  {
    id: "p2",
    name: "Fresh Red Onions",
    category: "Vegetables",
    productType: "Onions",
    price: 26,
    stock: 100,
    unit: "bag",
    image:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=1200&q=80",
    description: "Well-dried onions with strong flavor profile and long storage quality.",
    featured: true,
  },
  {
    id: "p3",
    name: "Green Bell Pepper",
    category: "Vegetables",
    productType: "Pepper",
    price: 20,
    stock: 75,
    unit: "basket",
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=1200&q=80",
    description: "Crunchy green peppers ideal for stews, salads, and stir-fry meals.",
    featured: true,
  },
  {
    id: "p4",
    name: "Fresh Pineapple",
    category: "Fruits",
    productType: "Pineapple",
    price: 15,
    stock: 90,
    unit: "piece",
    image:
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=1200&q=80",
    description: "Naturally sweet pineapples with excellent shelf life and rich tropical taste.",
    featured: true,
  },
  {
    id: "p5",
    name: "Kent Mango",
    category: "Fruits",
    productType: "Mango",
    price: 18,
    stock: 84,
    unit: "basket",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1200&q=80",
    description: "Juicy mangoes with premium sweetness and careful post-harvest handling.",
  },
  {
    id: "p6",
    name: "Sweet Banana",
    category: "Fruits",
    productType: "Banana",
    price: 12,
    stock: 142,
    unit: "bunch",
    image:
      "https://images.unsplash.com/photo-1574226516831-e1dff420e8f8?auto=format&fit=crop&w=1200&q=80",
    description: "Nutritious fresh bananas supplied daily from selected farms.",
  },
  {
    id: "p7",
    name: "Yam Tubers",
    category: "Tubers",
    productType: "Yam",
    price: 58,
    stock: 65,
    unit: "bag",
    image: "/images/yam-tubers.jpg",
    description: "Premium yam harvested in-season and sorted for consistency and quality.",
    featured: true,
  },
  {
    id: "p8",
    name: "Fresh Cassava",
    category: "Tubers",
    productType: "Cassava",
    price: 34,
    stock: 70,
    unit: "bundle",
    image: "/images/cassava-roots.jpg",
    description: "Firm cassava roots for fufu, gari processing, and home cooking.",
  },
  {
    id: "p9",
    name: "Sweet Potato",
    category: "Tubers",
    productType: "Sweet Potato",
    price: 40,
    stock: 56,
    unit: "bag",
    image:
      "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?auto=format&fit=crop&w=1200&q=80",
    description: "Orange-flesh sweet potatoes ideal for healthy meals and roasting.",
  },
  {
    id: "p19",
    name: "Irish Potato",
    category: "Tubers",
    productType: "Potato",
    price: 52,
    stock: 41,
    unit: "bag",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80",
    description: "Clean, medium-sized potatoes suitable for boiling, frying, and restaurant supply.",
  },
  {
    id: "p20",
    name: "Fresh Cocoyam",
    category: "Tubers",
    productType: "Cocoyam",
    price: 46,
    stock: 36,
    unit: "bag",
    image: "/images/cocoyam-original.jpg",
    description: "Nutritious cocoyam harvested fresh for soups and traditional dishes.",
  },
  {
    id: "p10",
    name: "White Maize",
    category: "Grains",
    productType: "Maize",
    price: 140,
    stock: 44,
    unit: "sack",
    image:
      "https://images.unsplash.com/photo-1597549276877-7250f0f7f4e9?auto=format&fit=crop&w=1200&q=80",
    description: "High-grade maize suitable for household use, processing, and feed production.",
  },
  {
    id: "p11",
    name: "Perfumed Rice",
    category: "Grains",
    productType: "Rice",
    price: 220,
    stock: 38,
    unit: "sack",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31b?auto=format&fit=crop&w=1200&q=80",
    description: "Clean and aromatic rice suitable for homes, events, and restaurants.",
  },
  {
    id: "p12",
    name: "Brown Beans",
    category: "Grains",
    productType: "Beans",
    price: 180,
    stock: 47,
    unit: "sack",
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e1?auto=format&fit=crop&w=1200&q=80",
    description: "Protein-rich beans with low moisture and strong cooking quality.",
  },
  {
    id: "p13",
    name: "Broiler Chicken",
    category: "Poultry",
    productType: "Broiler Chicken",
    price: 48,
    stock: 33,
    unit: "bird",
    image:
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=1200&q=80",
    description: "Farm-raised broiler chicken prepared and chilled under strict hygiene conditions.",
  },
  {
    id: "p14",
    name: "Farm Fresh Eggs",
    category: "Poultry",
    productType: "Eggs",
    price: 42,
    stock: 200,
    unit: "crate",
    image:
      "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=1200&q=80",
    description: "Clean medium and large eggs sorted and packed for retail and wholesale.",
  },
  {
    id: "p15",
    name: "Turkey Whole Bird",
    category: "Poultry",
    productType: "Turkey",
    price: 160,
    stock: 24,
    unit: "bird",
    image:
      "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?auto=format&fit=crop&w=1200&q=80",
    description: "Healthy turkey birds ideal for events, restaurants, and family gatherings.",
  },
  {
    id: "p16",
    name: "Goat Meat (Live Weight)",
    category: "Livestock",
    productType: "Goat",
    price: 620,
    stock: 18,
    unit: "animal",
    image:
      "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?auto=format&fit=crop&w=1200&q=80",
    description: "Healthy, well-fed livestock from certified partner farms with optional processing.",
  },
  {
    id: "p17",
    name: "Sheep (Live Weight)",
    category: "Livestock",
    productType: "Sheep",
    price: 780,
    stock: 12,
    unit: "animal",
    image:
      "https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=1200&q=80",
    description: "Premium sheep sourced for ceremonies, festive periods, and meat processing.",
  },
  {
    id: "p18",
    name: "Pig (Live Weight)",
    category: "Livestock",
    productType: "Pig",
    price: 990,
    stock: 9,
    unit: "animal",
    image:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80",
    description: "High-yield pigs available for commercial buyers and processors.",
  },
];

export const initialUsers: User[] = [
  {
    id: "u-admin",
    fullName: "Abeiku Farms Admin",
    email: "admin@abeikufarms.com",
    phone: "+233200000001",
    password: "admin123",
    role: "admin",
  },
];

export const testimonials = [
  {
    name: "Adwoa Mensah",
    quote: "The vegetables arrive fresh every time, and delivery is always on schedule.",
  },
  {
    name: "Samuel Owusu",
    quote: "Bulk ordering grains for my shop is now simple and transparent.",
  },
  {
    name: "Naa Atswei",
    quote: "Excellent support and very clean produce quality from order to doorstep.",
  },
];