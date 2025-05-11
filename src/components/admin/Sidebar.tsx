
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
  ChevronRight,
  ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

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
      icon: <ShoppingCart size={20} />,
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
        "bg-sidebar shadow-xl transition-all duration-300 flex flex-col relative z-10 h-screen",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-accent text-white rounded-full p-1.5 shadow-md hover:scale-110 transition-transform"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronRight 
          size={16} 
          className={cn("transition-transform duration-300", collapsed ? "rotate-0" : "rotate-180")}
        />
      </button>

      {/* Logo */}
      <div className={cn(
        "p-6 border-b border-sidebar-border flex items-center", 
        collapsed ? "justify-center" : "",
        "bg-gradient-to-r from-sidebar-accent to-sidebar"
      )}>
        {collapsed ? (
          <span className="text-xl font-bold text-white">SH</span>
        ) : (
          <Link to="/admin" className="text-xl font-bold text-white flex items-center">
            <ShoppingBag className="mr-2" />
            <span className="font-sans tracking-tight">STYLE</span>
            <span className="font-light">HAVEN</span>
          </Link>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-accent scrollbar-track-sidebar">
        <ul className="space-y-1.5">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center py-2.5 px-4 rounded-lg transition-all duration-200",
                  isActive(item.path)
                    ? "bg-sidebar-primary text-white shadow-md translate-x-1"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white"
                )}
                title={collapsed ? item.name : undefined}
              >
                <span className={cn(
                  collapsed ? "mx-auto" : "mr-3",
                  "transition-transform", 
                  isActive(item.path) && !collapsed ? "scale-110" : ""
                )}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className={cn(
                    "transition-transform",
                    isActive(item.path) ? "font-medium" : ""
                  )}>
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/30">
        <div className="flex flex-col space-y-2">
          <Button 
            asChild 
            variant="ghost" 
            className="justify-start text-sidebar-foreground hover:text-white hover:bg-sidebar-accent/50 rounded-lg"
            title={collapsed ? "Back to Shop" : undefined}
          >
            <Link to="/">
              <Home size={20} className={cn(collapsed ? "mx-auto" : "mr-3")} />
              {!collapsed && "Back to Shop"}
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start text-sidebar-foreground hover:text-white hover:bg-sidebar-accent/50 rounded-lg"
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
