import { createContext, useContext, useReducer, type Dispatch } from "react";

const mockUser: AuthState = { user: { email: "abc@gmail.com" } };

export interface User {
  email: string;
}

export interface AuthState {
  user: User | null;
}

type AuthAction =
  | { type: "SIGN_IN"; payload: { email: string } }
  | { type: "SIGN_OUT" };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SIGN_IN":
      if (action.payload?.email.toLowerCase() === mockUser.user?.email.toLowerCase()) {
        return { ...state, user: { email: action.payload?.email || "" } };
      } else {
        return state;
      }

    case "SIGN_OUT":
      return { ...state, user: null };
    default:
      return state;
  }
}

interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
  signIn: (email: string) => boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, mockUser);

  const signIn = (email: string): boolean => {
    const normalized = email.trim().toLowerCase();
    if (normalized === mockUser.user?.email.toLowerCase()) {
      dispatch({ type: "SIGN_IN", payload: { email: email.trim() } });
      return true;
    }
    return false;
  };

  const signOut = () => {
    dispatch({ type: "SIGN_OUT" });
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
