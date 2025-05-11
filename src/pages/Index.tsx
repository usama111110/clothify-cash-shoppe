
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySelector from "@/components/CategorySelector";
import PromoSection from "@/components/PromoSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/context/StoreContext";

const Index = () => {
  const { cart } = useStore();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartItems={cart} />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4">
          <CategorySelector />
          <FeaturedProducts />
        </div>
        <PromoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
