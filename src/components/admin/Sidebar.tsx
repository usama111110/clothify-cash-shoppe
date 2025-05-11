
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Home,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <Package size={20} />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <ShoppingBag size={20} />,
    },
    {
      name: "Customers",
      path: "/admin/customers",
      icon: <Users size={20} />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside className="bg-shop-dark text-white w-64 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <Link to="/admin" className="text-xl font-bold">
          StyleHaven Admin
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center py-2 px-4 rounded-md transition-colors",
                  isActive(item.path)
                    ? "bg-shop-accent text-white"
                    : "hover:bg-gray-700"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex flex-col space-y-2">
          <Button asChild variant="ghost" className="justify-start text-gray-300 hover:text-white hover:bg-gray-700">
            <Link to="/">
              <Home size={20} className="mr-3" />
              Back to Shop
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
