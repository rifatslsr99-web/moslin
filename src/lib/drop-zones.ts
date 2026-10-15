/**
 * Drop zone configuration for customization drag-and-drop
 * Maps customization types to their drop zone properties
 */

export interface DropZoneConfig {
  id: string;
  type: string; // Customization type (collar, sleeve, etc.)
  label: string;
  icon: string;
  position?: "top" | "left" | "right" | "center" | "bottom";
}

export const DROP_ZONES: DropZoneConfig[] = [
  {
    id: "collar",
    type: "collar",
    label: "Collar",
    icon: "👔",
    position: "top",
  },
  {
    id: "sleeve-left",
    type: "sleeve",
    label: "Left Sleeve",
    icon: "👕",
    position: "left",
  },
  {
    id: "sleeve-right",
    type: "sleeve",
    label: "Right Sleeve",
    icon: "👕",
    position: "right",
  },
  {
    id: "cuff",
    type: "cuff",
    label: "Cuffs",
    icon: "✋",
    position: "bottom",
  },
  {
    id: "button",
    type: "button",
    label: "Buttons",
    icon: "●",
    position: "center",
  },
  {
    id: "pocket",
    type: "pocket",
    label: "Pockets",
    icon: "📦",
    position: "center",
  },
  {
    id: "fit",
    type: "fit",
    label: "Fit",
    icon: "📐",
    position: "center",
  },
  {
    id: "length",
    type: "length",
    label: "Length",
    icon: "📏",
    position: "bottom",
  },
];

/**
 * Get drop zones for a specific customization type
 * Some types can have multiple zones (e.g., sleeve has left and right)
 */
export function getDropZonesForType(type: string): DropZoneConfig[] {
  return DROP_ZONES.filter((zone) => zone.type === type);
}

/**
 * Get position classes for drop zone layout
 */
export function getPositionClasses(position?: string): string {
  switch (position) {
    case "top":
      return "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12";
    case "bottom":
      return "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-12";
    case "left":
      return "absolute top-1/2 left-0 -translate-x-12 -translate-y-1/2";
    case "right":
      return "absolute top-1/2 right-0 translate-x-12 -translate-y-1/2";
    case "center":
      return "absolute inset-0";
    default:
      return "";
  }
}
