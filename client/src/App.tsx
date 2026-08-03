import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import UploadBox from "./components/ai/UploadBox";
import ConverterHub from "./components/converters/ConverterHub";

function App() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <Hero />

        {/* AI Document Section */}
        <section className="px-6">
          <UploadBox />
        </section>

        {/* Image Converter */}
       <section className="mt-24 px-6 pb-24">
        <ConverterHub />
         </section>
      </main>
    </>
  );
}

export default App;