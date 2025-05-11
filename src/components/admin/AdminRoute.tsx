
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for admin auth in localStorage
    const adminAuth = localStorage.getItem("adminAuth");
    setIsAdmin(adminAuth === "true");
    
    if (adminAuth !== "true") {
      toast.error("You need to login to access the admin area");
    }
  }, []);

  // Show loading while checking auth state
  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-t-transparent border-primary animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-primary/20 animate-pulse"></div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-xl font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">StyleHaven Admin</h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Verifying admin credentials...</p>
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">Please wait</div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
