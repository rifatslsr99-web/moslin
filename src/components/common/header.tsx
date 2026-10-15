import Link from "next/link";
import { Button } from "@/components/ui/primitives";

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-bold text-slate-900 hidden sm:inline">MOSLIN</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/studio" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
            Create Design
          </Link>
          <Link href="/account" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
            My Account
          </Link>
          <Link href="/#how-it-works" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
            How It Works
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/account/orders">
            <Button variant="ghost" size="sm" className="hidden sm:inline-block">
              Orders
            </Button>
          </Link>
          <Link href="/studio">
            <Button size="sm">Create Now</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
