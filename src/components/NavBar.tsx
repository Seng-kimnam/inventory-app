import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../custom/AuthContext";
import { useCart } from "../custom/CartContext";
import { LogOut, Package2, Users, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";

const NavBar = () => {
  const { state, signOut } = useAuth();
  const { state: cartState } = useCart();
  const navigate = useNavigate();
  const userEmail = state.user?.email || "Guest";
  const userInitial = userEmail.charAt(0).toUpperCase();
  const cartItemCount = cartState.items.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const handleSignOut = () => {
    signOut();
    navigate("/sign-in", { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Main Nav */}
        <div className="flex items-center gap-8">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="size-9 rounded-xl bg-linear-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Package2 className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-slate-100 tracking-tight leading-tight flex items-center gap-1.5">
                Inventory<span className="text-indigo-400">Hub</span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Pro
                </span>
              </span>
            </div>
          </NavLink>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-slate-800/90 text-indigo-400 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`
              }
            >
              <Users className="size-4" />
              <span>User Directory</span>
            </NavLink>
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-slate-800/90 text-indigo-400 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`
              }
            >
              <LayoutDashboard className="size-4" />
              <span>Inventory</span>
              {cartItemCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-indigo-600 text-white leading-none">
                  {cartItemCount}
                </span>
              )}
            </NavLink>
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center gap-3">
          {/* User Profile Pill */}
          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <div className="size-6 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center font-semibold text-xs">
              {userInitial}
            </div>
            <div className="flex flex-col text-left">
              <span className="font-medium text-slate-200 truncate max-w-37.5">
                Hi, {userEmail}
              </span>
            </div>
          </div>

          {/* Sign Out Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="border-slate-800 bg-slate-900/80 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-900/50 text-slate-300 transition-colors gap-1.5 text-xs font-medium cursor-pointer"
          >
            <LogOut className="size-3.5" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
