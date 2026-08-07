import { useState } from "react";
import {
  ArrowLeft,
  FileText,
  Upload,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { convertFile } from "../services/converter.service";

function WordConverterPage() {
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

      const a = document.createElement("a");

      a.href = url;
      a.download = file.name.replace(/\.(doc|docx)$/i, ".pdf");

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Conversion failed.");
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-10">

        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow hover:bg-blue-50"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="mb-10 text-center">
          <div className="mb-5 flex justify-center">
            <div className="rounded-full bg-blue-100 p-5">
              <FileText
                size={45}
                className="text-blue-600"
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold">
            Word to PDF
          </h1>

          <p className="mt-3 text-gray-600">
            Convert DOC and DOCX files into PDF.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl">

          <label className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-12 transition hover:border-blue-600">

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
            <div className="mt-8 rounded-xl bg-slate-100 p-5">
              <h3 className="font-bold">
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
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
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

      </div>
    </div>
  );
}

export default WordConverterPage;