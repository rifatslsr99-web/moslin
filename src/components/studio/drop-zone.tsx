"use client";

import { useDroppable } from "@dnd-kit/core";

interface DropZoneProps {
  id: string;
  type: string;
  label: string;
  icon: string;
  selectedValue?: string;
  position?: "top" | "left" | "right" | "center" | "bottom";
}

export default function DropZone({
  id,
  type,
  label,
  icon,
  selectedValue,
  position = "center",
}: DropZoneProps) {
  const { setNodeRef, isOver, active } = useDroppable({
    id,
    data: { type },
  });

  // Get position classes based on position prop
  const getPositionClasses = (): string => {
    switch (position) {
      case "top":
        return "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full -mb-2";
      case "bottom":
        return "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-2";
      case "left":
        return "absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 -mr-2";
      case "right":
        return "absolute top-1/2 right-0 translate-x-full -translate-y-1/2 ml-2";
      case "center":
        return "absolute inset-0 flex items-center justify-center";
      default:
        return "";
    }
  };

  const activeData = active?.data as any;
  const isValidDragOver =
    isOver && activeData?.type === type;

  return (
    <div
      ref={setNodeRef}
      className={`
        ${getPositionClasses()}
        px-3 py-2 rounded-lg border-2 transition-all
        flex flex-col items-center justify-center gap-1
        min-w-max
        ${
          isValidDragOver
            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300 scale-105"
            : isOver
              ? "border-red-300 bg-red-50"
              : "border-dashed border-slate-300 bg-slate-50 hover:border-slate-400"
        }
        ${active && activeData?.type !== type ? "opacity-50" : ""}
      `}
    >
      <div className="text-lg">{icon}</div>
      <div className="text-xs font-semibold text-slate-600 whitespace-nowrap">
        {label}
      </div>
      {selectedValue && (
        <div className="mt-1 px-2 py-1 bg-amber-100 text-amber-900 rounded text-xs font-medium whitespace-nowrap">
          {selectedValue}
        </div>
      )}
    </div>
  );
}
