import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ConverterCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  route: string;
  color: string;
}

function ConverterCard({
  title,
  description,
  icon,
  route,
  color,
}: ConverterCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      className="group cursor-pointer rounded-3xl border bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Icon */}

      <div
        className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${color}`}
      >
        {icon}
      </div>

      {/* Title */}

      <h3 className="text-2xl font-bold text-gray-800">
        {title}
      </h3>

      {/* Description */}

      <p className="mt-3 text-gray-600 leading-7">
        {description}
      </p>

      {/* Button */}

      <button
        className="mt-8 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition group-hover:bg-blue-700"
      >
        Open Tool

        <ArrowRight
          size={18}
          className="transition group-hover:translate-x-1"
        />
      </button>
    </div>
  );
}

export default ConverterCard;