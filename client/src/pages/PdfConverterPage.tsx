import { useState } from "react";
import {
  ArrowLeft,
  FileText,
  Upload,
  Download,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  convertPdfToImage,
  convertImageToPdf,
} from "../services/converter.service";

function PdfConverterPage() {
  const [conversion, setConversion] = useState("pdf-to-jpg");
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);

  const handleConvert = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      setConverting(true);

      let blob: Blob;

      if (conversion === "pdf-to-jpg") {
        blob = await convertPdfToImage(file);
      } else {
        blob = await convertImageToPdf(file);
      }

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download =
        conversion === "pdf-to-jpg"
          ? "converted.zip"
          : "converted.pdf";

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
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Back */}

        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow hover:bg-blue-50"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Header */}

        <div className="mb-10 text-center">
          <div className="mb-5 flex justify-center">
            <div className="rounded-full bg-red-100 p-5">
              <FileText
                size={45}
                className="text-red-600"
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold">
            PDF Converter
          </h1>

          <p className="mt-3 text-gray-600">
            Convert PDF documents into JPG images
            or create PDF files from JPG images.
          </p>
        </div>

        {/* Card */}

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          {/* Converter */}

          <div className="mb-8">
            <label className="mb-3 block text-lg font-semibold">
              Conversion Type
            </label>

            <select
              value={conversion}
              onChange={(e) =>
                setConversion(e.target.value)
              }
              className="w-full rounded-xl border p-4 outline-none focus:border-blue-500"
            >
              <option value="pdf-to-jpg">
                PDF → JPG
              </option>

              <option value="jpg-to-pdf">
                JPG → PDF
              </option>
            </select>
          </div>

          {/* Upload */}

          <label className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-12 transition hover:border-blue-600">
            <Upload
              size={60}
              className="mb-5 text-blue-600"
            />

            <h2 className="text-2xl font-bold">
              Upload Your File
            </h2>

            <p className="mt-3 text-gray-500">
              Click here or drag & drop
            </p>

            <input
              hidden
              type="file"
              accept={
                conversion === "pdf-to-jpg"
                  ? ".pdf"
                  : ".jpg,.jpeg"
              }
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </label>

          {/* Selected */}

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

          {/* Convert */}

          <button
            onClick={handleConvert}
            disabled={!file || converting}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
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
              "Convert Now"
            )}
          </button>

          {/* Download */}

          <div className="mt-8 rounded-xl border-2 border-dashed p-8 text-center">
            <Download
              size={45}
              className="mx-auto mb-4 text-gray-400"
            />

            <h3 className="text-lg font-semibold">
              Download Area
            </h3>

            <p className="mt-2 text-gray-500">
              Your converted file will download
              automatically after conversion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfConverterPage;