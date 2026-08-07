import axios from "axios";

const API = "http://localhost:5000";

export async function convertFile(
  file: File,
  conversion: string
): Promise<Blob> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("conversion", conversion);

  const response = await axios.post(
    `${API}/convert`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    }
  );

  return response.data;
}