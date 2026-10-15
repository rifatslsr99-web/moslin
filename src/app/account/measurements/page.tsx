"use client";

import { useState } from "react";
import { Card, Button, Input } from "@/components/ui/primitives";

interface Measurements {
  chest?: number;
  waist?: number;
  hips?: number;
  inseam?: number;
  shoulderWidth?: number;
  armLength?: number;
  neckSize?: number;
}

export default function MeasurementsPage() {
  const [measurements, setMeasurements] = useState<Measurements>({
    chest: 38,
    waist: 32,
    hips: 38,
    inseam: 30,
    shoulderWidth: 16,
    armLength: 32,
    neckSize: 15.5,
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (key: keyof Measurements, value: string) => {
    setMeasurements({
      ...measurements,
      [key]: value ? parseFloat(value) : undefined,
    });
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const MEASUREMENT_GUIDE = [
    {
      name: "Chest",
      unit: "inches",
      key: "chest",
      description: "Measure around the fullest part of your chest",
    },
    {
      name: "Waist",
      unit: "inches",
      key: "waist",
      description: "Measure around your natural waist",
    },
    {
      name: "Hips",
      unit: "inches",
      key: "hips",
      description: "Measure around the fullest part of your hips",
    },
    {
      name: "Inseam",
      unit: "inches",
      key: "inseam",
      description: "Measure from your crotch to the inner ankle",
    },
    {
      name: "Shoulder Width",
      unit: "inches",
      key: "shoulderWidth",
      description: "Measure from shoulder point to shoulder point",
    },
    {
      name: "Arm Length",
      unit: "inches",
      key: "armLength",
      description: "Measure from shoulder to wrist with arm bent",
    },
    {
      name: "Neck Size",
      unit: "inches",
      key: "neckSize",
      description: "Measure around your neck",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-serif">
            My Measurements
          </h1>
          <p className="text-slate-600">
            Save your measurements for perfect fit across all your designs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">
                Enter Your Measurements
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {MEASUREMENT_GUIDE.map((measurement) => (
                  <div key={measurement.key}>
                    <Input
                      label={`${measurement.name} (${measurement.unit})`}
                      type="number"
                      step="0.5"
                      value={
                        measurements[measurement.key as keyof Measurements] || ""
                      }
                      onChange={(e) =>
                        handleChange(
                          measurement.key as keyof Measurements,
                          e.target.value
                        )
                      }
                      helperText={measurement.description}
                    />
                  </div>
                ))}
              </div>

              {isSaved && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-900 px-4 py-3 rounded-lg">
                  ✓ Your measurements have been saved!
                </div>
              )}

              <Button onClick={handleSave} size="lg" className="w-full">
                Save Measurements
              </Button>
            </Card>
          </div>

          {/* Right: Guide */}
          <div>
            <Card className="sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4">📏 Measurement Tips</h3>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-slate-900 mb-1">How to Measure</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>Use a soft measuring tape</li>
                    <li>Measure over lightweight clothing</li>
                    <li>Don't pull the tape too tight</li>
                    <li>Stand in a relaxed posture</li>
                  </ul>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <p className="font-semibold text-slate-900 mb-2">Pro Tip</p>
                  <p className="text-slate-600">
                    Having accurate measurements ensures your MOSLIN fits perfectly.
                    Our artisans will use these as reference points.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
