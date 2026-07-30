import { Upload } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

function UploadBox() {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      console.log(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="mt-16 flex justify-center">
      <div
        {...getRootProps()}
        className={`w-full max-w-3xl rounded-3xl border-2 border-dashed p-12 text-center cursor-pointer transition
        ${
          isDragActive
            ? "border-blue-600 bg-blue-100"
            : "border-blue-300 bg-blue-50 hover:border-blue-500 hover:bg-blue-100"
        }`}
      >
        <input {...getInputProps()} />

        <Upload
          size={60}
          className="mx-auto mb-6 text-blue-600"
        />

        <h2 className="text-2xl font-semibold">
          {isDragActive
            ? "Drop your file here"
            : "Drag & Drop Your Document"}
        </h2>

        <p className="mt-3 text-gray-600">
          PDF, DOCX, PPTX, TXT, XLSX and more
        </p>

        {file && (
          <div className="mt-4 rounded-lg bg-white p-3 shadow">
            <p className="font-semibold text-blue-700">
              📄 {file.name}
            </p>
            <p className="text-sm text-gray-500">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        <button
          type="button"
          className="mt-8 rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 transition"
        >
          Browse Files
        </button>
      </div>
    </div>
  );
}

export default UploadBox;