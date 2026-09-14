import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { Hero } from "../components/Hero";
import UploadCard from "../components/UploadCard";
import { useHeadshot } from "../hooks/use-headshots";
import TransformationGrid from "../components/TransformationGrid";
import ResultPreview from "../components/ResultPreview";
import ExportActions from "../components/ExportActions";
import { Check } from "lucide-react";

export default function Home() {
  const headshot = useHeadshot();
  return (
    <div className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/55 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="#top" className="text-lg font-semibold tracking-tight">
            AI <span className="text-cyan-200">Headshot</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
            <a href="#upload" className="transition hover:text-cyan-200">Create</a>
            <a href="#styles" className="transition hover:text-cyan-200">Styles</a>
          </nav>
          <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-emerald-100">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
            Studio online
          </div>
        </div>
      </header>

      <main id="top">
        <Hero />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 px-4 pb-6 sm:grid-cols-3">
          {[
            ["01", "Upload", "One clear selfie"],
            ["02", "Direct", "Pick your visual lane"],
            ["03", "Export", "Ready for your profile"],
          ].map(([number, title, detail]) => (
            <div key={number} className="workflow-step flex items-center gap-3 border-t border-white/10 py-4">
              <span className="text-xs font-semibold text-cyan-200">{number}</span>
              <span className="font-medium text-white">{title}</span>
              <span className="text-sm text-white/40">{detail}</span>
            </div>
          ))}
        </div>

      <UploadCard
        uploadStatus={headshot.uploadStatus}
        uploadError={headshot.uploadError}
        onUploadError={headshot.handleUploadError}
        onUploadStart={headshot.handleUploadStart}
        onUploadSuccess={headshot.handleUploadSuccess}
      />

      {headshot.hasUpload && headshot.originalImage && (
        <section className="px-4 py-8">
          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-4 text-xl font-semibold">Original Upload</h2>
            <AdvancedImage
              cldImg={headshot.originalImage}
              plugins={[placeholder({ mode: "blur" }), lazyload()]}
              alt="Original Upload"
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
        <section className="px-4 pb-16 pt-2">
          <div className="mx-auto flex max-w-2xl items-center justify-center gap-2 text-center text-sm text-white/40">
            <Check className="h-4 w-4 text-cyan-200" />
            <span>Private by design · Your image is used only to create your preview</span>
          </div>
        </section>
      )}

      {headshot.hasUpload && (
        <ResultPreview
          originalImage={headshot.originalImage}
          selectedImage={headshot.selectedImage}
          selectedPreset={headshot.selectedPreset}
        />
      )}

      {headshot.hasUpload && headshot.publicId && headshot.selectedPreset && (
        <ExportActions
          publicId={headshot.publicId}
          selectedPreset={headshot.selectedPreset}
        />
      )}
      </main>
    </div>
  );
}