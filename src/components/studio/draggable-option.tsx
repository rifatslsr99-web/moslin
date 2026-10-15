"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface DraggableOptionProps {
  type: string;
  value: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function DraggableOption({
  type,
  value,
  label,
  isSelected,
  onClick,
}: DraggableOptionProps) {
  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({
      id: `${type}-${value}`,
      data: { type, value, label },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      {...listeners}
      {...attributes}
      className={`p-3 rounded-lg border-2 transition-all text-sm font-medium cursor-grab active:cursor-grabbing ${
        isSelected
          ? "border-slate-900 bg-slate-100 text-slate-900"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
      } ${isDragging ? "shadow-lg ring-2 ring-slate-400" : ""}`}
      title={`Drag to customize or click to select`}
    >
      <span className="inline-block mr-2">⋮⋮</span>
      {label}
    </button>
  );
}
