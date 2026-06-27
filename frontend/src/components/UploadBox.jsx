import { useRef, useState } from "react";

function UploadBox({
  onFileSelect,
  accept = ".pdf",
  label = "Upload your resume",
  hint = "PDF files only, up to 10 MB",
  disabled = false,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFile = (file) => {
    if (!file || disabled) return;
    setSelectedFile(file);
    onFileSelect?.(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  };

  return (
    <div
      className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
        isDragging
          ? "border-purple-400 bg-purple-500/10"
          : "border-slate-600 bg-slate-800/40"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:border-purple-500/60"}`}
      onClick={() => !disabled && inputRef.current?.click()}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        disabled={disabled}
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-7 w-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 4.5 4.5 0 0 1 4.918 4.918 5.25 5.25 0 0 1-2.33 10.233A4.502 4.502 0 0 1 6.75 19.5Z"
          />
        </svg>
      </div>

      <p className="text-base font-medium text-white">{label}</p>
      <p className="mt-2 text-sm text-slate-400">
        Drag and drop or click to browse
      </p>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>

      {selectedFile && (
        <p className="mt-4 truncate text-sm text-purple-300">
          Selected: {selectedFile.name}
        </p>
      )}
    </div>
  );
}

export default UploadBox;
