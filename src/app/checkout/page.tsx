"use client";

import { useCartStore } from "@/store/cart-store";
import { Button, Card, Input } from "@/components/ui/primitives";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const advancePayment = Math.round(totalPrice * 0.25 * 100) / 100;
  const remainingBalance = Math.round((totalPrice - advancePayment) * 100) / 100;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="text-center py-12">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4 font-serif">
              Order Confirmed!
            </h1>
            <p className="text-slate-600 mb-8 text-lg">
              Thank you for creating with MOSLIN. Your custom designs are being prepared.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8 text-left">
              <p className="font-semibold text-slate-900 mb-2">What's Next?</p>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>✓ You'll receive a confirmation email shortly</li>
                <li>✓ Track your order status in your account dashboard</li>
                <li>✓ Pay the remaining 75% balance when your design enters production</li>
                <li>✓ Our artisans will begin crafting your masterpiece</li>
              </ul>
            </div>

            <Link href="/account/orders">
              <Button size="lg" className="w-full">
                View Your Orders
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 font-serif">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">Order Items</h2>

              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-600 mb-4">Your cart is empty</p>
                  <Link href="/studio">
                    <Button>Create a Design</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.designId} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-slate-900">{item.design.name}</h3>
                          <p className="text-sm text-slate-600 capitalize">
                            {item.design.category} • {item.design.budget}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">
                            ${(item.design.pricing?.total || 0) * item.quantity}
                          </p>
                          <p className="text-xs text-slate-600">
                            ${item.design.pricing?.total || 0} each
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {items.length > 0 && (
              <Card>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">
                  Billing Information
                </h2>

                <form onSubmit={handleCheckout} className="space-y-6">
                  <Input
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>Payment Notice:</strong> You'll pay 25% advance payment now
                      (${advancePayment}). The remaining 75% (${remainingBalance}) is due
                      when your design enters production.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isProcessing || !fullName || !email}
                  >
                    {isProcessing
                      ? "Processing..."
                      : `Pay ${advancePayment} to Proceed`}
                  </Button>
                </form>
              </Card>
            )}
          </div>

          {/* Right: Order Summary */}
          {items.length > 0 && (
            <div>
              <Card className="sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-6 font-serif">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal ({items.length} items)</span>
                    <span className="font-semibold text-slate-900">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Shipping</span>
                    <span className="font-semibold text-slate-900">Included</span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <p className="text-xs font-semibold text-amber-900 mb-3">Payment Plan</p>
                  <div className="space-y-2 text-sm text-amber-900">
                    <div className="flex justify-between">
                      <span>Pay Today (25%)</span>
                      <span className="font-bold">${advancePayment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pay Later (75%)</span>
                      <span className="font-bold">${remainingBalance}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-slate-600 uppercase mb-2">
                    Total Order Value
                  </p>
                  <p className="text-3xl font-bold text-slate-900">${totalPrice}</p>
                </div>

                <Link href="/studio" className="block">
                  <Button variant="ghost" size="sm" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
