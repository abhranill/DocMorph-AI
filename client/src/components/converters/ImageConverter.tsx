import { Image, ArrowRightLeft, Download } from "lucide-react";
import { useState } from "react";
import axios from "axios";

function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState("png");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleConvert = async () => {
    if (!file) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", format);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/convert",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setDownloadUrl(response.data.downloadUrl);
    } catch (err) {
      console.error(err);
      alert("Conversion failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">

      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-blue-700">
          🔄 Image Converter
        </h2>

        <p className="mt-3 text-gray-600">
          Convert JPG, PNG and WEBP instantly.
        </p>
      </div>

      <div className="rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-8 text-center">

        <Image
          size={60}
          className="mx-auto mb-5 text-blue-600"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />

        {file && (
          <div className="mt-6 rounded-xl bg-white p-4 shadow">

            <p className="font-semibold text-blue-700">
              {file.name}
            </p>

            <p className="text-gray-500">
              {(file.size / 1024).toFixed(2)} KB
            </p>

          </div>
        )}

      </div>

      <div className="mt-10 flex items-center justify-center gap-6">

        <div>

          <p className="mb-2 font-semibold">
            From
          </p>

          <input
            disabled
            value={
              file
                ? file.name.split(".").pop()?.toUpperCase()
                : "Auto"
            }
            className="rounded-xl border bg-gray-100 p-3 w-32 text-center"
          />

        </div>

        <ArrowRightLeft
          size={32}
          className="mt-7 text-blue-600"
        />

        <div>

          <p className="mb-2 font-semibold">
            To
          </p>

          <select
            value={format}
            onChange={(e) =>
              setFormat(e.target.value)
            }
            className="rounded-xl border p-3 w-40"
          >
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="webp">WEBP</option>
          </select>

        </div>

      </div>

      <button
        onClick={handleConvert}
        disabled={loading}
        className="mt-10 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
      >
        {loading
          ? "Converting..."
          : "Convert Image"}
      </button>

      {downloadUrl && (
        <a
          href={downloadUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-green-600 py-4 text-lg font-semibold text-white hover:bg-green-700"
        >
          <Download size={22} />
          Download Converted Image
        </a>
      )}

    </div>
  );
}

export default ImageConverter;