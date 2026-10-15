import Link from "next/link";
import { Button } from "@/components/ui/primitives";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full opacity-20 -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 rounded-full opacity-30 -ml-36 -mb-36"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight font-serif">
              Design It,<br />
              <span className="text-amber-600">Visualize It,</span>
              <br />
              Make It Yours
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Welcome to premium custom fashion. Create personalized outfits that reflect your unique style.
              Choose every detail—from fabric to fit—and watch your vision come to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/studio">
                <Button size="lg" className="w-full sm:w-auto">
                  Create Your Design
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 text-sm">
              <div>
                <p className="text-2xl font-bold text-slate-900">500+</p>
                <p className="text-slate-600">Customization Options</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">1000+</p>
                <p className="text-slate-600">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">100%</p>
                <p className="text-slate-600">Handcrafted</p>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden aspect-square">
              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-slate-300 rounded-lg flex items-center justify-center">
                    <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-slate-600 font-medium">Your Custom Design Preview</p>
                  <p className="text-sm text-slate-500 mt-2">Coming Soon: Interactive 3D Preview</p>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 max-w-xs border border-slate-200">
              <p className="text-sm font-semibold text-slate-900 mb-2">✨ Special Offer</p>
              <p className="text-sm text-slate-600">Get 15% off your first custom design with code: FIRST15</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
