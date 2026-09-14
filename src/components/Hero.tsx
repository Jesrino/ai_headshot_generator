import { useState } from "react";
import {
  ArrowDown,
  Camera,
  Check,
  SlidersHorizontal,
  Sparkles,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";

export function Hero() {
  const [splitPosition, setSplitPosition] = useState(52);

  return (
    <section className="hero-shell relative overflow-hidden px-4 pb-20 pt-16 text-left md:pb-28 md:pt-24">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-1.5 text-sm text-cyan-100">
            <Sparkles className="h-4 w-4" />
            Studio-grade portraits, made from one selfie
          </div>
          <h1 className="mb-6 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-tight text-white md:text-7xl">
            Your next <span className="gradient-text">best angle</span> is
            already in your camera roll.
          </h1>
          <p className="mb-9 max-w-xl text-lg leading-8 text-white/65">
            Turn a casual photo into a polished personal brand image. Choose a
            direction, preview the result, and export it when it feels right.
          </p>
          <div className="mb-7 flex flex-wrap gap-2">
            {[
              [Zap, "5-sec processing"],
              [Sparkles, "Studio lighting"],
              [Check, "Executive style"],
            ].map(([Icon, label]) => (
              <span
                key={label as string}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-medium text-slate-200"
              >
                <Icon className="h-3.5 w-3.5 text-cyan-200" />
                {label as string}
              </span>
            ))}
          </div>
          <a
            href="#upload"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 hover:shadow-lg hover:shadow-cyan-300/20"
          >
            Start with a selfie
            <ArrowDown className="h-4 w-4" />
          </a>
          <div className="mt-7 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[
                "photo-1494790108377-be9c29b29330",
                "photo-1500648767791-00dcc994a43e",
                "photo-1534528741775-53994a69daeb",
                "photo-1506794778202-cad84cf45f1d",
              ].map((photo) => (
                <img
                  key={photo}
                  src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=80&h=80&q=80`}
                  alt=""
                  className="h-8 w-8 rounded-full border-2 border-[#071016] object-cover"
                />
              ))}
            </div>
            <div className="text-sm text-slate-200">
              <div className="flex items-center gap-1 font-medium">
                <Users className="h-3.5 w-3.5 text-cyan-200" />
                10,000+ professionals
              </div>
              <p className="text-xs text-white/45">made their first impression count</p>
            </div>
          </div>
        </div>
        <div className="hero-note relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 lg:p-4">
          <div className="mb-3 flex items-center justify-between px-2 text-xs uppercase tracking-[0.2em] text-slate-200">
            <span className="flex items-center gap-2"><Camera className="h-3.5 w-3.5 text-cyan-200" /> Live preview</span>
            <span className="text-white/40">drag to compare</span>
          </div>
          <div className="before-after relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-slate-800">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&h=1125&q=85"
              alt="Studio-grade AI headshot preview"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${splitPosition}%` }}>
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&h=1125&q=85"
                alt="Original casual camera photo preview"
                className="h-full w-full max-w-none object-cover grayscale-[0.35] brightness-75"
              />
            </div>
            <div className="absolute inset-y-0 z-10 w-px bg-white/90 shadow-[0_0_16px_rgba(0,240,255,0.8)]" style={{ left: `${splitPosition}%` }}>
              <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-slate-950/80 text-cyan-200 backdrop-blur-md">
                <SlidersHorizontal className="h-4 w-4" />
              </div>
            </div>
            <span className="absolute bottom-3 left-3 z-20 rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">Original</span>
            <span className="absolute bottom-3 right-3 z-20 rounded-full bg-cyan-300 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-950">AI studio</span>
            <input
              aria-label="Compare original and AI studio headshot"
              type="range"
              min="10"
              max="90"
              value={splitPosition}
              onChange={(event) => setSplitPosition(Number(event.target.value))}
              className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-12 max-w-6xl overflow-hidden">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Choose a direction</p>
            <p className="mt-1 text-sm text-slate-200">A few places to start before you upload</p>
          </div>
          <WandSparkles className="h-5 w-5 text-cyan-200" />
        </div>
        <div className="style-rail flex gap-3 overflow-x-auto pb-2">
          {["Corporate", "Creative", "Cinematic", "Studio B&W"].map((style) => (
            <div key={style} className="min-w-40 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/[0.08]">
              <span className="mb-2 block h-1 w-8 rounded-full bg-cyan-300" />
              {style}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}