
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-shop-dark text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1471&auto=format&fit=crop"
          alt="Fashion banner"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-shop-dark/90 via-shop-dark/70 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 py-32 md:py-40 relative z-10">
        <div className="max-w-xl">
          <div className="inline-block mb-4 bg-shop-accent/20 backdrop-blur-sm px-4 py-1 rounded-full">
            <span className="text-sm font-medium text-white/90">New Collection 2025</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 tracking-tight">
            Discover Your <span className="text-shop-accent">Style</span>
          </h1>
          <p className="text-xl mb-8 text-white/80 leading-relaxed">
            Elevate your wardrobe with our latest collection that combines contemporary designs with timeless elegance.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-shop-accent hover:bg-shop-accent/90 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-8">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300 px-8">
              <Link to="/new-arrivals">New Arrivals</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-shop-dark to-transparent"></div>
    </div>
  );
};

export default Hero;
