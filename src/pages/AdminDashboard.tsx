
import { useEffect, useState } from "react";
import { getOrders } from "@/services/api";
import { Order } from "@/data/mockData";
import { salesData, categoryStats } from "@/data/mockData";
import Sidebar from "@/components/admin/Sidebar";
import DashboardCard from "@/components/admin/DashboardCard";
import SalesChart from "@/components/admin/SalesChart";
import CategoryStats from "@/components/admin/CategoryStats";
import RecentOrders from "@/components/admin/RecentOrders";
import { Activity, DollarSign, LogOut, Package, Settings, Users } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await getOrders();
        setOrders(data);
        toast.success("Dashboard data loaded successfully");
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  // Calculate some basic stats
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-x-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut size={16} />
              Logout
            </Button>
          </div>
          
          {/* Stats Cards */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard
                title="Total Revenue"
                value={`$${totalSales.toFixed(2)}`}
                icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                description="Total revenue from all orders"
              />
              
              <DashboardCard
                title="Total Orders"
                value={totalOrders.toString()}
                icon={<Package className="h-4 w-4 text-muted-foreground" />}
                description="Number of orders received"
              />
              
              <DashboardCard
                title="Avg. Order Value"
                value={`$${avgOrderValue.toFixed(2)}`}
                icon={<Activity className="h-4 w-4 text-muted-foreground" />}
                description="Average value per order"
              />
              
              <DashboardCard
                title="Total Customers"
                value={orders.length.toString()}
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
                description="Unique customer count"
              />
            </div>
          )}
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-8">
            <SalesChart data={salesData} />
            <CategoryStats data={categoryStats} />
          </div>
          
          {/* Recent Orders Table */}
          <div className="mb-6">
            {isLoading ? (
              <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
            ) : (
              <RecentOrders orders={orders} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
