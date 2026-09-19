import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import SignInPage from "./components/auth/SignInPage";
import UserDirectory from "./pages/UserDirectory";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Compass } from "lucide-react";
import InventoryPage from "./pages/InventoryPage";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white antialiased">
      <main className="flex-1">
        <Routes>
          {/* Public Sign-in Route */}
          <Route path="/sign-in" element={<SignInPage />} />

          {/* Protected Main Route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<UserDirectory />} />
            <Route path="/inventory" element={<InventoryPage />} />
          </Route>

          {/* 404 Not Found Route */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
                <div className="size-16 rounded-2xl bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 flex items-center justify-center mb-4">
                  <Compass className="size-8 animate-pulse" />
                </div>
                <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-violet-400">
                  404
                </div>
                <h2 className="text-xl font-bold text-slate-200 mt-3">
                  Page Not Found
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-sm leading-relaxed">
                  The page you are looking for doesn't exist or has been moved.
                </p>
                <Link
                  to="/"
                  className="mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/25 inline-flex items-center gap-2"
                >
                  Return to Directory
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
