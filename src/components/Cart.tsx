import { useCart } from "../custom/CartContext";
import { ShoppingBag, Plus, Minus, Trash2, RotateCcw } from "lucide-react";

export default function Cart() {
  // Reads cart directly via useContext hook - no props carry cart data
  const { state, dispatch } = useCart();
  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <ShoppingBag className="size-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              Cart Summary
              {totalItems > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              )}
            </h2>
          </div>
        </div>

        {state.items.length > 0 && (
          <button
            type="button"
            onClick={() => dispatch({ type: "CLEAR_CART" })}
            className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
            title="Clear all items"
          >
            <RotateCcw className="size-3" />
            Clear
          </button>
        )}
      </div>

      {/* Cart Content */}
      <div className="py-4 flex-1">
        {state.items.length === 0 ? (
          <div className="py-12 text-center">
            <div className="size-14 rounded-2xl bg-slate-800/60 border border-slate-700/40 flex items-center justify-center mx-auto mb-3 text-slate-500">
              <ShoppingBag className="size-7" />
            </div>
            <p className="text-sm font-semibold text-slate-300">
              Your cart is empty
            </p>
            <p className="text-xs text-slate-500 mt-1 max-w-55 mx-auto">
              Select products from the catalog to add them to your cart.
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-95 overflow-y-auto pr-1">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-slate-850/70 border border-slate-800 flex items-center justify-between gap-3 group hover:border-slate-700 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold text-slate-200 truncate">
                    {item.name}
                  </h3>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    ${item.price.toLocaleString()} each
                  </div>
                  <div className="text-xs font-bold text-indigo-300 mt-1">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>

                {/* Stepper Controls */}
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: {
                          id: item.id,
                          quantity: item.quantity - 1,
                        },
                      })
                    }
                    className="size-6 rounded flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-3" />
                  </button>

                  <span className="text-xs font-bold text-slate-200 w-5 text-center">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: {
                          id: item.id,
                          quantity: item.quantity + 1,
                        },
                      })
                    }
                    className="size-6 rounded flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>

                {/* Remove Line Item */}
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_ITEM",
                      payload: item.id,
                    })
                  }
                  className="size-7 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 flex items-center justify-center transition-colors cursor-pointer"
                  title="Remove item"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Items Subtotal Indicator */}
      {state.items.length > 0 && (
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">Cart Subtotal</span>
          <span className="font-bold text-slate-100">
            ${state.total.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
