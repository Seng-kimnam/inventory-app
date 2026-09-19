import { useState, useMemo } from "react";
import { useCart, type Product } from "../custom/CartContext";
import { Button } from "./ui/button";
import {
  Laptop,
  Keyboard,
  Mouse,
  Monitor,
  Headphones,
  HardDrive,
  Search,
  Plus,
  Check,
  Package,
  Layers,
  Sparkles,
  X,
} from "lucide-react";

// Curated catalog with rich information
const initialProducts: (Product & { iconName: string })[] = [
  {
    id: 1,
    name: "MacBook Pro 16\"",
    price: 2499,
    category: "Computers",
    description: "M3 Max chip, 36GB Unified Memory, 1TB SSD Liquid Retina XDR",
    stock: 8,
    rating: 4.9,
    badge: "Bestseller",
    iconName: "Laptop",
  },
  {
    id: 2,
    name: "ThinkPad X1 Carbon",
    price: 1849,
    category: "Computers",
    description: "Intel Core Ultra 7, 32GB RAM, 512GB SSD, Ultralight Carbon Fiber",
    stock: 12,
    rating: 4.8,
    badge: "Enterprise",
    iconName: "Laptop",
  },
  {
    id: 3,
    name: "Pro Mechanical Keyboard",
    price: 189,
    category: "Peripherals",
    description: "Hot-swappable switches, PBT keycaps, wireless 2.4GHz & Bluetooth",
    stock: 24,
    rating: 4.7,
    badge: "Popular",
    iconName: "Keyboard",
  },
  {
    id: 4,
    name: "Ergonomic Precision Mouse",
    price: 99,
    category: "Peripherals",
    description: "Darkfield 8K DPI sensor, hyper-fast scroll, USB-C quick charge",
    stock: 35,
    rating: 4.8,
    iconName: "Mouse",
  },
  {
    id: 5,
    name: "34\" Curved 4K Monitor",
    price: 899,
    category: "Displays",
    description: "144Hz Nano IPS, 1ms response, 98% DCI-P3, 90W USB-C Power Delivery",
    stock: 5,
    rating: 4.9,
    badge: "Pro Display",
    iconName: "Monitor",
  },
  {
    id: 6,
    name: "ANC Studio Headphones",
    price: 349,
    category: "Audio",
    description: "Lossless spatial audio, active noise cancellation, 30h battery life",
    stock: 18,
    rating: 4.9,
    badge: "Featured",
    iconName: "Headphones",
  },
  {
    id: 7,
    name: "Thunderbolt 4 Pro Dock",
    price: 279,
    category: "Peripherals",
    description: "Dual 4K display support, 96W charging, 10Gbps transfer speed",
    stock: 15,
    rating: 4.6,
    iconName: "HardDrive",
  },
  {
    id: 8,
    name: "27\" 5K Studio Display",
    price: 1299,
    category: "Displays",
    description: "True Tone color matching, 12MP ultra-wide camera with Center Stage",
    stock: 4,
    rating: 4.7,
    iconName: "Monitor",
  },
];

const renderIcon = (name: string) => {
  switch (name) {
    case "Laptop":
      return <Laptop className="size-6 text-indigo-400" />;
    case "Keyboard":
      return <Keyboard className="size-6 text-violet-400" />;
    case "Mouse":
      return <Mouse className="size-6 text-sky-400" />;
    case "Monitor":
      return <Monitor className="size-6 text-cyan-400" />;
    case "Headphones":
      return <Headphones className="size-6 text-pink-400" />;
    case "HardDrive":
      return <HardDrive className="size-6 text-amber-400" />;
    default:
      return <Package className="size-6 text-slate-400" />;
  }
};

export default function Products() {
  const { state, dispatch } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(initialProducts.map((p) => p.category || "General"));
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const q = searchTerm.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(q) ||
        (product.description?.toLowerCase().includes(q) ?? false) ||
        (product.category?.toLowerCase().includes(q) ?? false);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const getItemQuantity = (productId: number) => {
    const item = state.items.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="space-y-6">
      {/* Controls: Search and Categories */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products by model, category, or specs..."
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-900/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5 rounded cursor-pointer"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category filter tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-medium whitespace-nowrap mr-1 flex items-center gap-1.5">
            <Layers className="size-3.5" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Empty Filter State */}
      {filteredProducts.length === 0 ? (
        <div className="p-10 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
          <Package className="size-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-200">
            No products found
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            No items matched "{searchTerm}". Try checking for spelling errors or clear your filters.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="mt-4 border-slate-700 hover:bg-slate-800 text-slate-200 cursor-pointer"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
          {filteredProducts.map((product) => {
            const quantity = getItemQuantity(product.id);

            return (
              <div
                key={product.id}
                className="group relative p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900/95 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between"
              >
                <div>
                  {/* Top line: Icon, Badge, Category */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="size-12 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center group-hover:scale-105 group-hover:border-indigo-500/40 transition-all">
                      {renderIcon(product.iconName)}
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {product.badge && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          <Sparkles className="size-2.5" />
                          {product.badge}
                        </span>
                      )}
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Title and Specs */}
                  <h3 className="text-base font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Bottom Section: Price, Stock, Add Button */}
                <div className="mt-5 pt-4 border-t border-slate-800/70 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-lg font-bold text-slate-100 tracking-tight">
                      ${product.price.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5 font-medium">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {product.stock} units available
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {quantity > 0 && (
                      <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                        <Check className="size-3" />
                        {quantity} in cart
                      </span>
                    )}

                    <Button
                      onClick={() =>
                        dispatch({
                          type: "ADD_ITEM",
                          payload: product,
                        })
                      }
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-md shadow-indigo-600/25 cursor-pointer gap-1.5 transition-all active:scale-95"
                    >
                      <Plus className="size-3.5" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
