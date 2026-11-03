
"use client";

import { useState } from "react";
import {
  Blend,
  Check,
  Code2,
  Copy,
  Heart,
  Layers3,
  Menu,
  Palette,
  Plus,
  RotateCcw,
  Sparkles,
  Type,
  WandSparkles,
  X,
} from "lucide-react";

const presets = [
  { name: "Purple Haze", colors: ["#8B5CF6", "#EC4899"], angle: 135 },
  { name: "Ocean Breeze", colors: ["#06B6D4", "#3B82F6"], angle: 120 },
  { name: "Sunset Glow", colors: ["#F97316", "#EC4899"], angle: 135 },
  { name: "Emerald Dream", colors: ["#10B981", "#06B6D4"], angle: 110 },
  { name: "Midnight", colors: ["#111827", "#6366F1"], angle: 145 },
  { name: "Peach Cloud", colors: ["#FDBA74", "#F9A8D4"], angle: 110 },
  { name: "Aurora", colors: ["#22D3EE", "#A78BFA", "#F472B6"], angle: 125 },
  { name: "Lime Light", colors: ["#A3E635", "#14B8A6"], angle: 135 },
];

const starterColors = ["#8B5CF6", "#EC4899"];

export default function Home() {
  const [colors, setColors] = useState(starterColors);
  const [angle, setAngle] = useState(135);
  const [activeTab, setActiveTab] = useState("Gradient Lab");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [palette, setPalette] = useState<string[]>([
    "#8B5CF6",
    "#EC4899",
    "#F59E0B",
    "#10B981",
    "#06B6D4",
  ]);
  const [previewText, setPreviewText] = useState("Design without limits.");
  const [selectedFont, setSelectedFont] = useState("Space Grotesk");
  const [collectionPresets, setCollectionPresets] = useState(presets);

  const fontOptions = [
    { name: "Space Grotesk", family: "var(--font-space), sans-serif", style: "Modern · Display" },
    { name: "Inter", family: "var(--font-inter), sans-serif", style: "Clean · UI" },
    { name: "Arial", family: "Arial, Helvetica, sans-serif", style: "Classic · Sans serif" },
    { name: "Verdana", family: "Verdana, Geneva, sans-serif", style: "Wide · Readable" },
    { name: "Trebuchet MS", family: "'Trebuchet MS', sans-serif", style: "Friendly · Rounded" },
    { name: "Georgia", family: "Georgia, serif", style: "Elegant · Serif" },
    { name: "Times New Roman", family: "'Times New Roman', serif", style: "Traditional · Serif" },
    { name: "Courier New", family: "'Courier New', monospace", style: "Technical · Monospace" },
    { name: "Impact", family: "Impact, Haettenschweiler, sans-serif", style: "Bold · Poster" },
    { name: "System UI", family: "system-ui, sans-serif", style: "Native · System" },
  ];

  const selectedFontFamily =
    fontOptions.find((font) => font.name === selectedFont)?.family ??
    "var(--font-space), sans-serif";

  const gradient = `linear-gradient(${angle}deg, ${colors.join(", ")})`;
  const css = `background: ${gradient};`;

  async function copyText(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("Clipboard unavailable");
    }
  }

  function updateColor(index: number, value: string) {
    setColors((current) =>
      current.map((color, i) => (i === index ? value : color))
    );
  }

  function addColor() {
    if (colors.length >= 5) return;
    setColors((current) => [...current, "#A78BFA"]);
  }

  function removeColor(index: number) {
    if (colors.length <= 2) return;
    setColors((current) => current.filter((_, i) => i !== index));
  }

  function randomize() {
    const randomHex = () =>
      "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    setColors([randomHex(), randomHex()]);
    setAngle(Math.floor(Math.random() * 360));
  }

  function randomizeCollection() {
    setCollectionPresets((current) => {
      const shuffled = [...current];
      for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  }

  function usePreset(preset: (typeof presets)[number]) {
    setColors([...preset.colors]);
    setAngle(preset.angle);
    setActiveTab("Gradient Lab");
  }

  function toggleFavorite() {
    setFavorites((current) =>
      current.includes(gradient)
        ? current.filter((item) => item !== gradient)
        : [...current, gradient]
    );
  }

  const navItems = [
    { name: "Gradient Lab", icon: Blend },
    { name: "Color Palettes", icon: Palette },
    { name: "Typography", icon: Type },
    { name: "CSS Exporter", icon: Code2 },
  ];

  return (
    <main className="min-h-screen bg-[#09090f] text-[#f5f3ff]">
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#09090f]/90 backdrop-blur-2xl">
        <div className="mx-auto flex h-[70px] max-w-[1600px] items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#" className="flex shrink-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/20">
              <Blend size={21} strokeWidth={2.2} />
            </div>
            <div>
              <div className="font-[family-name:var(--font-space)] text-xl font-bold tracking-tight">
                Pixel<span className="text-violet-400">Lab</span>
              </div>
              <div className="text-[10px] tracking-[0.2em] text-zinc-500">
                CREATIVE STUDIO
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-xs text-zinc-400 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            Your ideas, in color
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={randomize}
              className="hidden items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm text-zinc-300 transition hover:border-violet-400/50 hover:bg-violet-500/10 sm:flex"
            >
              <WandSparkles size={16} /> Surprise me
            </button>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label="Toggle navigation"
              className="rounded-xl border border-white/10 p-2.5 md:hidden"
            >
              {mobileMenu ? <X size={19} /> : <Menu size={19} />}
            </button>
            <div className="hidden h-9 w-9 items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10 text-xs font-bold text-violet-300 sm:flex">
              PL
            </div>
          </div>
        </div>
      </header>

      {mobileMenu && (
        <div className="border-b border-white/10 bg-[#11111b] p-4 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);
                setMobileMenu(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-zinc-300 hover:bg-white/5"
            >
              <item.icon size={17} /> {item.name}
            </button>
          ))}
        </div>
      )}

      <div className="mx-auto grid max-w-[1600px] md:grid-cols-[225px_minmax(0,1fr)]">
        <aside className="hidden min-h-[calc(100vh-70px)] border-r border-white/[0.07] p-5 md:flex md:flex-col">
          <div className="mb-4 px-3 text-[10px] font-semibold tracking-[0.2em] text-zinc-600">
            WORKSPACE
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] transition ${
                    active
                      ? "border border-violet-400/15 bg-violet-500/10 text-violet-200"
                      : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
                  }`}
                >
                  <Icon size={17} />
                  <span className="flex-1">{item.name}</span>
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="my-7 border-t border-white/[0.07]" />

          <div className="mb-4 flex items-center justify-between px-3">
            <span className="text-[10px] font-semibold tracking-[0.2em] text-zinc-600">
              YOUR FAVORITES
            </span>
            <Heart size={13} className="text-zinc-600" />
          </div>

          {favorites.length === 0 ? (
            <div className="px-3 text-xs leading-6 text-zinc-600">
              Save a gradient you love and it will appear here.
            </div>
          ) : (
            favorites.map((favorite) => (
              <button
                key={favorite}
                onClick={() => {
                  const match = favorite.match(/linear-gradient\((\d+)deg, (.*)\)/);
                  if (match) {
                    setAngle(Number(match[1]));
                    setColors(match[2].split(", "));
                    setActiveTab("Gradient Lab");
                  }
                }}
                className="mb-2 flex items-center gap-3 rounded-xl p-2 text-left text-xs text-zinc-400 hover:bg-white/5"
              >
                <span
                  className="h-7 w-9 shrink-0 rounded-lg"
                  style={{ background: favorite }}
                />
                Saved gradient
              </button>
            ))
          )}

          <div className="mt-auto rounded-2xl border border-violet-400/10 bg-gradient-to-br from-violet-500/[0.10] to-fuchsia-500/[0.03] p-4">
            <Sparkles size={18} className="mb-3 text-violet-300" />
            <div className="mb-1 text-sm font-semibold">Made for creators.</div>
            <p className="text-xs leading-5 text-zinc-500">
              Explore colors. Experiment freely. Make something beautiful.
            </p>
            <div className="mt-4 flex gap-1">
              {["#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#06B6D4"].map(
                (color) => (
                  <span
                    key={color}
                    className="h-2 flex-1 rounded-full"
                    style={{ background: color }}
                  />
                )
              )}
            </div>
          </div>
        </aside>

        <section className="min-w-0 px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="animate-fade-up mx-auto max-w-[1120px]">
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-violet-300">
                  <Sparkles size={14} />
                  YOUR CREATIVE PLAYGROUND
                </div>
                <h1 className="font-[family-name:var(--font-space)] text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[42px]">
                  Make something{" "}
                  <span className="gradient-text">beautiful.</span>
                </h1>
                <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-500 sm:text-base">
                  Your ideas deserve better colors. Create, experiment, and
                  bring your next design to life.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Layers3 size={15} />
                <span>Creative workspace</span>
                <span className="text-zinc-700">/</span>
                <span className="text-zinc-300">{activeTab}</span>
              </div>
            </div>

            <div className="mb-8 flex gap-2 overflow-x-auto pb-1 md:hidden">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-xs ${
                      activeTab === item.name
                        ? "border-violet-400/30 bg-violet-500/10 text-violet-200"
                        : "border-white/10 text-zinc-500"
                    }`}
                  >
                    <Icon size={15} /> {item.name}
                  </button>
                );
              })}
            </div>

            {activeTab === "Gradient Lab" && (
              <>
                <div className="overflow-hidden rounded-3xl border border-white/[0.09] bg-[#11111b] shadow-2xl shadow-black/20">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                        <Blend size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Gradient Lab</div>
                        <div className="mt-0.5 text-xs text-zinc-600">
                          Live canvas · Real-time preview
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={randomize}
                        aria-label="Randomize gradient"
                        className="rounded-xl border border-white/10 p-2.5 text-zinc-400 transition hover:bg-white/5 hover:text-white"
                      >
                        <RotateCcw size={16} />
                      </button>
                      <button
                        onClick={toggleFavorite}
                        aria-label="Save favorite gradient"
                        className={`rounded-xl border p-2.5 transition ${
                          favorites.includes(gradient)
                            ? "border-pink-400/30 bg-pink-500/10 text-pink-300"
                            : "border-white/10 text-zinc-400 hover:bg-white/5"
                        }`}
                      >
                        <Heart
                          size={16}
                          fill={favorites.includes(gradient) ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div
                      className="group relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-2xl sm:min-h-[340px] lg:min-h-[390px]"
                      style={{ background: gradient }}
                    >
                      <div className="absolute inset-0 bg-black/[0.04]" />
                      <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/10 px-3 py-1.5 text-[10px] font-medium tracking-[0.16em] text-white/80 backdrop-blur-lg">
                        LIVE PREVIEW
                      </div>
                      <div className="absolute right-5 top-5 rounded-full border border-white/25 bg-black/10 px-3 py-1.5 text-xs text-white/80 backdrop-blur-lg">
                        {angle}°
                      </div>
                      <div className="relative max-w-xl px-6 text-center">
                        <div className="mb-4 text-[10px] font-semibold tracking-[0.32em] text-white/75 sm:text-xs">
                          PIXELLAB ORIGINALS
                        </div>
                        <h2 className="font-[family-name:var(--font-space)] text-3xl font-semibold tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                          {previewText}
                        </h2>
                        <p className="mt-4 text-sm text-white/80 sm:text-base">
                          Every great idea starts somewhere.
                        </p>
                        <div className="mt-7 flex justify-center">
                          <span className="rounded-full border border-white/35 bg-white/15 px-5 py-2.5 text-xs font-medium text-white backdrop-blur-lg">
                            Explore your creativity ↗
                          </span>
                        </div>
                      </div>
                      <div className="absolute bottom-5 left-5 flex gap-2">
                        {colors.map((color, i) => (
                          <span
                            key={`${color}-${i}`}
                            className="h-7 w-7 rounded-full border-2 border-white/60 shadow-lg"
                            style={{ background: color }}
                          />
                        ))}
                      </div>
                      <div className="absolute bottom-5 right-5 text-[10px] tracking-widest text-white/75">
                        MADE WITH PIXELLAB
                      </div>
                    </div>

                    <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                      <div>
                        <div className="mb-4 flex items-center justify-between">
                          <span className="text-sm font-medium">Color stops</span>
                          <span className="text-xs text-zinc-600">
                            {colors.length} colors
                          </span>
                        </div>
                        <div className="space-y-3">
                          {colors.map((color, i) => (
                            <div
                              key={`stop-${i}`}
                              className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-2.5"
                            >
                              <label
                                className="relative h-10 w-11 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-white/10"
                                style={{ background: color }}
                              >
                                <input
                                  type="color"
                                  value={color}
                                  aria-label={`Choose color ${i + 1}`}
                                  onChange={(e) => updateColor(i, e.target.value)}
                                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                />
                              </label>
                              <div className="min-w-0 flex-1">
                                <div className="mb-1 text-[10px] text-zinc-600">
                                  COLOR STOP {i + 1}
                                </div>
                                <input
                                  value={color}
                                  maxLength={7}
                                  aria-label={`Hex color ${i + 1}`}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^#[0-9a-fA-F]{6}$/.test(value)) {
                                      updateColor(i, value);
                                    } else if (/^#[0-9a-fA-F]{0,5}$/.test(value)) {
                                      setColors((current) =>
                                        current.map((c, j) =>
                                          j === i ? value : c
                                        )
                                      );
                                    }
                                  }}
                                  onBlur={() =>
                                    setColors((current) =>
                                      current.map((c, j) =>
                                        j === i && !/^#[0-9a-fA-F]{6}$/.test(c)
                                          ? "#8B5CF6"
                                          : c
                                      )
                                    )
                                  }
                                  className="w-full bg-transparent font-mono text-sm text-zinc-200 outline-none"
                                />
                              </div>
                              <button
                                onClick={() => copyText(color, `color-${i}`)}
                                aria-label={`Copy ${color}`}
                                className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-white"
                              >
                                {copied === `color-${i}` ? (
                                  <Check size={15} />
                                ) : (
                                  <Copy size={15} />
                                )}
                              </button>
                              {colors.length > 2 && (
                                <button
                                  onClick={() => removeColor(i)}
                                  aria-label={`Remove color ${i + 1}`}
                                  className="rounded-lg p-2 text-zinc-600 hover:text-red-300"
                                >
                                  <X size={15} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        {colors.length < 5 && (
                          <button
                            onClick={addColor}
                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-3 text-xs text-zinc-500 transition hover:border-violet-400/30 hover:text-violet-300"
                          >
                            <Plus size={15} /> Add color stop
                          </button>
                        )}
                      </div>

                      <div>
                        <div className="mb-4 flex items-center justify-between">
                          <span className="text-sm font-medium">Direction</span>
                          <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-xs text-violet-300">
                            {angle}°
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={angle}
                          onChange={(e) => setAngle(Number(e.target.value))}
                          aria-label="Gradient direction"
                          className="h-1.5 w-full cursor-pointer accent-violet-500"
                        />
                        <div className="mt-2 flex justify-between text-[10px] text-zinc-600">
                          <span>0°</span>
                          <span>90°</span>
                          <span>180°</span>
                          <span>270°</span>
                          <span>360°</span>
                        </div>

                        <div className="mt-7">
                          <label className="mb-3 block text-sm font-medium">
                            Gradient presets
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            {presets.map((preset) => (
                              <button
                                key={preset.name}
                                onClick={() => usePreset(preset)}
                                title={preset.name}
                                aria-label={`Use ${preset.name} preset`}
                                className="group"
                              >
                                <span
                                  className="block aspect-square rounded-xl border border-white/10 transition group-hover:scale-105 group-hover:border-white/40"
                                  style={{
                                    background: `linear-gradient(${preset.angle}deg, ${preset.colors.join(", ")})`,
                                  }}
                                />
                                <span className="mt-1.5 block truncate text-[10px] text-zinc-600 group-hover:text-zinc-300">
                                  {preset.name}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-7 rounded-2xl border border-white/[0.07] bg-[#09090f] p-4 sm:p-5">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                          <Code2 size={16} className="text-violet-300" />
                          CSS OUTPUT
                        </div>
                        <button
                          onClick={() => copyText(css, "css")}
                          className="flex items-center gap-2 rounded-lg border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-xs text-violet-200 transition hover:bg-violet-500/20"
                        >
                          {copied === "css" ? (
                            <Check size={14} />
                          ) : (
                            <Copy size={14} />
                          )}
                          {copied === "css" ? "Copied!" : "Copy CSS"}
                        </button>
                        <button
                          onClick={() => setActiveTab("CSS Exporter")}
                          className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-300 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-200"
                        >
                          <Code2 size={14} /> Get CSS Code
                        </button>
                      </div>
                      <pre className="custom-scrollbar overflow-x-auto whitespace-pre-wrap break-all font-mono text-xs leading-6 text-emerald-300 sm:text-sm">
                        <span className="text-violet-300">background</span>
                        <span className="text-zinc-500">: </span>
                        <span>{gradient}</span>
                        <span className="text-zinc-500">;</span>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <div className="mb-5 flex items-end justify-between gap-3">
                    <div>
                      <div className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-violet-300">
                        NEED SOME INSPIRATION?
                      </div>
                      <h2 className="font-[family-name:var(--font-space)] text-xl font-semibold">
                        Explore the collection.
                      </h2>
                    </div>
                    <button
                      onClick={randomizeCollection}
                      className="flex items-center gap-2 text-xs text-zinc-500 hover:text-violet-300"
                    >
                      <RotateCcw size={14} /> Randomize collection
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {collectionPresets.slice(0, 4).map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => usePreset(preset)}
                        className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#11111b] text-left transition hover:-translate-y-1 hover:border-violet-400/30"
                      >
                        <div
                          className="h-24 transition group-hover:brightness-110 sm:h-32"
                          style={{
                            background: `linear-gradient(${preset.angle}deg, ${preset.colors.join(", ")})`,
                          }}
                        />
                        <div className="flex items-center justify-between gap-2 p-3">
                          <span className="truncate text-xs font-medium text-zinc-300">
                            {preset.name}
                          </span>
                          <Plus size={14} className="shrink-0 text-zinc-600 group-hover:text-violet-300" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "Color Palettes" && (
              <div className="rounded-3xl border border-white/[0.09] bg-[#11111b] p-5 sm:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">Color Studio</h2>
                    <p className="mt-2 text-sm text-zinc-500">
                      Generate a palette and copy individual HEX values.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setPalette(
                        Array.from({ length: 5 }, () =>
                          "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
                        )
                      )
                    }
                    className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-xs hover:bg-white/5"
                  >
                    <WandSparkles size={15} /> Generate palette
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {palette.map((color, i) => (
                    <div key={`${color}-${i}`} className="overflow-hidden rounded-2xl border border-white/10">
                      <label
                        className="block h-36 cursor-pointer sm:h-52"
                        style={{ background: color }}
                      >
                        <input
                          type="color"
                          value={color}
                          aria-label={`Edit palette color ${i + 1}`}
                          onChange={(e) =>
                            setPalette((current) =>
                              current.map((c, j) => (j === i ? e.target.value : c))
                            )
                          }
                          className="h-full w-full cursor-pointer opacity-0"
                        />
                      </label>
                      <button
                        onClick={() => copyText(color, `palette-${i}`)}
                        className="flex w-full items-center justify-between gap-1 bg-[#151520] p-3 font-mono text-xs text-zinc-300"
                      >
                        <span>{color}</span>
                        {copied === `palette-${i}` ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => copyText(palette.join(", "), "palette-all")}
                  className="mt-5 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-xs text-violet-200 hover:bg-violet-500/20"
                >
                  {copied === "palette-all" ? "Palette copied!" : "Copy all colors"}
                </button>
              </div>
            )}

            {activeTab === "Typography" && (
              <div className="rounded-3xl border border-white/[0.09] bg-[#11111b] p-5 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">Typography Lab</h2>
                  <p className="mt-2 text-sm text-zinc-500">
                    Experiment with copy for your next design.
                  </p>
                </div>
                <label className="mb-2 block text-xs text-zinc-500">Preview text</label>
                <input
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  maxLength={100}
                  className="mb-6 w-full rounded-xl border border-white/10 bg-[#09090f] px-4 py-3 text-sm outline-none focus:border-violet-400/50"
                />

                <div className="mb-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <label htmlFor="font-choice" className="text-xs font-medium text-zinc-400">Choose a font</label>
                    <span className="text-xs text-violet-300">{selectedFont}</span>
                  </div>
                  <select
                    id="font-choice"
                    value={selectedFont}
                    onChange={(e) => setSelectedFont(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#09090f] px-4 py-3 text-sm text-zinc-200 outline-none focus:border-violet-400/50"
                  >
                    {fontOptions.map((font) => (
                      <option key={font.name} value={font.name}>{font.name} — {font.style}</option>
                    ))}
                  </select>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {fontOptions.map((font) => (
                      <button
                        key={font.name}
                        onClick={() => setSelectedFont(font.name)}
                        className={`rounded-xl border p-3 text-left transition ${
                          selectedFont === font.name
                            ? "border-violet-400/40 bg-violet-500/10"
                            : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                        }`}
                      >
                        <span className="block truncate text-sm text-zinc-200" style={{ fontFamily: font.family }}>Ag</span>
                        <span className="mt-1 block truncate text-[10px] text-zinc-500">{font.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#09090f] p-6 sm:p-10">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-violet-300">{selectedFont.toUpperCase()} / LIVE PREVIEW</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-zinc-500">Aa Bb Cc 123</span>
                  </div>
                  <h3
                    className="gradient-text text-4xl font-bold tracking-tight sm:text-6xl"
                    style={{ fontFamily: selectedFontFamily }}
                  >
                    {previewText || "Your next big idea."}
                  </h3>
                  <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-400" style={{ fontFamily: selectedFontFamily }}>
                    Great typography gives your ideas a voice. Try different fonts and wording, then copy your text for your next project.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.08] pt-4 text-xs text-zinc-500">
                    <span>Font: <span className="text-zinc-300">{selectedFont}</span></span>
                    <span>Weight: <span className="text-zinc-300">Bold</span></span>
                    <span>Preview: <span className="text-zinc-300">Responsive</span></span>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => copyText(previewText, "typography")}
                    className="flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-xs text-violet-200 hover:bg-violet-500/20"
                  >
                    {copied === "typography" ? <Check size={15} /> : <Copy size={15} />}
                    Copy text
                  </button>
                  <button
                    onClick={() => copyText(`font-family: ${selectedFontFamily};`, "font-css")}
                    className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs text-zinc-300 hover:border-violet-400/30 hover:bg-white/5"
                  >
                    {copied === "font-css" ? <Check size={15} /> : <Code2 size={15} />}
                    Copy font CSS
                  </button>
                </div>
              </div>
            )}

            {activeTab === "CSS Exporter" && (
              <div className="rounded-3xl border border-white/[0.09] bg-[#11111b] p-5 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">CSS Exporter</h2>
                  <p className="mt-2 text-sm text-zinc-500">
                    Copy your current gradient as reusable CSS.
                  </p>
                </div>
                <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-violet-400/15 bg-violet-500/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">Need a different gradient?</p>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">Select or customize a gradient in the Gradient Lab first. Your selection will carry over here.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("Gradient Lab")}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-violet-400/25 bg-violet-500/10 px-4 py-3 text-xs font-medium text-violet-200 transition hover:bg-violet-500/20"
                  >
                    <Blend size={15} /> Open Gradient Lab
                  </button>
                </div>
                <div
                  className="mb-6 h-44 rounded-2xl"
                  style={{ background: gradient }}
                />
                <div className="rounded-2xl border border-white/10 bg-[#09090f] p-5">
                  <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-xs leading-7 text-emerald-300 sm:text-sm">
{`.gradient-background {\n  background: ${gradient};\n}`}
                  </pre>
                </div>
                <button
                  onClick={() =>
                    copyText(`.gradient-background {\n  ${css}\n}`, "export")
                  }
                  className="mt-5 flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-xs text-violet-200 hover:bg-violet-500/20"
                >
                  {copied === "export" ? <Check size={15} /> : <Copy size={15} />}
                  Copy CSS snippet
                </button>
              </div>
            )}

            <footer className="mt-12 flex flex-col justify-between gap-3 border-t border-white/[0.07] py-6 text-xs text-zinc-600 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <Blend size={15} className="text-violet-400" />
                <span>PixelLab Creative Studio</span>
              </div>
              <span>Built for curious minds and creative people. <span className="text-zinc-500">Crafted by Sid ✦</span></span>
            </footer>
          </div>
        </section>
      </div>

      {copied === "Clipboard unavailable" && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-white/10 bg-[#1b1b28] px-4 py-3 text-xs text-zinc-200 shadow-xl"
        >
          Clipboard access unavailable in this browser.
        </div>
      )}
    </main>
  );
}
