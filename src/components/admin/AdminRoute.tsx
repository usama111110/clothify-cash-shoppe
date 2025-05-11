
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="h-12 w-12 rounded-full border-4 border-t-transparent border-primary animate-spin"></div>
        <p className="mt-4 text-gray-600">Verifying admin credentials...</p>
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
