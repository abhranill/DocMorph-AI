import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ConverterLayoutProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}

function ConverterLayout({
  title,
  description,
  icon,
  children,
}: ConverterLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Back Button */}

        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow transition hover:bg-blue-50"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Header */}

        <div className="mb-10 text-center">

          <div className="mb-5 flex justify-center">

            <div className="rounded-full bg-blue-100 p-5">

              {icon}

            </div>

          </div>

          <h1 className="text-4xl font-bold text-gray-800">
            {title}
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            {description}
          </p>

        </div>

        {/* Main Card */}

        <div className="rounded-3xl bg-white p-8 shadow-xl">

          {children}

        </div>

      </div>

    </div>
  );
}

export default ConverterLayout;