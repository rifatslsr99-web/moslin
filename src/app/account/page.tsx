"use client";

import Link from "next/link";
import { Button, Card, Badge } from "@/components/ui/primitives";

export default function AccountPage() {
  // Mock data - in production this would come from API
  const user = {
    firstName: "Sarah",
    lastName: "Anderson",
    email: "sarah@example.com",
  };

  const recentDesigns = [
    { id: 1, name: "Navy Formal Shirt", category: "shirt", status: "saved" },
    { id: 2, name: "Weekend Blazer", category: "blazer", status: "draft" },
  ];

  const recentOrders = [
    { id: 1, designName: "Classic White Shirt", status: "in_production", date: "2026-10-10" },
    { id: 2, designName: "Casual Linen Shirt", status: "delivered", date: "2026-10-05" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-serif">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-slate-600">{user.email}</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Link href="/studio">
            <Button className="w-full h-20 text-lg" variant="primary">
              Create New Design
            </Button>
          </Link>
          <Link href="/account/designs">
            <Button className="w-full h-20 text-lg" variant="outline">
              My Designs
            </Button>
          </Link>
          <Link href="/account/orders">
            <Button className="w-full h-20 text-lg" variant="outline">
              My Orders
            </Button>
          </Link>
          <Link href="/account/measurements">
            <Button className="w-full h-20 text-lg" variant="outline">
              Measurements
            </Button>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Designs */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 font-serif">Recent Designs</h2>
                <Link href="/account/designs">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>

              {recentDesigns.length > 0 ? (
                <div className="space-y-4">
                  {recentDesigns.map((design) => (
                    <div
                      key={design.id}
                      className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-slate-900">{design.name}</h3>
                          <p className="text-sm text-slate-600 capitalize">
                            {design.category}
                          </p>
                        </div>
                        <Badge variant={design.status === "saved" ? "success" : "secondary"}>
                          {design.status === "saved" ? "Saved" : "Draft"}
                        </Badge>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Duplicate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600">No designs yet. Start creating!</p>
              )}
            </Card>

            {/* Recent Orders */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 font-serif">Recent Orders</h2>
                <Link href="/account/orders">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>

              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-slate-900">{order.designName}</h3>
                          <p className="text-sm text-slate-600">{order.date}</p>
                        </div>
                        <Badge
                          variant={
                            order.status === "delivered"
                              ? "success"
                              : "warning"
                          }
                        >
                          {order.status === "delivered"
                            ? "Delivered"
                            : "In Production"}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" className="mt-4">
                        Track Order
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600">No orders yet.</p>
              )}
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <h3 className="font-bold text-slate-900 mb-4">Profile</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">Name</p>
                  <p className="text-slate-900">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">Email</p>
                  <p className="text-slate-900">{user.email}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Edit Profile
                </Button>
              </div>
            </Card>

            {/* Measurements */}
            <Card>
              <h3 className="font-bold text-slate-900 mb-4">Measurements</h3>
              <p className="text-sm text-slate-600 mb-4">
                Save your measurements for perfect fit across all designs.
              </p>
              <Link href="/account/measurements">
                <Button size="sm" className="w-full">
                  Manage Measurements
                </Button>
              </Link>
            </Card>

            {/* Quick Stats */}
            <Card>
              <h3 className="font-bold text-slate-900 mb-4">Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Designs</span>
                  <span className="font-bold text-slate-900">
                    {recentDesigns.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Orders</span>
                  <span className="font-bold text-slate-900">
                    {recentOrders.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Member Since</span>
                  <span className="font-bold text-slate-900">Oct 2026</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
