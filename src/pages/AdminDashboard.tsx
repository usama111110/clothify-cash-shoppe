
import { useEffect, useState } from "react";
import { getOrders } from "@/services/api";
import { Order } from "@/data/mockData";
import { salesData, categoryStats } from "@/data/mockData";
import Sidebar from "@/components/admin/Sidebar";
import DashboardCard from "@/components/admin/DashboardCard";
import SalesChart from "@/components/admin/SalesChart";
import CategoryStats from "@/components/admin/CategoryStats";
import RecentOrders from "@/components/admin/RecentOrders";
import { Activity, DollarSign, Package, Users } from "lucide-react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Calculate some basic stats
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-x-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          
          {/* Stats Cards */}
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
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-8">
            <SalesChart data={salesData} />
            <CategoryStats data={categoryStats} />
          </div>
          
          {/* Recent Orders Table */}
          <div className="mb-6">
            <RecentOrders orders={orders} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
