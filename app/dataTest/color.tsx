"use client";
import React, { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import tinycolor from "tinycolor2";

interface TailwindPalette {
  [shade: string]: string; 
}

interface ThemeColors {
  base: string;
  palette: TailwindPalette;
  text: string;
  background: string;
}

// === Komponen Preview ===
const ColorBox: React.FC<{ label: string; color: string }> = ({
  label,
  color,
}) => (
  <div className="flex flex-col items-center gap-1">
    <div
      className="w-20 h-20 rounded-xl shadow"
      style={{ background: color }}
    />
    <span className="text-xs">{label}</span>
  </div>
);

// === Fungsi Generator Palet Tailwind ===
function generateTailwindPalette(baseColor: string): TailwindPalette {
  const base = tinycolor(baseColor);
  const steps = [
    { key: "50", lighten: 45 },
    { key: "100", lighten: 40 },
    { key: "200", lighten: 30 },
    { key: "300", lighten: 20 },
    { key: "400", lighten: 10 },
    { key: "500", lighten: 0 },
    { key: "600", darken: 10 },
    { key: "700", darken: 20 },
    { key: "800", darken: 30 },
    { key: "900", darken: 40 },
    { key: "950", darken: 50 },
  ];

  const palette: TailwindPalette = {};
  steps.forEach(({ key, lighten, darken }) => {
    let c = base.clone();
    if (lighten) c = c.lighten(lighten);
    if (darken) c = c.darken(darken);
    palette[key] = c.toHexString();
  });
  return palette;
}

// === Komponen Utama ===
export default function App() {
  const [baseColor, setBaseColor] = useState<string>("#3b82f6");
  const [theme, setTheme] = useState<ThemeColors>(() => {
    const palette = generateTailwindPalette("#3b82f6");
    return {
      base: "#3b82f6",
      palette,
      text: "#111111",
      background: "#ffffff",
    };
  });

  // Update saat user pilih warna baru
  const handleColorChange = (color: ColorResult) => {
    const base = color.hex;
    const palette = generateTailwindPalette(base);
    const textColor = tinycolor(base).isLight() ? "#111" : "#fff";
    const bgColor = tinycolor(base).isLight()
      ? palette["50"]
      : palette["900"];

    setBaseColor(base);
    setTheme({
      base,
      palette,
      text: textColor,
      background: bgColor,
    });
  };

  return (
    <div
      className="min-h-screen p-10 flex flex-col items-center gap-10 transition-colors"
      style={{ background: theme.background, color: theme.text }}
    >
      <h1 className="text-3xl font-bold mb-4">
        🎨 Tailwind-Style Color Generator
      </h1>

      {/* PICKER */}
      <div className="p-4 bg-white/30 backdrop-blur-xl rounded-2xl shadow-lg">
        <ChromePicker color={baseColor} onChange={handleColorChange} />
      </div>

      {/* PREVIEW WARNA */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-6">
        {Object.entries(theme.palette).map(([shade, color]) => (
          <ColorBox key={shade} label={shade} color={color} />
        ))}
      </div>

      {/* PREVIEW BUTTON */}
      <div className="flex flex-col items-center gap-4 mt-10">
        <button
          className="px-6 py-2 rounded-xl font-semibold shadow-md"
          style={{
            background: theme.palette["500"],
            color: theme.text,
          }}
        >
          Primary 500
        </button>

        <button
          className="px-6 py-2 rounded-xl font-semibold shadow-md"
          style={{
            background: theme.palette["700"],
            color: theme.text,
          }}
        >
          Primary 700
        </button>

        <div
          className="p-6 rounded-2xl backdrop-blur-lg shadow-xl"
          style={{
            background: `rgba(${tinycolor(theme.base).toRgb().r}, ${
              tinycolor(theme.base).toRgb().g
            }, ${tinycolor(theme.base).toRgb().b}, 0.3)`,
          }}
        >
          <p>Universal Blur Effect (Apple style)</p>
        </div>
      </div>
    </div>
  );
}
