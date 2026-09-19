import { useState, useMemo } from "react";
import NavBar from "../components/NavBar";
import useFetch from "../custom/hook";
import {
  Search,
  Mail,
  Phone,
  Building2,
  MapPin,
  Users,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";

interface UserCompany {
  name: string;
  title: string;
  department: string;
}

interface UserAddress {
  city: string;
  state: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  email: string;
  phone?: string;
  image?: string;
  role?: string;
  company?: UserCompany;
  address?: UserAddress;
}

interface UsersResponse {
  users: User[];
  total: number;
}

const UserDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("All");

  const {
    data,
    loading,
    error,
  } = useFetch<UsersResponse>("https://dummyjson.com/users?limit=30");

  const users = data?.users || [];

  // Extract unique departments for filter chips
  const departments = useMemo(() => {
    const set = new Set<string>();
    users.forEach((u) => {
      if (u.company?.department) set.add(u.company.department);
    });
    return ["All", ...Array.from(set).slice(0, 5)];
  }, [users]);

  // Filter users based on search & department
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesDept =
        selectedDept === "All" || u.company?.department === selectedDept;

      const search = searchTerm.toLowerCase().trim();
      if (!search) return matchesDept;

      const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
      const email = u.email.toLowerCase();
      const company = u.company?.name?.toLowerCase() || "";
      const title = u.company?.title?.toLowerCase() || "";
      const city = u.address?.city?.toLowerCase() || "";

      const matchesSearch =
        fullName.includes(search) ||
        email.includes(search) ||
        company.includes(search) ||
        title.includes(search) ||
        city.includes(search);

      return matchesDept && matchesSearch;
    });
  }, [users, searchTerm, selectedDept]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <NavBar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-2.5">
              <ShieldCheck className="size-3.5" />
              <span>Protected Enterprise Directory</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-100">
              User Directory
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage and explore team members, roles, and departmental contacts
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <div className="size-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <Users className="size-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Total Users</p>
                <p className="text-base font-bold text-slate-100">{loading ? "..." : users.length}</p>
              </div>
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <div className="size-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <Sparkles className="size-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-400">Live Status</p>
                <p className="text-base font-bold text-emerald-400">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls: Search & Filter Tabs */}
        <div className="my-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, role, or company..."
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-900/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5 rounded"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>

          {/* Department Filter Pills */}
          {departments.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 font-medium whitespace-nowrap mr-1">Department:</span>
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedDept === dept
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                      : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Area */}
        {loading ? (
          /* Shimmer Skeleton Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 animate-pulse space-y-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="size-12 rounded-full bg-slate-800" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-800 rounded w-2/3" />
                    <div className="h-3 bg-slate-800/60 rounded w-1/3" />
                  </div>
                </div>
                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  <div className="h-3 bg-slate-800/70 rounded w-5/6" />
                  <div className="h-3 bg-slate-800/50 rounded w-4/6" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="p-8 rounded-2xl bg-rose-950/20 border border-rose-900/50 text-center max-w-md mx-auto my-12">
            <div className="inline-flex size-12 rounded-full bg-rose-900/40 text-rose-400 items-center justify-center mb-3">
              <AlertTriangle className="size-6" />
            </div>
            <h3 className="text-base font-semibold text-rose-200">Failed to Load Users</h3>
            <p className="text-xs text-rose-300/80 mt-1">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              size="sm"
              className="mt-4 border-rose-800/60 text-rose-200 hover:bg-rose-900/40 cursor-pointer"
            >
              <RefreshCw className="size-3.5 mr-1.5" /> Retry
            </Button>
          </div>
        ) : filteredUsers.length === 0 ? (
          /* Empty Search Results State */
          <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl my-8 bg-slate-900/30">
            <Users className="size-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-200">No matching users found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              We couldn't find any users matching "{searchTerm}". Try refining your query or clear the filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedDept("All");
              }}
              className="mt-4 border-slate-700 hover:bg-slate-800 text-slate-200 cursor-pointer"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          /* Users Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredUsers.map((item) => (
              <div
                key={item.id}
                className="group relative p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Avatar & Name */}
                  <div className="flex items-start gap-3.5 mb-3.5">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={`${item.firstName} ${item.lastName}`}
                        className="size-12 rounded-full bg-slate-800 object-cover ring-2 ring-slate-800 group-hover:ring-indigo-500/50 transition-all"
                      />
                    ) : (
                      <div className="size-12 rounded-full bg-indigo-950 border border-indigo-700/50 text-indigo-300 flex items-center justify-center font-bold text-sm">
                        {item.firstName[0]}
                        {item.lastName[0]}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-sm font-semibold text-slate-100 truncate group-hover:text-indigo-300 transition-colors">
                          {item.firstName} {item.lastName}
                        </h3>
                        {item.company?.department && (
                          <span className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            {item.company.department}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {item.company?.title || "Team Member"}
                      </p>
                    </div>
                  </div>

                  {/* Details List */}
                  <div className="space-y-2 pt-3 border-t border-slate-800/70 text-xs text-slate-300">
                    <div className="flex items-center gap-2 text-slate-300/90 truncate">
                      <Mail className="size-3.5 text-slate-500 shrink-0" />
                      <a
                        href={`mailto:${item.email}`}
                        className="truncate hover:text-indigo-400 transition-colors"
                        title={item.email}
                      >
                        {item.email}
                      </a>
                    </div>

                    {item.phone && (
                      <div className="flex items-center gap-2 text-slate-400 truncate">
                        <Phone className="size-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{item.phone}</span>
                      </div>
                    )}

                    {item.company?.name && (
                      <div className="flex items-center gap-2 text-slate-400 truncate">
                        <Building2 className="size-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{item.company.name}</span>
                      </div>
                    )}

                    {item.address?.city && (
                      <div className="flex items-center gap-2 text-slate-400 truncate">
                        <MapPin className="size-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">
                          {item.address.city}, {item.address.state}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/50 flex items-center justify-between text-[11px] text-slate-500">
                  <span>ID: #{item.id.toString().padStart(4, "0")}</span>
                  <span className="text-emerald-400 font-medium">Verified</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
 //     </p>
    //   ))}
    // </div>
  );
};

export default UserDirectory;
