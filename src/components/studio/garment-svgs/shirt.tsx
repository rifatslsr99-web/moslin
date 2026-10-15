"use client";

import { useDroppable } from "@dnd-kit/core";

interface ShirtSVGProps {
  baseColor: string;
  onDropZoneHover?: (zoneId: string | null) => void;
}

/**
 * Interactive SVG shirt with integrated drop zones
 * Each region is droppable for its corresponding customization type
 */
export default function ShirtSVG({ baseColor, onDropZoneHover }: ShirtSVGProps) {
  return (
    <svg
      viewBox="0 0 200 300"
      className="w-full h-full max-w-xs mx-auto"
      style={{ maxHeight: "400px" }}
    >
      {/* Shirt body background */}
      <defs>
        <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={baseColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={baseColor} stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Main shirt body */}
      <g id="shirt-body">
        {/* Left sleeve */}
        <SleeveLeftDropZone baseColor={baseColor} />

        {/* Right sleeve */}
        <SleeveRightDropZone baseColor={baseColor} />

        {/* Collar region */}
        <CollarDropZone baseColor={baseColor} />

        {/* Main body */}
        <rect
          x="40"
          y="40"
          width="120"
          height="160"
          fill="url(#shirtGradient)"
          stroke={baseColor}
          strokeWidth="1"
          rx="4"
        />

        {/* Button placeholders (center front) */}
        <ButtonAreaDropZone />

        {/* Pocket region */}
        <PocketAreaDropZone />

        {/* Hem/Length indicator */}
        <LengthIndicator baseColor={baseColor} />

        {/* Cuff indicators */}
        <CuffLeftDropZone baseColor={baseColor} />
        <CuffRightDropZone baseColor={baseColor} />
      </g>

      {/* Fit guide (subtle outline showing garment silhouette) */}
      <FitGuide />
    </svg>
  );
}

/**
 * Left Sleeve - Droppable region
 */
function SleeveLeftDropZone({ baseColor }: { baseColor: string }) {
  const { setNodeRef, isOver, active } = useDroppable({
    id: "sleeve-left",
    data: { type: "sleeve" },
  });

  const activeData = active?.data as any;
  const isValidDrop = isOver && activeData?.type === "sleeve";

  return (
    <g
      ref={setNodeRef as any}
      className={`drop-zone transition-opacity ${
        isOver ? (isValidDrop ? "opacity-100" : "opacity-50") : "opacity-90"
      }`}
      style={{
        filter: isValidDrop
          ? "drop-shadow(0 0 6px rgba(59, 130, 246, 0.6))"
          : "none",
      }}
    >
      {/* Upper sleeve */}
      <path
        d="M 20 40 Q 10 40 5 60 L 15 90 Q 20 80 25 75 Z"
        fill={baseColor}
        fillOpacity="0.85"
        stroke={baseColor}
        strokeWidth="0.5"
      />

      {/* Sleeve detail */}
      <line x1="15" y1="40" x2="12" y2="70" stroke={baseColor} strokeWidth="0.5" />
    </g>
  );
}

/**
 * Right Sleeve - Droppable region
 */
function SleeveRightDropZone({ baseColor }: { baseColor: string }) {
  const { setNodeRef, isOver, active } = useDroppable({
    id: "sleeve-right",
    data: { type: "sleeve" },
  });

  const activeData = active?.data as any;
  const isValidDrop = isOver && activeData?.type === "sleeve";

  return (
    <g
      ref={setNodeRef as any}
      className={`drop-zone transition-opacity ${
        isOver ? (isValidDrop ? "opacity-100" : "opacity-50") : "opacity-90"
      }`}
      style={{
        filter: isValidDrop
          ? "drop-shadow(0 0 6px rgba(59, 130, 246, 0.6))"
          : "none",
      }}
    >
      {/* Upper sleeve */}
      <path
        d="M 180 40 Q 190 40 195 60 L 185 90 Q 180 80 175 75 Z"
        fill={baseColor}
        fillOpacity="0.85"
        stroke={baseColor}
        strokeWidth="0.5"
      />

      {/* Sleeve detail */}
      <line x1="185" y1="40" x2="188" y2="70" stroke={baseColor} strokeWidth="0.5" />
    </g>
  );
}

/**
 * Collar - Droppable region
 */
function CollarDropZone({ baseColor }: { baseColor: string }) {
  const { setNodeRef, isOver, active } = useDroppable({
    id: "collar",
    data: { type: "collar" },
  });

  const activeData = active?.data as any;
  const isValidDrop = isOver && activeData?.type === "collar";

  return (
    <g
      ref={setNodeRef as any}
      className={`drop-zone transition-opacity ${
        isOver ? (isValidDrop ? "opacity-100" : "opacity-50") : "opacity-90"
      }`}
      style={{
        filter: isValidDrop
          ? "drop-shadow(0 0 6px rgba(59, 130, 246, 0.6))"
          : "none",
      }}
    >
      {/* Collar shape - V-neck with collar points */}
      <path
        d="M 70 40 L 60 25 L 50 30 Q 50 35 60 38 Z"
        fill={baseColor}
        fillOpacity="0.9"
        stroke={baseColor}
        strokeWidth="0.5"
      />
      <path
        d="M 130 40 L 140 25 L 150 30 Q 150 35 140 38 Z"
        fill={baseColor}
        fillOpacity="0.9"
        stroke={baseColor}
        strokeWidth="0.5"
      />

      {/* Center collar */}
      <path
        d="M 90 40 L 100 32 L 110 40 Z"
        fill={baseColor}
        fillOpacity="0.95"
        stroke={baseColor}
        strokeWidth="0.5"
      />
    </g>
  );
}

/**
 * Buttons/Center - Droppable region
 */
function ButtonAreaDropZone() {
  const { setNodeRef, isOver, active } = useDroppable({
    id: "button",
    data: { type: "button" },
  });

  const activeData = active?.data as any;
  const isValidDrop = isOver && activeData?.type === "button";

  return (
    <g
      ref={setNodeRef as any}
      className={`drop-zone transition-opacity ${
        isOver ? (isValidDrop ? "opacity-100" : "opacity-50") : "opacity-100"
      }`}
    >
      {/* Button placeholders */}
      <circle cx="100" cy="60" r="2" fill="#666" fillOpacity="0.5" />
      <circle cx="100" cy="80" r="2" fill="#666" fillOpacity="0.5" />
      <circle cx="100" cy="100" r="2" fill="#666" fillOpacity="0.5" />
      <circle cx="100" cy="120" r="2" fill="#666" fillOpacity="0.5" />
      <circle cx="100" cy="140" r="2" fill="#666" fillOpacity="0.5" />
      <circle cx="100" cy="160" r="2" fill="#666" fillOpacity="0.5" />
    </g>
  );
}

/**
 * Pocket - Droppable region
 */
function PocketAreaDropZone() {
  const { setNodeRef, isOver, active } = useDroppable({
    id: "pocket",
    data: { type: "pocket" },
  });

  const activeData = active?.data as any;
  const isValidDrop = isOver && activeData?.type === "pocket";

  return (
    <g
      ref={setNodeRef as any}
      className={`drop-zone transition-opacity ${
        isOver ? (isValidDrop ? "opacity-100" : "opacity-50") : "opacity-100"
      }`}
      style={{
        filter: isValidDrop
          ? "drop-shadow(0 0 6px rgba(59, 130, 246, 0.6))"
          : "none",
      }}
    >
      {/* Pocket outline */}
      <rect
        x="55"
        y="90"
        width="25"
        height="30"
        fill="none"
        stroke="#666"
        strokeWidth="0.5"
        strokeDasharray="2,2"
        fillOpacity="0.3"
        rx="1"
      />
    </g>
  );
}

/**
 * Cuffs - Left
 */
function CuffLeftDropZone({ baseColor }: { baseColor: string }) {
  const { setNodeRef, isOver, active } = useDroppable({
    id: "cuff",
    data: { type: "cuff" },
  });

  const activeData = active?.data as any;
  const isValidDrop = isOver && activeData?.type === "cuff";

  return (
    <g
      ref={setNodeRef as any}
      className={`drop-zone transition-opacity ${
        isOver ? (isValidDrop ? "opacity-100" : "opacity-50") : "opacity-90"
      }`}
      style={{
        filter: isValidDrop
          ? "drop-shadow(0 0 6px rgba(59, 130, 246, 0.6))"
          : "none",
      }}
    >
      {/* Cuff band */}
      <rect
        x="8"
        y="88"
        width="14"
        height="5"
        fill={baseColor}
        fillOpacity="0.8"
        stroke={baseColor}
        strokeWidth="0.5"
      />
    </g>
  );
}

/**
 * Cuffs - Right
 */
function CuffRightDropZone({ baseColor }: { baseColor: string }) {
  const { setNodeRef, isOver, active } = useDroppable({
    id: "cuff",
    data: { type: "cuff" },
  });

  const activeData = active?.data as any;
  const isValidDrop = isOver && activeData?.type === "cuff";

  return (
    <g
      ref={setNodeRef as any}
      className={`drop-zone transition-opacity ${
        isOver ? (isValidDrop ? "opacity-100" : "opacity-50") : "opacity-90"
      }`}
      style={{
        filter: isValidDrop
          ? "drop-shadow(0 0 6px rgba(59, 130, 246, 0.6))"
          : "none",
      }}
    >
      {/* Cuff band */}
      <rect
        x="178"
        y="88"
        width="14"
        height="5"
        fill={baseColor}
        fillOpacity="0.8"
        stroke={baseColor}
        strokeWidth="0.5"
      />
    </g>
  );
}

/**
 * Length Indicator - Bottom hem
 */
function LengthIndicator({ baseColor }: { baseColor: string }) {
  const { setNodeRef, isOver, active } = useDroppable({
    id: "length",
    data: { type: "length" },
  });

  const activeData = active?.data as any;
  const isValidDrop = isOver && activeData?.type === "length";

  return (
    <g
      ref={setNodeRef as any}
      className={`drop-zone transition-opacity ${
        isOver ? (isValidDrop ? "opacity-100" : "opacity-50") : "opacity-90"
      }`}
      style={{
        filter: isValidDrop
          ? "drop-shadow(0 0 6px rgba(59, 130, 246, 0.6))"
          : "none",
      }}
    >
      {/* Hem line */}
      <line
        x1="40"
        y1="200"
        x2="160"
        y2="200"
        stroke={baseColor}
        strokeWidth="1.5"
      />
      {/* Hem detail */}
      <line
        x1="40"
        y1="202"
        x2="160"
        y2="202"
        stroke={baseColor}
        strokeWidth="0.5"
        strokeOpacity="0.5"
      />
    </g>
  );
}

/**
 * Fit guide - Shows overall garment silhouette
 */
function FitGuide() {
  return (
    <g opacity="0.1" pointerEvents="none">
      {/* Outline guides for reference */}
      <rect x="35" y="35" width="130" height="170" fill="none" stroke="#000" strokeWidth="0.5" />
    </g>
  );
}
