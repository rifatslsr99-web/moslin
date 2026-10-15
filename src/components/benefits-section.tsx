import { Card } from "@/components/ui/primitives";

const BENEFITS = [
  {
    title: "100% Personalization",
    description:
      "From fabric choice to embroidery, control every aspect of your garment. No two MOSLIN pieces are identical.",
    icon: "🎯",
  },
  {
    title: "Premium Quality",
    description:
      "Handcrafted by skilled artisans using only the finest fabrics and materials. Built to last.",
    icon: "✅",
  },
  {
    title: "Perfect Fit",
    description:
      "Save your measurements and get garments tailored to your exact dimensions. Comfort guaranteed.",
    icon: "📏",
  },
  {
    title: "Transparent Pricing",
    description:
      "See exact costs upfront. Pay 25% to start, 75% when you're satisfied with the prototype.",
    icon: "💎",
  },
  {
    title: "Real-Time Tracking",
    description:
      "Monitor your design from concept to delivery. Know exactly where your creation is at every stage.",
    icon: "📍",
  },
  {
    title: "Sustainability",
    description:
      "Made-to-order means zero waste. We use eco-friendly practices and sustainable materials.",
    icon: "🌱",
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">
            Why Choose MOSLIN
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Experience the difference that custom, personalized fashion brings to your wardrobe.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
