"use client";
import React, { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import tinycolor from "tinycolor2";
import { Star, Heart, Bell } from "lucide-react"; // icon

interface TailwindPalette {
  [shade: string]: string;
}

interface ThemeColors {
  base: string;
  palette: TailwindPalette;
  text: string;
  background: string;
}

const ColorBox: React.FC<{ label: string; color: string }> = ({
  label,
  color,
}) => (
  <div
    onClick={() => navigator.clipboard.writeText(color)}
    className="flex flex-col items-center gap-1 cursor-pointer group"
  >
    <div
      className="w-16 h-16 rounded-xl shadow border border-black/10 transition-transform group-active:scale-95"
      style={{ background: color }}
    />
    <span className="text-xs font-mono text-gray-600 group-hover:text-black">
      {label}
    </span>
  </div>
);

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

export default function Page() {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [theme, setTheme] = useState<ThemeColors>(() => {
    const palette = generateTailwindPalette("#3b82f6");
    return {
      base: "#3b82f6",
      palette,
      text: "#111",
      background: "#f9fafb",
    };
  });

  const handleColorChange = (color: ColorResult) => {
    const base = color.hex;
    const palette = generateTailwindPalette(base);
    const isLight = tinycolor(base).isLight();
    const textColor = isLight ? "#111" : "#fff";
    const bgColor = isLight ? palette["50"] : palette["900"];

    setBaseColor(base);
    setTheme({ base, palette, text: textColor, background: bgColor });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center gap-10 py-10 transition-colors duration-300"
      style={{ background: theme.background, color: theme.text }}
    >
      <h1 className="text-3xl font-bold">🎨 Tailwind Color Generator</h1>

      {/* === Color Picker === */}
      <div className="p-4 bg-white/30 backdrop-blur-xl rounded-2xl shadow-lg">
        <ChromePicker color={baseColor} onChange={handleColorChange} />
      </div>

      {/* === Palette Preview === */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-6">
        {Object.entries(theme.palette).map(([shade, color]) => (
          <ColorBox key={shade} label={shade} color={color} />
        ))}
      </div>

      {/* === UI Preview Section === */}
      <section className="mt-12 w-full max-w-3xl flex flex-col gap-8">
        {/* TEXT EXAMPLES */}
        <div className="space-y-3 text-center">
          <p className="text-sm text-gray-500">
            Ini teks biasa (body text / paragraph).
          </p>
          <p
            className="text-lg font-semibold"
            style={{ color: theme.palette["700"] }}
          >
            Ini teks besar (judul sedang).
          </p>
          <p
            className="text-2xl font-bold"
            style={{ color: theme.palette["600"] }}
          >
            🔥 Ini teks penting besar
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4">
          <button
            className="px-5 py-2 rounded-lg font-semibold shadow transition"
            style={{
              background: theme.palette["500"],
              color: theme.text,
            }}
          >
            Primary
          </button>
          <button
            className="px-5 py-2 rounded-lg font-semibold shadow transition"
            style={{
              background: theme.palette["700"],
              color: theme.text,
            }}
          >
            Important
          </button>
          <button
            className="px-5 py-2 rounded-lg font-semibold border shadow transition"
            style={{
              borderColor: theme.palette["400"],
              color: theme.palette["700"],
              background: theme.palette["50"],
            }}
          >
            Outline
          </button>
        </div>

        {/* CARD */}
        <div
          className="p-6 rounded-2xl shadow-lg backdrop-blur-lg transition"
          style={{
            background: `rgba(${tinycolor(theme.base).toRgb().r}, ${
              tinycolor(theme.base).toRgb().g
            }, ${tinycolor(theme.base).toRgb().b}, 0.15)`,
          }}
        >
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: theme.palette["700"] }}
          >
            🌈 Preview Card
          </h2>
          <p className="text-sm opacity-90">
            Card ini menyesuaikan warna dari palet di atas. Cocok untuk tema
            dashboard, form, atau landing page.
          </p>
        </div>

        {/* ICONS */}
        <div className="flex justify-center gap-6 mt-4">
          <Star
            size={32}
            style={{ color: theme.palette["400"] }}
            className="transition-transform active:scale-90"
          />
          <Heart
            size={32}
            style={{ color: theme.palette["600"] }}
            className="transition-transform active:scale-90"
          />
          <Bell
            size={32}
            style={{ color: theme.palette["800"] }}
            className="transition-transform active:scale-90"
          />
        </div>
      </section>
    </div>
  );
}
