import { Card } from "@/components/ui/primitives";

const STEPS = [
  {
    number: 1,
    title: "Choose Your Budget",
    description: "Select from Essential, Exclusive, or Tailored tiers based on your preferences.",
    icon: "💰",
  },
  {
    number: 2,
    title: "Pick Your Garment",
    description: "Choose from shirts, blazers, trousers, dresses, and more.",
    icon: "👔",
  },
  {
    number: 3,
    title: "Customize Every Detail",
    description: "Select fabric, color, collar, sleeves, fit, embroidery, and 50+ other options.",
    icon: "✨",
  },
  {
    number: 4,
    title: "Visualize & Order",
    description: "Preview your design, review pricing, and place your order with 25% upfront.",
    icon: "🎨",
  },
  {
    number: 5,
    title: "Expert Crafting",
    description: "Our artisans handcraft your design with premium materials and precision.",
    icon: "👨‍🎨",
  },
  {
    number: 6,
    title: "Delivered to You",
    description: "Track production in real-time and receive your bespoke creation.",
    icon: "📦",
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            From inspiration to creation in six simple steps. Your custom MOSLIN awaits.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <Card key={step.number} className="relative">
              {/* Step number badge */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {step.number}
              </div>

              {/* Icon */}
              <div className="text-5xl mb-4">{step.icon}</div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.description}</p>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-slate-600 mb-6">
            Ready to create your first MOSLIN?
          </p>
          <a
            href="/studio"
            className="inline-block bg-slate-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Start Designing Now
          </a>
        </div>
      </div>
    </section>
  );
};
