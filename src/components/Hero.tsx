import { ArrowDown, Camera, Sparkles, WandSparkles } from "lucide-react";

export function Hero() {
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
          <a
            href="#upload"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 hover:shadow-lg hover:shadow-cyan-300/20"
          >
            Start with a selfie
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
        <div className="hero-note relative hidden min-h-64 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 lg:block">
          <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full border border-cyan-200/20" />
          <div className="absolute -right-2 top-0 h-40 w-40 rounded-full border border-cyan-200/10" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/45">
              <span>Portrait lab / 01</span>
              <Camera className="h-4 w-4 text-cyan-200" />
            </div>
            <div>
              <WandSparkles className="mb-4 h-8 w-8 text-cyan-200" />
              <p className="max-w-xs text-2xl font-medium leading-tight text-white">
                Five considered directions. One version of you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}