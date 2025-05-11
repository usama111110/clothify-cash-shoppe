
import { Truck, ShieldCheck, RotateCw, CreditCard } from "lucide-react";

const features = [
  {
    icon: <Truck className="h-8 w-8 text-shop-accent" />,
    title: "Free Shipping",
    description: "On all orders over $50",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-shop-accent" />,
    title: "Secure Payments",
    description: "100% protected payments",
  },
  {
    icon: <RotateCw className="h-8 w-8 text-shop-accent" />,
    title: "Easy Returns",
    description: "30 day return policy",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-shop-accent" />,
    title: "Cash On Delivery",
    description: "Pay when you receive",
  },
];

const PromoSection = () => {
  return (
    <div className="bg-shop-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
