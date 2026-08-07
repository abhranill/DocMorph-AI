import { useState } from "react";
import {
  FileText,
  Upload,
  Loader2,
} from "lucide-react";

import ConverterLayout from "./ConverterLayout";
import { convertFile } from "../../services/converter.service";

function WordConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);

  const handleConvert = async () => {
    if (!file) {
      alert("Please select a Word file.");
      return;
    }

    try {
      setConverting(true);

      const blob = await convertFile(file, "word-pdf");

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = file.name.replace(/\.(doc|docx)$/i, ".pdf");

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Conversion failed.");
    } finally {
      setConverting(false);
    }
  };

  return (
    <ConverterLayout
      title="Word Converter"
      description="Convert DOC and DOCX files into PDF."
      icon={<FileText size={45} className="text-blue-600" />}
    >
      <div className="space-y-8">

        <label className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-12 hover:border-blue-600">

          <Upload
            size={60}
            className="mb-5 text-blue-600"
          />

          <h2 className="text-2xl font-bold">
            Upload Word File
          </h2>

          <p className="mt-3 text-gray-500">
            DOC or DOCX
          </p>

          <input
            hidden
            type="file"
            accept=".doc,.docx"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />

        </label>

        {file && (
          <div className="rounded-xl bg-gray-100 p-5">

            <h3 className="font-semibold">
              Selected File
            </h3>

            <p className="mt-2 text-blue-700">
              {file.name}
            </p>

            <p className="text-gray-500">
              {(file.size / 1024).toFixed(2)} KB
            </p>

          </div>
        )}

        <button
          onClick={handleConvert}
          disabled={!file || converting}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {converting ? (
            <>
              <Loader2
                size={20}
                className="animate-spin"
              />
              Converting...
            </>
          ) : (
            "Convert to PDF"
          )}
        </button>

      </div>
    </ConverterLayout>
  );
}

export default WordConverter;