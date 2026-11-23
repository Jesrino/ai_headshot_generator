import { useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Aperture,
  BadgeCheck,
  Camera,
  Check,
  ChevronDown,
  Download,
  LockKeyhole,
  Palette,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { Hero } from "../components/Hero";
import UploadCard from "../components/UploadCard";
import { useHeadshot } from "../hooks/use-headshots";
import TransformationGrid from "../components/TransformationGrid";
import ResultPreview from "../components/ResultPreview";
import ExportActions from "../components/ExportActions";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const steps = [
  {
    number: "01",
    title: "Upload 1 Selfie",
    description:
      "Choose one clear, well-lit photo. No photoshoot or special equipment needed.",
    Icon: Upload,
  },
  {
    number: "02",
    title: "Choose Your Aesthetic",
    description:
      "Explore polished looks, from modern founder to timeless corporate.",
    Icon: Palette,
  },
  {
    number: "03",
    title: "Download 4K Portraits",
    description:
      "Preview your result and download the portrait when it feels right.",
    Icon: Download,
  },
];

const gallery = [
  {
    title: "The Modern Executive",
    tag: "Corporate",
    image: "photo-1500648767791-00dcc994a43e",
    position: "50% 35%",
  },
  {
    title: "The Creative Lead",
    tag: "Editorial",
    image: "photo-1534528741775-53994a69daeb",
    position: "50% 35%",
  },
  {
    title: "The Founder",
    tag: "Tech",
    image: "photo-1506794778202-cad84cf45f1d",
    position: "50% 32%",
  },
  {
    title: "The Studio Classic",
    tag: "Neutral",
    image: "photo-1494790108377-be9c29b29330",
    position: "50% 38%",
  },
];

const faqs = [
  {
    question: "Are my photos encrypted?",
    answer:
      "Uploads use HTTPS encryption in transit. At-rest encryption and access controls depend on the configured Cloudinary account; this app does not set those policies itself.",
  },
  {
    question: "Where are my photos stored?",
    answer:
      "Photos are sent over HTTPS to the Cloudinary account configured for this app. Storage and retention are governed by that account's settings and upload preset.",
  },
  {
    question: "Are photos automatically deleted?",
    answer:
      "This app does not currently configure a fixed automatic-deletion timer. If you operate this app, set and verify an appropriate retention policy in Cloudinary before promising a deletion window.",
  },
  {
    question: "Can I use a portrait commercially?",
    answer:
      "This app does not define or grant commercial-use rights. Review the terms that apply to the image service and your jurisdiction before using generated or transformed portraits commercially.",
  },
  {
    question: "What kind of selfie works best?",
    answer:
      "Use a recent, front-facing photo with your face in focus and even lighting. Avoid heavy filters, sunglasses, and group photos for the clearest result.",
  },
];

function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 40 40"
    >
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="12"
        fill="url(#angleform-gradient)"
        fillOpacity=".12"
        stroke="rgba(136,246,255,.3)"
      />
      <path
        d="M20 7.5 31.7 14.25v11.5L20 32.5 8.3 25.75v-11.5L20 7.5Z"
        stroke="#8AF5FF"
        strokeWidth="1.5"
      />
      <path
        d="m20 12.4 7.45 4.3v6.6L20 27.6l-7.45-4.3v-6.6L20 12.4Z"
        fill="#8AF5FF"
        fillOpacity=".14"
        stroke="#D7FCFF"
        strokeWidth="1.5"
      />
      <circle cx="20" cy="20" r="3.15" fill="#B7FAFF" />
      <defs>
        <linearGradient
          id="angleform-gradient"
          x1="4"
          x2="37"
          y1="4"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#52F3FF" />
          <stop offset="1" stopColor="#258DFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/75">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function FAQAccordion() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/[0.08] border-y border-white/[0.08]">
      {faqs.map((faq, index) => {
        const isOpen = openQuestion === index;
        const answerId = `faq-answer-${index}`;
        return (
          <div key={faq.question}>
            <h3>
              <button
                type="button"
                id={`faq-question-${index}`}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() =>
                  setOpenQuestion(isOpen ? null : index)
                }
                className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-medium text-slate-100 transition hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:text-base"
              >
                {faq.question}
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 shrink-0 text-cyan-200 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={answerId}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-5 pr-8 text-sm leading-7 text-slate-400">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const headshot = useHeadshot();

  return (
    <div className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#060B10]/85 px-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3">
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 rounded-md text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
            aria-label="Angleform Studio home"
          >
            <BrandMark className="h-9 w-9" />
            <span className="text-[15px] font-semibold tracking-[-0.03em]">
              angleform<span className="text-cyan-200">.</span>
            </span>
          </a>

          <nav
            aria-label="Main navigation"
            className="order-3 flex w-full items-center gap-5 overflow-x-auto pb-1 text-xs text-slate-300 md:order-none md:w-auto md:gap-6 md:pb-0 md:text-sm"
          >
            <a href="#examples" className="nav-link">Examples</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#upload" className="nav-link">Pricing</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>

          <span className="hidden items-center gap-2 text-[11px] text-slate-400 xl:inline-flex">
            <ShieldCheck
              aria-hidden="true"
              className="h-3.5 w-3.5 text-emerald-300"
            />
            Private upload · HTTPS transfer
          </span>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              disabled
              title="Sign in is not available yet"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-70 sm:inline-flex"
            >
              Sign In
            </button>
            <a
              href="#upload"
              className="rounded-lg border border-cyan-100/25 bg-cyan-300 px-3.5 py-2.5 text-xs font-semibold text-slate-950 shadow-[0_0_22px_rgba(0,240,255,.12)] transition hover:bg-cyan-200 sm:px-4 sm:text-sm"
            >
              Create portraits
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <Hero />

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={reveal}
          aria-label="Studio highlights"
          className="border-y border-white/[0.06] bg-white/[0.018] px-4 py-6"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              {
                Icon: ShieldCheck,
                title: "HTTPS transfer",
                detail: "Photos sent securely",
              },
              {
                Icon: Camera,
                title: "One selfie",
                detail: "No studio session needed",
              },
              {
                Icon: BadgeCheck,
                title: "20+ styles",
                detail: "A look for every introduction",
              },
            ].map(({ Icon, title, detail }) => (
              <div
                key={title}
                className="flex items-center justify-center gap-3 py-4 sm:px-5 sm:py-2"
              >
                <Icon
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-cyan-200"
                />
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-slate-200">
                    {title}
                  </span>
                  <span className="hidden text-xs text-slate-500 lg:inline">
                    {detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="how-it-works"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={reveal}
          className="scroll-mt-24 px-4 py-20 sm:py-24"
        >
          <SectionHeading
            eyebrow="A better photo, made simple"
            title="Three steps to your new headshot"
            description="No awkward studio session. Just a photo you already have and a few minutes to find your look."
          />
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            {steps.map(({ number, title, description, Icon }) => (
              <article
                key={number}
                className="workflow-card group relative rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-7"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.18em] text-cyan-200">
                    STEP {number}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-200/15 bg-cyan-200/[0.06] text-cyan-100 transition group-hover:border-cyan-200/35 group-hover:bg-cyan-200/10">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="examples"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={reveal}
          className="scroll-mt-24 border-y border-white/[0.06] bg-white/[0.018] px-4 py-20 sm:py-24"
        >
          <SectionHeading
            eyebrow="Find your point of view"
            title="A style for every next step"
            description="Explore a few starting points for the portrait you want to put forward."
          />
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((item) => (
              <a
                key={item.title}
                href="#upload"
                className="gallery-card group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=750&h=940&q=85`}
                    alt={`${item.tag} style portrait example`}
                    width="750"
                    height="940"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
                    style={{ objectPosition: item.position }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <span className="mt-2 inline-flex rounded-full border border-white/20 bg-slate-950/45 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-100 backdrop-blur-sm">
                      {item.tag}
                    </span>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 transition duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={reveal}
          className="scroll-mt-24 px-4 py-16 sm:py-20"
        >
          <div className="mx-auto mb-8 flex max-w-4xl flex-col items-center text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-200/[0.05] px-3 py-1.5 text-xs text-cyan-100">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              Your next introduction starts here
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Create a portrait that feels like you
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Upload one photo to explore your styles. No account required to
              get started.
            </p>
          </div>
          <UploadCard
            uploadStatus={headshot.uploadStatus}
            uploadError={headshot.uploadError}
            onUploadError={headshot.handleUploadError}
            onUploadStart={headshot.handleUploadStart}
            onUploadSuccess={headshot.handleUploadSuccess}
          />
        </motion.section>

        {headshot.hasUpload && headshot.originalImage && (
          <section className="px-4 py-8">
            <div className="mx-auto max-w-md text-center">
              <h2 className="mb-4 text-xl font-semibold">Original Upload</h2>
              <AdvancedImage
                cldImg={headshot.originalImage}
                plugins={[placeholder({ mode: "blur" }), lazyload()]}
                alt="Original uploaded photo"
                className="mx-auto rounded-xl shadow-lg"
              />
            </div>
          </section>
        )}

        {headshot.hasUpload && (
          <TransformationGrid
            id="styles"
            title="AI Headshot Styles"
            presets={headshot.presetImages}
            selectedPresetId={headshot.selectedPresetId}
            onSelect={headshot.selectPreset}
          />
        )}

        {!headshot.hasUpload && (
          <div className="px-4 pb-8">
            <p className="mx-auto flex max-w-2xl items-center justify-center gap-2 text-center text-xs text-slate-500">
              <Check
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-cyan-200"
              />
              Private upload flow · No account required
            </p>
          </div>
        )}

        {headshot.hasUpload && (
          <ResultPreview
            originalImage={headshot.originalImage}
            selectedImage={headshot.selectedImage}
            selectedPreset={headshot.selectedPreset}
          />
        )}

        {headshot.hasUpload &&
          headshot.publicId &&
          headshot.selectedPreset && (
            <ExportActions
              publicId={headshot.publicId}
              selectedPreset={headshot.selectedPreset}
            />
          )}

        <motion.section
          id="privacy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          className="scroll-mt-24 border-y border-white/[0.06] bg-[radial-gradient(ellipse_at_15%_50%,rgba(0,204,220,.08),transparent_38rem)] px-4 py-20 sm:py-24"
        >
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div>
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.06] text-cyan-100">
                <LockKeyhole aria-hidden="true" className="h-5 w-5" />
              </span>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/75">
                Privacy, without the guesswork
              </p>
              <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Your photo deserves clear answers.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
                We keep the upload experience simple and the data handling
                details honest. Here is what this app does—and what it does not
                promise.
              </p>
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300"
                />
                <p className="text-xs leading-6 text-slate-300">
                  Photos are transmitted to the configured Cloudinary account
                  over HTTPS. This project does not configure a fixed
                  auto-deletion schedule or grant commercial-use rights.
                </p>
              </div>
            </div>

            <div id="faq" className="scroll-mt-24">
              <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                <Aperture aria-hidden="true" className="h-4 w-4 text-cyan-200" />
                Frequently asked
              </div>
              <FAQAccordion />
            </div>
          </div>
        </motion.section>
      </main>

      <footer id="footer" className="border-t border-white/[0.07] bg-[#05090D] px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:gap-8 lg:py-16">
            <div className="max-w-xs">
              <a href="#top" className="inline-flex items-center gap-2.5">
                <BrandMark className="h-9 w-9" />
                <span className="text-[15px] font-semibold tracking-[-0.03em] text-white">
                  angleform<span className="text-cyan-200">.</span>
                </span>
              </a>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Studio-inspired portraits for the moments that move you
                forward.
              </p>
              <div className="mt-5 flex gap-2">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-2.5 text-xs text-slate-400 transition hover:border-cyan-200/30 hover:text-cyan-100"
                >
                  LinkedIn
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-2.5 text-xs text-slate-400 transition hover:border-cyan-200/30 hover:text-cyan-100"
                >
                  Instagram
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div>
              <h2 className="footer-heading">Product</h2>
              <ul className="footer-links">
                <li><a href="#how-it-works">How it works</a></li>
                <li><a href="#examples">Examples</a></li>
                <li><a href="#upload">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h2 className="footer-heading">Styles</h2>
              <ul className="footer-links">
                <li><a href="#examples">Corporate</a></li>
                <li><a href="#examples">Tech founder</a></li>
                <li><a href="#examples">Editorial</a></li>
              </ul>
            </div>
            <div>
              <h2 className="footer-heading">Legal &amp; Privacy</h2>
              <ul className="footer-links">
                <li><a href="#privacy">Privacy details</a></li>
                <li><a href="#faq">Photo retention</a></li>
                <li><a href="#faq">Usage rights</a></li>
              </ul>
            </div>
            <div>
              <h2 className="footer-heading">Support</h2>
              <ul className="footer-links">
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#upload">Get started</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/[0.07] py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Angleform Studio. All rights reserved.</p>
            <p className="flex items-start gap-2 sm:max-w-md sm:text-right">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-200/70"
              />
              HTTPS transfer; storage retention follows the configured
              Cloudinary account.
            </p>
            <span className="inline-flex items-center gap-2 text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,.55)]" />
              All Systems Operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
