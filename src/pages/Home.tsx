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
      <header className="border-b border-white/10 px-4 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="#top" className="text-lg font-semibold tracking-tight">
            AI <span className="text-cyan-200">Headshot</span>
          </a>
          <div className="hidden items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/40 sm:flex">
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