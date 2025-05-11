
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/admin/Sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Order } from "@/data/mockData";

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/api/orders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      return response.json();
    },
    onSettled: (data, error) => {
      if (error) {
        console.error("Failed to fetch orders:", error);
        // Fallback to using mock data will happen at component level
      }
    },
  });

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">Delivered</Badge>;
      case "shipped":
        return <Badge className="bg-blue-500 text-white hover:bg-blue-600">Shipped</Badge>;
      case "processing":
        return <Badge className="bg-amber-500 text-white hover:bg-amber-600">Processing</Badge>;
      case "pending":
        return <Badge className="bg-gray-400 text-white hover:bg-gray-500">Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredOrders = orders
    ? orders.filter((order: Order) => {
        const matchesSearch =
          searchTerm === "" ||
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerDetails.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        
        const matchesStatus = 
          !statusFilter || order.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      })
    : [];

  const handleStatusFilterClick = (status: string) => {
    setStatusFilter(statusFilter === status ? null : status);
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      toast.success(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Orders</h1>
          </div>
          <div className="grid gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Orders</h1>
          </div>
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-none shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center py-10">
                <p className="text-red-500 mb-4">Error loading orders. Please try again later.</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold flex items-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            <Package className="mr-2" /> Orders Management
          </h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-none shadow-sm"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filter by status:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["pending", "processing", "shipped", "delivered", "cancelled"].map(
              (status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  className={`shadow-sm ${statusFilter === status ? 'shadow-md' : ''} transition-all`}
                  onClick={() => handleStatusFilterClick(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              )
            )}
          </div>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-none shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-medium">All Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order: Order) => (
                      <TableRow key={order.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customerDetails.name}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <select 
                              className="text-xs border rounded px-2 py-1 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm"
                              onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                              value={order.status}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-shadow">
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOrders;
