import { AlertCircle, FileImage, FileType2, ImageIcon, ShieldCheck } from "lucide-react";
import type { UploadStatus } from "../types";
import { useDropzone } from "react-dropzone";
import { cn } from "../lib/utils";
import { useState } from "react";
import { uploadImageToCloudinary } from "../cloudinary/upload-direct";
import {
  UploadWidget,
  type CloudinaryUploadResult,
} from "../cloudinary/UploadWidget";

const ACCEPT = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

interface UploadCardProps {
  uploadStatus: UploadStatus;
  uploadError: string | null;
  onUploadError: (error: Error) => void;
  onUploadStart: () => void;
  onUploadSuccess: (result: CloudinaryUploadResult) => void;
}
export default function UploadCard({
  uploadStatus,
  uploadError,
  onUploadError,
  onUploadStart,
  onUploadSuccess,
}: UploadCardProps) {
  const [progress, setProgress] = useState(0);
  const uploadFile = async (file: File) => {
    onUploadStart();
    setProgress(0);
    try {
      const result = await uploadImageToCloudinary(file, setProgress);
      onUploadSuccess(result);
    } catch {
      onUploadError(new Error("Upload failed."));
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      onUploadError(new Error("Please upload a JPG, PNG, or WEBP image."));
      return;
    }

    uploadFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPT,
    maxFiles: 1,
    multiple: false,
    disabled: uploadStatus === "uploading",
  });

  const isUploading = uploadStatus === "uploading";

  return (
    <section id="upload" className="px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-center text-2xl font-semibold">
          Upload Your Selfie
        </h2>
        <p className="mb-8 text-center text-white/60">
          Drag, drop, or click to upload your photo
        </p>

        <div
          {...getRootProps()}
          className={cn(
            "glass-card relative flex cursor-pointer flex-col items-center gap-6 border-dashed p-10 transition duration-300 hover:scale-[1.02] hover:border-cyan-500/50 hover:bg-white/[0.08] md:p-14",
            isDragActive && "border-cyan-300/70 bg-cyan-300/10",
            isUploading && "pointer-events-none opacity-80",
          )}
        >
          <input {...getInputProps()} />
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400">
            <ImageIcon className="h-10 w-10" />
          </div>

          <div className="text-center">
            <p className="text-lg font-medium">Drag & drop your selfie</p>
            <p className="mt-1 text-sm text-slate-200">
              or click to browse
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-200">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5"><FileImage className="h-3.5 w-3.5 text-cyan-200" /> JPG</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5"><FileType2 className="h-3.5 w-3.5 text-cyan-200" /> PNG</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5"><FileImage className="h-3.5 w-3.5 text-cyan-200" /> WEBP</span>
            <span className="text-white/45">up to 25MB</span>
          </div>

          {isUploading && (
            <div className="w-full max-w-xs text-center">
              <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-cyan-300 transition-all"
                  style={{ width: `${Math.max(progress, 8)}%` }}
                />
              </div>
              <p className="text-sm text-white/60">Uploading... {progress > 0 ? `${progress}%` : ""}</p>
            </div>
          )}

          <div
            className="flex items-center gap-3"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <UploadWidget
              onUploadSuccess={onUploadSuccess}
              onUploadError={onUploadError}
              buttonText="Browse files"
              className={cn(
                "inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-6 py-3 font-medium text-slate-950 shadow-[0_0_24px_rgba(0,240,255,0.18)]",
                "transition hover:bg-cyan-200 disabled:cursor-wait disabled:opacity-70",
              )}
            />
          </div>

          {uploadError && (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {uploadError}
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-white/45"><ShieldCheck className="h-3.5 w-3.5 text-emerald-300" /> Private upload · no account required</div>
        </div>
      </div>
    </section>
  );
}