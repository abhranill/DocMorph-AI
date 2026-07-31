import { Upload } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfText, setPdfText] = useState("");

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

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

      console.log(response.data);

      // Save extracted PDF text
      setPdfText(response.data.text);

      alert("✅ File uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Upload failed.");
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
          <div className="mt-4 rounded-lg bg-white p-4 shadow">
            <p className="font-semibold text-blue-700">
              📄 {file.name}
            </p>

            <p className="text-sm text-gray-500">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        {pdfText && (
          <div className="mt-6 rounded-xl bg-white p-5 shadow text-left">
            <h3 className="mb-3 text-lg font-bold text-blue-700">
              📄 Extracted Text
            </h3>

            <div className="max-h-80 overflow-y-auto rounded-lg border bg-gray-50 p-4">
              <p className="whitespace-pre-wrap text-gray-700">
                {pdfText}
              </p>
            </div>
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