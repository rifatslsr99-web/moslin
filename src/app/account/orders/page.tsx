"use client";

import { Card, Badge } from "@/components/ui/primitives";

const ORDER_STATUSES = [
  { key: "design_confirmed", label: "Design Confirmed", completed: true },
  { key: "payment_received", label: "Payment Received", completed: true },
  { key: "measurement_verified", label: "Measurements Verified", completed: true },
  { key: "in_production", label: "In Production", completed: true },
  { key: "quality_check", label: "Quality Check", completed: false },
  { key: "packaging", label: "Packaging", completed: false },
  { key: "shipped", label: "Shipped", completed: false },
  { key: "delivered", label: "Delivered", completed: false },
];

export default function OrdersPage() {
  // Mock data
  const orders = [
    {
      id: "ORD-001",
      designName: "Classic White Shirt",
      budget: "Essential",
      totalPrice: 250,
      advancePayment: 62.5,
      remainingBalance: 187.5,
      status: "in_production",
      orderDate: "2026-10-10",
      estimatedDelivery: "2026-10-28",
      currentStep: 3,
    },
    {
      id: "ORD-002",
      designName: "Navy Blazer",
      budget: "Tailored",
      totalPrice: 950,
      advancePayment: 237.5,
      remainingBalance: 712.5,
      status: "delivered",
      orderDate: "2026-10-05",
      deliveredDate: "2026-10-20",
      currentStep: 7,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-serif">My Orders</h1>
          <p className="text-slate-600">{orders.length} orders</p>
        </div>

        {/* Orders */}
        <div className="space-y-8">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              {/* Header */}
              <div className="border-b border-slate-200 pb-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{order.designName}</h2>
                    <p className="text-slate-600">Order #{order.id}</p>
                  </div>
                  <Badge
                    variant={order.status === "delivered" ? "success" : "warning"}
                  >
                    {order.status === "in_production"
                      ? "In Production"
                      : "Delivered"}
                  </Badge>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600">Order Date</p>
                    <p className="font-semibold text-slate-900">{order.orderDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Budget Tier</p>
                    <p className="font-semibold text-slate-900">{order.budget}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Total Price</p>
                    <p className="font-semibold text-slate-900">${order.totalPrice}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">
                      {order.status === "delivered"
                        ? "Delivered"
                        : "Est. Delivery"}
                    </p>
                    <p className="font-semibold text-slate-900">
                      {order.status === "delivered"
                        ? order.deliveredDate
                        : order.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>

              {/* Production Timeline */}
              <div className="mb-8">
                <h3 className="font-bold text-slate-900 mb-6">Production Progress</h3>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute top-4 left-4 right-4 h-1 bg-slate-200">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{
                        width: `${(order.currentStep / ORDER_STATUSES.length) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Timeline steps */}
                  <div className="relative grid grid-cols-4 md:grid-cols-8 gap-2">
                    {ORDER_STATUSES.map((status, index) => (
                      <div key={status.key} className="text-center">
                        {/* Circle */}
                        <div
                          className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold transition-all ${
                            index < order.currentStep
                              ? "bg-green-500"
                              : index === order.currentStep
                                ? "bg-amber-500 ring-2 ring-amber-300"
                                : "bg-slate-300"
                          }`}
                        >
                          {index < order.currentStep ? "✓" : index + 1}
                        </div>

                        {/* Label */}
                        <p className="text-xs font-semibold text-slate-900 line-clamp-2">
                          {status.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment & Details */}
              <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                {/* Payment Info */}
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Payment Status</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Advance Payment (25%)</span>
                      <span className="font-semibold text-green-600">✓ Paid</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Remaining Balance (75%)</span>
                      <span className={`font-semibold ${order.status === "delivered" ? "text-green-600" : "text-amber-600"}`}>
                        {order.status === "delivered"
                          ? "✓ Paid"
                          : "Pending"}
                      </span>
                    </div>
                    {order.status !== "delivered" && (
                      <div className="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
                        <p className="text-xs text-amber-900">
                          You'll be invoiced for the remaining balance (${order.remainingBalance}) when
                          production begins.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm">
                      View Invoice
                    </button>
                    <button className="w-full px-4 py-2 bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm">
                      Download Spec Sheet
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
