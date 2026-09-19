import NavBar from "../components/NavBar";
import Products from "../components/Product";
import Cart from "../components/Cart";
import CheckoutSummary from "../components/CheckoutSummary";
import { useCart } from "../custom/CartContext";
import {
  Boxes,
  ShoppingBag,
  DollarSign,
  Layers,
} from "lucide-react";

const InventoryPage = () => {
  const { state } = useCart();
  const totalCartItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white antialiased">
      <NavBar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-2.5">
              <Boxes className="size-3.5" />
              <span>Real-Time Inventory System</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-100">
              Product Inventory
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Browse enterprise hardware catalog, adjust quantities, and manage orders.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <div className="size-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <Layers className="size-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">
                  Catalog
                </p>
                <p className="text-base font-bold text-slate-100">8 Items</p>
              </div>
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <div className="size-8 rounded-lg bg-violet-600/20 text-violet-400 flex items-center justify-center">
                <ShoppingBag className="size-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">
                  Cart Items
                </p>
                <p className="text-base font-bold text-slate-100">
                  {totalCartItems}
                </p>
              </div>
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <div className="size-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <DollarSign className="size-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">
                  Total Value
                </p>
                <p className="text-base font-bold text-emerald-400">
                  ${state.total.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Products Catalog */}
          <section className="lg:col-span-7 xl:col-span-8">
            <Products />
          </section>

          {/* Cart & Checkout Column */}
          <aside className="lg:col-span-5 xl:col-span-4 space-y-6">
            <Cart />
            <CheckoutSummary />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default InventoryPage;
