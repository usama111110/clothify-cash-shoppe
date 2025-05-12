
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, User, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { CartItem } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface NavbarProps {
  cartItems: CartItem[];
}

const Navbar = ({ cartItems }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    setIsAdmin(adminAuth === "true");
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Sale", path: "/sale" },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/90 dark:bg-shop-dark/90 backdrop-blur-md shadow-md py-2" 
        : "bg-white dark:bg-shop-dark py-4"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center gap-1">
            <span className="text-shop-accent">Style</span>
            <span className="text-shop-primary">Haven</span>
          </Link>

          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-gray-700 dark:text-gray-200 font-medium hover:text-shop-accent transition-colors relative after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:w-0 after:bg-shop-accent after:transition-all hover:after:w-full"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* User and Cart Icons */}
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Search size={20} className="text-gray-700 dark:text-gray-300" />
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Heart size={20} className="text-gray-700 dark:text-gray-300" />
            </Button>
            
            <Link to="/account" className="text-gray-700 dark:text-gray-300 hover:text-shop-accent">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <User size={20} />
              </Button>
            </Link>
            
            <Link to="/cart" className="text-gray-700 dark:text-gray-300 hover:text-shop-accent relative">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-shop-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-white dark:border-shop-dark">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {!isMobile && (
              <Link to={isAdmin ? "/admin" : "/admin/login"}>
                <Button variant="outline" size="sm" className="ml-4 rounded-full border-shop-accent text-shop-accent hover:bg-shop-accent/10">
                  Admin
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <nav className="mt-4 pb-4 border-t border-gray-100 dark:border-gray-800">
            <ul className="space-y-4 pt-4">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="block py-2 text-gray-700 dark:text-gray-200 hover:text-shop-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={isAdmin ? "/admin" : "/admin/login"}
                  className="block py-2 text-shop-accent hover:text-shop-accent/80 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
