
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-shop-dark text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1471&auto=format&fit=crop"
          alt="Fashion banner"
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            New Season Arrivals
          </h1>
          <p className="text-xl mb-8">
            Discover the latest trends in fashion and explore our new collection of clothing that defines style and comfort.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-shop-accent hover:bg-shop-accent/90">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-shop-dark">
              <Link to="/new-arrivals">New Arrivals</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
