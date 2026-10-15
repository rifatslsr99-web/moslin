"use client";

import Link from "next/link";
import { Button, Card } from "@/components/ui/primitives";

export default function DesignsPage() {
  // Mock data
  const designs = [
    {
      id: 1,
      name: "Navy Formal Shirt",
      category: "shirt",
      budget: "Exclusive",
      status: "saved",
      createdAt: "2026-10-10",
    },
    {
      id: 2,
      name: "Weekend Blazer",
      category: "blazer",
      budget: "Tailored",
      status: "draft",
      createdAt: "2026-10-08",
    },
    {
      id: 3,
      name: "Casual Linen Shirt",
      category: "shirt",
      budget: "Essential",
      status: "saved",
      createdAt: "2026-10-05",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2 font-serif">My Designs</h1>
            <p className="text-slate-600">{designs.length} designs saved</p>
          </div>
          <Link href="/studio">
            <Button>Create New</Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-8 flex gap-4 overflow-x-auto pb-2">
          <Button variant="outline" size="sm">
            All
          </Button>
          <Button variant="outline" size="sm">
            Saved
          </Button>
          <Button variant="outline" size="sm">
            Draft
          </Button>
          <Button variant="outline" size="sm">
            Ordered
          </Button>
        </div>

        {/* Designs Grid */}
        {designs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map((design) => (
              <Card key={design.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                {/* Preview */}
                <div className="bg-slate-100 aspect-square flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">👕</div>
                    <p className="text-slate-600 text-sm capitalize">{design.category}</p>
                  </div>
                </div>

                {/* Details */}
                <h3 className="font-bold text-lg text-slate-900 mb-2">{design.name}</h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                    {design.budget}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      design.status === "saved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {design.status === "saved" ? "Saved" : "Draft"}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-4">Created {design.createdAt}</p>

                {/* Actions */}
                <div className="space-y-2">
                  <Button size="sm" className="w-full">
                    Edit Design
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline">
                      Duplicate
                    </Button>
                    <Button size="sm" variant="outline">
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <p className="text-slate-600 mb-4">No designs yet</p>
            <Link href="/studio">
              <Button>Create Your First Design</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
