import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Dashboard" },
    { to: "/users", label: "Users" },
    { to: "/products", label: "Products" },
    { to: "/sales", label: "Sales" },
    { to: "/transactions", label: "Transactions" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center font-bold text-xl shadow-sm text-blue-600">

        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block px-3 py-2 rounded-lg transition-colors ${
                location.pathname === item.to
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
          <h1 className="text-base font-semibold text-gray-800 px-2 py-0.5 w-20 h-8-fit">
            {navItems.find((i) => i.to === location.pathname)?.label || "Page"}
          </h1>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow">
            Logout
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-xl shadow p-6 min-h-[200px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
