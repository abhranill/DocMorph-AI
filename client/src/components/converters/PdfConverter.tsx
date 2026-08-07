import { useState } from "react";
import {
  FileText,
  Upload,
  Download,
  Loader2,
} from "lucide-react";

import ConverterLayout from "./ConverterLayout";
import { convertFile } from "../../services/converter.service";

function PdfConverter() {
  const [conversion, setConversion] =
    useState("pdf-to-jpg");

  const [file, setFile] =
    useState<File | null>(null);

  const [converting, setConverting] =
    useState(false);

  const handleConvert = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      setConverting(true);

      const backendConversion =
        conversion === "pdf-to-jpg"
          ? "pdf-jpg"
          : "image-pdf";

      const blob = await convertFile(
        file,
        backendConversion
      );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

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
    <ConverterLayout
      title="PDF Converter"
      description="Convert PDF documents into images or create PDF files from images."
      icon={
        <FileText
          size={45}
          className="text-red-600"
        />
      }
    >
      <div className="space-y-8">

        {/* Conversion */}

        <div>

          <label className="mb-3 block font-semibold">

            Conversion Type

          </label>

          <select
            value={conversion}
            onChange={(e) =>
              setConversion(e.target.value)
            }
            className="w-full rounded-xl border p-4"
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

        <label className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-12 hover:border-blue-600">

          <Upload
            size={60}
            className="mb-5 text-blue-600"
          />

          <h2 className="text-2xl font-bold">

            Upload File

          </h2>

          <p className="mt-2 text-gray-500">

            Click here or Drag & Drop

          </p>

          <input
            hidden
            type="file"
            accept={
              conversion === "pdf-to-jpg"
                ? ".pdf"
                : ".jpg,.jpeg,.png"
            }
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
            "Convert Now"
          )}
        </button>

        <div className="rounded-xl border-2 border-dashed p-8 text-center">

          <Download
            size={42}
            className="mx-auto mb-4 text-gray-400"
          />

          <p className="text-gray-500">

            Converted files will download automatically.

          </p>

        </div>

      </div>
    </ConverterLayout>
  );
}

export default PdfConverter;