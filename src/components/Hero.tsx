import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Camera,
  Check,
  SlidersHorizontal,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const demoPortrait =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1100&h=1375&q=90";

const styles = [
  {
    id: "corporate",
    label: "Corporate",
    treatment: "saturate(.82) contrast(1.06) brightness(1.09)",
    tint: "from-slate-950/15 via-blue-900/10 to-slate-950/45",
  },
  {
    id: "founder",
    label: "Tech Founder",
    treatment: "saturate(1.12) contrast(1.08) brightness(1.03)",
    tint: "from-cyan-950/15 via-teal-900/10 to-slate-950/40",
  },
  {
    id: "editorial",
    label: "Editorial",
    treatment: "saturate(.72) contrast(1.16) brightness(1.02)",
    tint: "from-amber-950/15 via-rose-900/10 to-slate-950/45",
  },
  {
    id: "neutral",
    label: "Studio Neutral",
    treatment: "saturate(.9) contrast(1.04) brightness(1.12)",
    tint: "from-stone-950/10 via-orange-900/5 to-slate-950/35",
  },
] as const;

const features = [
  { Icon: Zap, label: "4K Studio Resolution" },
  { Icon: Sparkles, label: "Studio Lighting" },
  { Icon: Check, label: "20+ Executive Styles" },
];

const entrance = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const [splitPosition, setSplitPosition] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<(typeof styles)[number]>(
    styles[0],
  );
  const shouldReduceMotion = useReducedMotion();
  const comparisonAnimation = hasInteracted || shouldReduceMotion
    ? { clipPath: `inset(0 ${100 - splitPosition}% 0 0)` }
    : {
        clipPath: [
          "inset(0 75% 0 0)",
          "inset(0 25% 0 0)",
          "inset(0 50% 0 0)",
        ],
      };
  const dividerAnimation = hasInteracted || shouldReduceMotion
    ? { left: `${splitPosition}%` }
    : { left: ["25%", "75%", "50%"] };

  const updateSplitPosition = (value: number) => {
    setHasInteracted(true);
    setSplitPosition(value);
  };

  return (
    <section className="hero-shell relative overflow-hidden px-4 pb-20 pt-14 md:pb-24 md:pt-20">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <motion.div
        className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <div className="relative z-10">
          <motion.div
            variants={entrance}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-4 py-2 text-sm text-cyan-100"
          >
            <Sparkles aria-hidden="true" className="h-4 w-4 text-cyan-200" />
            A studio portrait, starting with one selfie
          </motion.div>

          <motion.h1
            variants={entrance}
            className="mb-6 max-w-3xl text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.5rem]"
          >
            Your next <span className="gradient-text">best angle</span> is
            already in your camera roll
          </motion.h1>

          <motion.p
            variants={entrance}
            className="mb-8 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8"
          >
            Turn a casual selfie into a polished portrait for your next big
            introduction. Choose a look, compare the result, and make it yours.
          </motion.p>

          <motion.div
            variants={entrance}
            className="mb-8 flex flex-wrap gap-2"
          >
            {features.map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.045] px-3 py-2 text-xs font-medium text-slate-200"
              >
                <Icon
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-cyan-200"
                />
                {label}
              </span>
            ))}
          </motion.div>

          <motion.div variants={entrance}>
            <a
              href="#upload"
              className="primary-cta group relative inline-flex min-h-12 items-center gap-3 overflow-hidden rounded-xl border border-cyan-100/35 bg-cyan-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
            >
              <span className="cta-sheen pointer-events-none absolute inset-0" />
              <span className="relative">Start with a selfie</span>
              <ArrowDown
                aria-hidden="true"
                className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </a>
          </motion.div>

          <motion.div
            variants={entrance}
            className="mt-7 flex items-center gap-3"
          >
            <div className="flex -space-x-2" aria-hidden="true">
              {[
                "photo-1494790108377-be9c29b29330",
                "photo-1500648767791-00dcc994a43e",
                "photo-1534528741775-53994a69daeb",
                "photo-1506794778202-cad84cf45f1d",
              ].map((photo, index) => (
                <img
                  key={photo}
                  src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=80&h=80&q=80`}
                  alt=""
                  width="36"
                  height="36"
                  loading="lazy"
                  className="h-9 w-9 rounded-full border-2 border-[#071016] object-cover"
                  style={{ zIndex: 4 - index }}
                />
              ))}
            </div>
            <div className="text-sm text-slate-200">
              <div className="flex items-center gap-1.5 font-medium">
                <Users
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-cyan-200"
                />
                Made for your next introduction
              </div>
              <p className="mt-0.5 text-xs text-white/45">
                A more confident first impression starts here
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={entrance}
          className="hero-note relative mx-auto w-full max-w-[34rem] rounded-[1.75rem] border border-white/10 bg-[#0b151d]/90 p-3 shadow-[0_30px_100px_rgba(0,0,0,.38)] sm:p-4"
        >
          <div className="mb-3 flex items-center justify-between gap-3 px-1 text-[11px] uppercase tracking-[0.17em] text-slate-300 sm:px-2 sm:text-xs">
            <span className="flex items-center gap-2">
              <Camera
                aria-hidden="true"
                className="h-3.5 w-3.5 text-cyan-200"
              />
              Portrait preview
            </span>
            <span className="normal-case tracking-normal text-white/45">
              Drag to compare
            </span>
          </div>

          <div className="before-after relative aspect-[4/4.5] overflow-hidden rounded-[1.2rem] bg-slate-900 sm:aspect-[4/4.2]">
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={selectedStyle.id}
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              >
                <img
                  src={demoPortrait}
                  alt="AI studio portrait style preview"
                  width="880"
                  height="990"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_38%]"
                  style={{ filter: selectedStyle.treatment }}
                />
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-br ${selectedStyle.tint}`}
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_20%,rgba(255,255,255,.2),transparent_45%)]" />
                {!shouldReduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="scan-beam absolute -inset-x-10 h-24"
                    initial={{ y: "-120%" }}
                    animate={{ y: ["-120%", "520%"] }}
                    transition={{
                      duration: 4.8,
                      ease: "linear",
                      repeat: Infinity,
                      repeatDelay: 1.8,
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="absolute inset-0 z-[1] overflow-hidden"
              initial={{ clipPath: "inset(0 50% 0 0)" }}
              animate={comparisonAnimation}
              transition={
                hasInteracted || shouldReduceMotion
                  ? { duration: 0.18, ease: "easeOut" }
                  : { duration: 1.8, times: [0, 0.55, 1], ease: "easeInOut" }
              }
            >
              <img
                src={demoPortrait}
                alt="Casual selfie before the studio portrait treatment"
                width="880"
                height="990"
                className="absolute inset-0 h-full w-full object-cover object-[50%_38%] brightness-[.72] saturate-[.72]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-slate-950/10 via-transparent to-slate-950/30"
              />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute inset-y-0 z-[2] w-px bg-white/90 shadow-[0_0_16px_rgba(0,240,255,.8)]"
              initial={{ left: "50%" }}
              animate={dividerAnimation}
              transition={
                hasInteracted || shouldReduceMotion
                  ? { duration: 0.18, ease: "easeOut" }
                  : { duration: 1.8, times: [0, 0.55, 1], ease: "easeInOut" }
              }
            >
              <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/75 bg-slate-950/80 text-cyan-100 shadow-[0_0_28px_rgba(0,240,255,.24)] backdrop-blur-md">
                <span className="absolute inset-0 rounded-full bg-cyan-200/20 motion-safe:animate-ping" />
                <SlidersHorizontal
                  aria-hidden="true"
                  className="relative h-4 w-4"
                />
              </span>
            </motion.div>

            <span className="pointer-events-none absolute bottom-3 left-3 z-[3] rounded-full border border-white/15 bg-slate-950/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-md sm:bottom-4 sm:left-4">
              Original
            </span>
            <span className="pointer-events-none absolute bottom-3 right-3 z-[3] rounded-full border border-cyan-100/30 bg-cyan-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-950 sm:bottom-4 sm:right-4">
              AI Studio
            </span>

            <input
              aria-label="Compare the original selfie with the AI studio portrait"
              aria-valuetext={`${splitPosition}% original, ${100 - splitPosition}% AI Studio`}
              type="range"
              min="25"
              max="75"
              value={splitPosition}
              onChange={(event) =>
                updateSplitPosition(Number(event.currentTarget.value))
              }
              onPointerDown={() => setHasInteracted(true)}
              className="comparison-range absolute inset-0 z-[4] h-full w-full cursor-ew-resize opacity-0"
            />
          </div>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-slate-200">
                Choose a studio style
              </p>
              <span className="text-[10px] text-white/40">
                Tap to preview
              </span>
            </div>
            <div
              aria-label="Preview portrait styles"
              className="flex gap-2 overflow-x-auto pb-1"
            >
              {styles.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  aria-pressed={selectedStyle.id === style.id}
                  onClick={() => setSelectedStyle(style)}
                  className={`shrink-0 rounded-full border px-3 py-2 text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 ${
                    selectedStyle.id === style.id
                      ? "border-cyan-200/60 bg-cyan-200/10 text-cyan-100"
                      : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
      <motion.a
        href="#how-it-works"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.45 }}
        className="mx-auto mt-14 hidden w-fit items-center gap-2 text-xs text-slate-400 transition hover:text-cyan-100 md:flex"
      >
        A better profile photo, in three simple steps
        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
      </motion.a>
    </section>
  );
}
