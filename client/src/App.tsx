import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ImageConverterPage from "./pages/ImageConverterPage";
import PdfConverterPage from "./pages/PdfConverterPage";
import WordConverterPage from "./pages/WordConverterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/image-converter"
        element={<ImageConverterPage />}
      />
      <Route
        path="/pdf-converter"
        element={<PdfConverterPage />}
      />
      <Route
        path="/word-converter"
        element={<WordConverterPage />}
      />
    </Routes>
  );
}

export default App;