import axios from "axios";

const API = "http://localhost:5000";

export const convertPdfToImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${API}/convert/pdf-to-image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    }
  );

  return response.data;
};

export const convertImageToPdf = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${API}/convert/image-to-pdf`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    }
  );

  return response.data;
};