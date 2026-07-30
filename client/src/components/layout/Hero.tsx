import Button from "../ui/Button";

function Hero() {
  return (
    <section className="min-h-[85vh] flex items-center justify-center px-8">
      <div className="max-w-5xl text-center">

        <h1 className="text-6xl font-bold leading-tight">
          Convert Any
          <span className="text-blue-600"> Document </span>
          with AI
        </h1>

        <p className="mt-6 text-xl text-gray-600">
          Upload any file and instantly convert, summarize,
          translate, compress, or chat with your documents.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Button text="Upload Document" />
          <Button text="Explore Tools" />
        </div>

      </div>
    </section>
  );
}

export default Hero;