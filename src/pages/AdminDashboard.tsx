
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Order } from "@/data/mockData";
import { salesData, categoryStats } from "@/data/mockData";
import { getDashboardStats, getOrders } from "@/services/api";
import Sidebar from "@/components/admin/Sidebar";
import DashboardCard from "@/components/admin/DashboardCard";
import SalesChart from "@/components/admin/SalesChart";
import CategoryStats from "@/components/admin/CategoryStats";
import RecentOrders from "@/components/admin/RecentOrders";
import { Activity, DollarSign, Package, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  const { data: dashboardStats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
    onSettled: (data, error) => {
      if (error) {
        console.error("Failed to fetch dashboard stats:", error);
        toast.error("Failed to load dashboard statistics");
      }
    }
  });

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: getOrders,
    onSettled: (data, error) => {
      if (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to load order data");
      }
    }
  });

  const isLoading = statsLoading || ordersLoading;

  // Format numbers for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar />
      
      <div className="flex-1 overflow-x-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Dashboard</h1>
            <Button variant="outline" className="shadow-sm hover:shadow-md transition-shadow" asChild>
              <a href="/admin/orders">View All Orders</a>
            </Button>
          </div>
          
          {/* Stats Cards */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard
                title="Total Revenue"
                value={formatCurrency(dashboardStats?.totalRevenue || 0)}
                icon={<DollarSign className="h-5 w-5 text-emerald-600" />}
                description="Total revenue from all orders"
                trend={{
                  value: "+12.5%",
                  direction: "up"
                }}
              />
              
              <DashboardCard
                title="Total Orders"
                value={(dashboardStats?.ordersCount || 0).toString()}
                icon={<Package className="h-5 w-5 text-blue-600" />}
                description="Number of orders received"
                trend={{
                  value: "+8.2%",
                  direction: "up"
                }}
              />
              
              <DashboardCard
                title="Avg. Order Value"
                value={formatCurrency(dashboardStats?.avgOrderValue || 0)}
                icon={<Activity className="h-5 w-5 text-purple-600" />}
                description="Average value per order"
                trend={{
                  value: "+3.1%",
                  direction: "up"
                }}
              />
              
              <DashboardCard
                title="Total Customers"
                value={(dashboardStats?.customersCount || 0).toString()}
                icon={<Users className="h-5 w-5 text-orange-600" />}
                description="Unique customer count"
                trend={{
                  value: "+5.4%",
                  direction: "up"
                }}
              />
            </div>
          )}
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-8">
            <Card className="col-span-6 lg:col-span-4 shadow-soft backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-none">
              <CardHeader>
                <CardTitle className="text-xl font-medium">Sales Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-80 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                ) : (
                  <SalesChart data={dashboardStats?.salesData || salesData} />
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-6 lg:col-span-2 shadow-soft backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-none">
              <CardHeader>
                <CardTitle className="text-xl font-medium">Categories</CardTitle>
                <CardDescription>Sales by product category</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-80 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                ) : (
                  <CategoryStats data={dashboardStats?.categoryStats || categoryStats} />
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Orders Table */}
          <Card className="shadow-soft backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-medium">Recent Orders</CardTitle>
                <CardDescription>Latest customer purchases</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-shadow" asChild>
                <a href="/admin/orders">View All</a>
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              ) : (
                <RecentOrders orders={orders?.slice(0, 5) || []} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
