import { useState, useRef } from "react";
import { Upload, XCircle, FileText } from "lucide-react";

const FileUploadZone = ({ label, accept = ".pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png", disabled = false }) => {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...Array.from(newFiles)]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (!disabled && e.dataTransfer.files.length) {
      addFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className={disabled ? "opacity-40 pointer-events-none" : ""}>
      <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center border-2 border-dashed p-6 cursor-pointer transition-colors ${
          dragOver ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
        }`}
      >
        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
        <span className="text-sm text-muted-foreground">
          Drag & drop or click to select files
        </span>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          onChange={(e) => e.target.files && addFiles(e.target.files)}
          className="hidden"
        />
      </div>
      {files.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between text-sm text-foreground bg-secondary px-3 py-2">
              <span className="flex items-center gap-2 truncate">
                <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                {f.name}
              </span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                className="text-muted-foreground hover:text-destructive transition-colors ml-2"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {disabled && (
        <p className="text-xs text-muted-foreground mt-2 italic">
          Complete payment to enable file upload.
        </p>
      )}
    </div>
  );
};

export default FileUploadZone;
