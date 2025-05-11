
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Home,
  LogOut,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
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
    <aside 
      className={cn(
        "bg-shop-dark text-white transition-all duration-300 flex flex-col relative",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-shop-accent text-white rounded-full p-1 shadow-md"
      >
        <ChevronRight 
          size={16} 
          className={cn("transition-transform", collapsed ? "rotate-0" : "rotate-180")}
        />
      </button>

      {/* Logo */}
      <div className={cn("p-6 border-b border-gray-700 flex items-center", 
                       collapsed ? "justify-center" : "")}>
        {collapsed ? (
          <span className="text-xl font-bold">SH</span>
        ) : (
          <Link to="/admin" className="text-xl font-bold">
            StyleHaven Admin
          </Link>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
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
                title={collapsed ? item.name : undefined}
              >
                <span className={cn(collapsed ? "mx-auto" : "mr-3")}>{item.icon}</span>
                {!collapsed && item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex flex-col space-y-2">
          <Button 
            asChild 
            variant="ghost" 
            className="justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            title={collapsed ? "Back to Shop" : undefined}
          >
            <Link to="/">
              <Home size={20} className={cn(collapsed ? "mx-auto" : "mr-3")} />
              {!collapsed && "Back to Shop"}
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut size={20} className={cn(collapsed ? "mx-auto" : "mr-3")} />
            {!collapsed && "Logout"}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
