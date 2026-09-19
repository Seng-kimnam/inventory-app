import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../custom/AuthContext";
import {
  Mail,
  Lock,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const MOCK_USER_EMAIL = "abc@gmail.com"; // Demo account email
  // Redirect if already authenticated
  useEffect(() => {
    if (state.user) {
      const from =
        (location.state as { from?: { pathname?: string } })?.from?.pathname ||
        "/";
      navigate(from, { replace: true });
    }
  }, [state.user, navigate, location]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);

    // Give a brief smooth visual feedback
    setTimeout(() => {
      const success = signIn(trimmed);
      if (success) {
        const from =
          (location.state as { from?: { pathname?: string } })?.from
            ?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        setError(
          `Access denied. Please use the authorized demo account: ${MOCK_USER_EMAIL}`,
        );
        setIsSubmitting(false);
      }
    }, 250);
  };

  const handleAutofillDemo = () => {
    setEmail(MOCK_USER_EMAIL);
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-slate-950 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Brand Icon & Welcome */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-linear-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/20 mb-4 ring-1 ring-white/20">
            <ShieldCheck className="size-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Welcome to InventoryHub
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Sign in to access protected inventory and directory
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-slate-950/60">
          {/* Demo account helper pill */}
          <div className="mb-6 p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-indigo-200">
                  Demo Account
                </p>
                <p className="text-xs text-indigo-300/80 font-mono mt-0.5">
                  {MOCK_USER_EMAIL}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAutofillDemo}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 transition-colors border border-indigo-500/30 cursor-pointer"
            >
              Autofill
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/50 flex items-start gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
              <AlertCircle className="size-4 text-rose-400 shrink-0 mt-0.5" />
              <p className="text-xs text-rose-200 leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950/60 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  autoComplete="email"
                  autoFocus
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <Lock className="size-3 text-slate-400" />
            <span>Protected Route & Encrypted Session Simulation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
