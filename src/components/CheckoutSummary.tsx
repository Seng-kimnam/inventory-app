import { useState } from "react";
import { useCart } from "../custom/CartContext";
import { Button } from "./ui/button";
import {
  Receipt,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

export default function CheckoutSummary() {
  // Reads cart strictly via useContext hook - no props carry cart data
  const { state, dispatch } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      dispatch({ type: "CLEAR_CART" });
      setTimeout(() => {
        setOrderComplete(false);
      }, 5000);
    }, 1200);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center border border-violet-500/30">
            <Receipt className="size-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">
              Checkout Summary
            </h2>
            <p className="text-[11px] text-slate-400">
              Direct context-driven billing
            </p>
          </div>
        </div>

        {totalItems > 0 && (
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
            {totalItems} {totalItems === 1 ? "unit" : "units"}
          </span>
        )}
      </div>

      {/* Checkout Success Confirmation */}
      {orderComplete && (
        <div className="my-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
          <CheckCircle2 className="size-4.5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-emerald-200">Order Confirmed!</p>
            <p className="text-emerald-300/80 mt-0.5">
              Your order has been processed and receipt emailed.
            </p>
          </div>
        </div>
      )}

      {/* Itemized List & Pricing */}
      <div className="py-4">
        {state.items.length === 0 ? (
          <div className="py-8 text-center">
            <div className="size-12 rounded-xl bg-slate-800/60 border border-slate-700/40 flex items-center justify-center mx-auto mb-2.5 text-slate-500">
              <ShoppingBag className="size-6" />
            </div>
            <p className="text-sm font-semibold text-slate-300">
              Your cart is empty.
            </p>
            <p className="text-xs text-slate-500 mt-1 max-w-50 mx-auto">
              Add items from the inventory to preview your checkout total.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Itemized List */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-slate-800/40 border border-slate-800/60"
                >
                  <span className="font-medium text-slate-200 truncate pr-2">
                    {item.name}{" "}
                    <span className="text-slate-400">× {item.quantity}</span>
                  </span>
                  <span className="font-semibold text-slate-100 shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-200 font-medium">
                  ${state.total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span className="text-emerald-400 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Sales Tax</span>
                <span className="text-slate-200 font-medium">$0.00</span>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-baseline justify-between">
                <span className="text-sm font-bold text-slate-100">Total</span>
                <strong className="text-lg font-extrabold text-transparent bg-clip-text bg-linear-to-r from-violet-300 to-indigo-300">
                  Total: ${state.total.toFixed(2)}
                </strong>
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="size-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Finalizing Order...
                </span>
              ) : (
                <>
                  <CreditCard className="size-4" />
                  <span>Complete Checkout</span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-0.5">
              <ShieldCheck className="size-3 text-emerald-400" />
              <span>Context-synced & Verified</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
