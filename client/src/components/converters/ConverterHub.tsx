import {
  FileImage,
  FileText,
  FileType,
} from "lucide-react";

import ConverterCard from "./ConverterCard";

function ConverterHub() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-6">

      <div className="text-center">

        <h2 className="text-4xl font-bold text-gray-800">
          File Converter Hub
        </h2>

        <p className="mt-4 text-lg text-gray-600">
          Convert documents, PDFs and images with one click.
        </p>

      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        <ConverterCard
          title="Image Converter"
          description="Convert JPG, PNG, JPEG and WEBP images."
          route="/image-converter"
          color="bg-blue-100"
          icon={
            <FileImage
              size={42}
              className="text-blue-600"
            />
          }
        />

        <ConverterCard
          title="PDF Converter"
          description="Convert PDF ↔ JPG files."
          route="/pdf-converter"
          color="bg-red-100"
          icon={
            <FileText
              size={42}
              className="text-red-600"
            />
          }
        />

        <ConverterCard
          title="Word Converter"
          description="Convert DOCX ↔ PDF documents."
          route="/word-converter"
          color="bg-green-100"
          icon={
            <FileType
              size={42}
              className="text-green-600"
            />
          }
        />

      </div>

    </section>
  );
}

export default ConverterHub;