import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import UploadBox from "../components/ai/UploadBox";
import ConverterHub from "../components/converters/ConverterHub";

function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        <Hero />

        <section className="px-6">
          <UploadBox />
        </section>

        <ConverterHub />

      </main>
    </>
  );
}

export default Home;