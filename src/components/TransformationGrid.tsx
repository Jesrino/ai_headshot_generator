import type { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import type { HeadshotPreset } from "../types";
import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { cn } from "../lib/utils";
import { Check } from "lucide-react";

interface PresetImage {
  preset: HeadshotPreset;
  image: CloudinaryImage;
}

interface TransformationGridProps {
  title: string;
  presets: PresetImage[];
  selectedPresetId: string | null;
  onSelect: (id: string) => void;
}

function PresetCard({
  preset,
  image,
  isSelected,
  onSelect,
}: {
  preset: HeadshotPreset;
  image: CloudinaryImage;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button className="group text-left" onClick={onSelect} type="button">
      <div
        className={cn(
          "relative aspect-[4/5] w-full overflow-hidden rounded-xl border bg-black/30 transition duration-300 group-hover:-translate-y-1 group-hover:border-cyan-200/40",
          isSelected ? "border-cyan-300 ring-2 ring-cyan-300/20" : "border-white/10",
        )}
      >
        <AdvancedImage
          cldImg={image}
          plugins={[placeholder({ mode: "blur" }), lazyload()]}
          alt={preset.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {isSelected && (
          <div className="absolute right-2 top-2 rounded-full bg-indigo-600 p-1">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-center justify-between gap-3">
          <h4 className="font-semibold">{preset.name}</h4>
          <span className="text-[10px] uppercase tracking-[0.16em] text-cyan-200/70">AI edit</span>
        </div>
        <p className="mt-1 text-xs text-white/50">{preset.description}</p>
      </div>
    </button>
  );
}

export default function TransformationGrid({
  title,
  presets,
  onSelect,
  selectedPresetId,
}: TransformationGridProps) {
  if (presets.length === 0) return null;

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-2 text-center text-2xl font-semibold">{title}</h2>
        <p className="mb-8 text-center text-sm text-white/50">
          Outfit swap · Background replace · Optimized for web
        </p>
        <p className="mb-6 text-center text-xs text-amber-400/70">
          Styles generate one at a time (~30–60s each).
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {presets.map(({ preset, image }) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              image={image}
              isSelected={selectedPresetId === preset.id}
              onSelect={() => onSelect(preset.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}