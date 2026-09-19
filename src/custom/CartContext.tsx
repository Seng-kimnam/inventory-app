import {
  createContext,
  useReducer,
  useContext,
  type ReactNode,
  type Dispatch,
} from "react";

// 1. Product type
export interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;
  description?: string;
  stock?: number;
  rating?: number;
  badge?: string;
}

// 2. Cart item type
export interface CartItem extends Product {
  quantity: number;
}

// 3. State type
interface CartState {
  items: CartItem[];
  total: number;
}

// 4. Discriminated-union Action type
type Action =
  | {
      type: "ADD_ITEM";
      payload: Product;
    }
  | {
      type: "REMOVE_ITEM";
      payload: number;
    }
  | {
      type: "UPDATE_QUANTITY";
      payload: {
        id: number;
        quantity: number;
      };
    }
  | {
      type: "CLEAR_CART";
    };

// 5. Initial state
const initialState: CartState = {
  items: [],
  total: 0,
};

// 6. Reducer
function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existing) {
        return {
          ...state,

          items: state.items.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),

          total: state.total + action.payload.price,
        };
      }

      return {
        ...state,

        items: [
          ...state.items,
          {
            ...action.payload,
            quantity: 1,
          },
        ],

        total: state.total + action.payload.price,
      };
    }

    case "REMOVE_ITEM": {
      const removed = state.items.find((item) => item.id === action.payload);

      if (!removed) {
        return state;
      }

      return {
        ...state,

        items: state.items.filter((item) => item.id !== action.payload),

        total: state.total - removed.price * removed.quantity,
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;

      const existing = state.items.find((item) => item.id === id);

      if (!existing) {
        return state;
      }

      // Quantity 0 removes the line
      if (quantity <= 0) {
        return {
          ...state,

          items: state.items.filter((item) => item.id !== id),

          total: state.total - existing.price * existing.quantity,
        };
      }

      const quantityDifference = quantity - existing.quantity;

      return {
        ...state,

        items: state.items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity,
              }
            : item,
        ),

        total: state.total + existing.price * quantityDifference,
      };
    }

    case "CLEAR_CART": {
      return initialState;
    }
  }
}

// 7. Context type
interface CartContextType {
  state: CartState;
  dispatch: Dispatch<Action>;
}

// 8. Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 9. Provider
function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// 10. Custom hook
function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}

export { CartProvider, useCart };
