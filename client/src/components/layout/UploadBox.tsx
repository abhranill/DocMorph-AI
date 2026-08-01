import { Upload, FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    setLoading(true);
    setSummary("");
    setText("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setText(response.data.text);
      setSummary(response.data.summary);

      alert("✅ AI Summary Generated!");
    } catch (error) {
      console.error(error);
      alert("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
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
          <div className="mt-6 rounded-xl bg-white p-4 shadow">
            <h3 className="font-semibold text-blue-700">
              📄 {file.name}
            </h3>

            <p className="text-gray-500">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        {loading && (
          <div className="mt-6">
            <p className="font-semibold text-blue-700 animate-pulse">
              🤖 Gemini is analyzing your document...
            </p>
          </div>
        )}

        {summary && (
          <div className="mt-8 rounded-xl bg-white p-6 shadow text-left">
            <h3 className="flex items-center gap-2 text-xl font-bold text-blue-700">
              <Sparkles size={22} />
              AI Summary
            </h3>

            <p className="mt-4 whitespace-pre-wrap text-gray-700">
              {summary}
            </p>
          </div>
        )}

        {text && (
          <div className="mt-8 rounded-xl bg-white p-6 shadow text-left">
            <h3 className="flex items-center gap-2 text-xl font-bold text-blue-700">
              <FileText size={22} />
              Extracted Text
            </h3>

            <textarea
              className="mt-4 h-64 w-full rounded-lg border p-4"
              value={text}
              readOnly
            />
          </div>
        )}

        <button
          type="button"
          className="mt-8 rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
        >
          Browse Files
        </button>
      </div>
    </div>
  );
}

export default UploadBox;