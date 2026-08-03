import { useNavigate } from "react-router-dom";

function ConverterHub() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto mt-24 max-w-6xl px-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          🔄 File Converter
        </h2>

        <p className="mt-3 text-gray-600">
          Convert images, PDFs and documents in seconds.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">

        <div
          onClick={() => navigate("/image-converter")}
          className="cursor-pointer rounded-2xl border bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-xl"
        >
          <h3 className="text-2xl font-semibold text-blue-700">
            🖼 Image Converter
          </h3>

          <p className="mt-3 text-gray-600">
            JPG ↔ PNG ↔ WEBP
          </p>
        </div>

        <div
          onClick={() => navigate("/pdf-converter")}
          className="cursor-pointer rounded-2xl border bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-xl"
        >
          <h3 className="text-2xl font-semibold text-red-600">
            📄 PDF Converter
          </h3>

          <p className="mt-3 text-gray-600">
            PDF → JPG
            <br />
            JPG → PDF
          </p>
        </div>

        <div
          onClick={() => navigate("/word-converter")}
          className="cursor-pointer rounded-2xl border bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-xl"
        >
          <h3 className="text-2xl font-semibold text-green-700">
            📝 Word Converter
          </h3>

          <p className="mt-3 text-gray-600">
            Word → PDF
            <br />
            PDF → Word
          </p>
        </div>

      </div>
    </section>
  );
}

export default ConverterHub;