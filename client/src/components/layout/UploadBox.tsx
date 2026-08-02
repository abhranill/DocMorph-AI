import {
  Upload,
  FileText,
  Sparkles,
  Send,
  Bot,
  User,
} from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function UploadBox() {
  const [file, setFile] = useState<File | null>(null);

  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);

  const [question, setQuestion] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const [messages, setMessages] = useState<
    {
      role: "user" | "assistant";
      content: string;
    }[]
  >([]);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const selectedFile = acceptedFiles[0];

    setFile(selectedFile);
    setSummary("");
    setText("");
    setMessages([]);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setText(response.data.text);
      setSummary(response.data.summary);
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) return;

    const currentQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentQuestion,
      },
    ]);

    setQuestion("");
    setChatLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/chat",
        {
          question: currentQuestion,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Sorry, I couldn't answer that question.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open,
  } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <div className="mt-16 flex justify-center">
      <div
        {...getRootProps()}
        className={`w-full max-w-3xl rounded-3xl border-2 border-dashed p-12 transition
        ${
          isDragActive
            ? "border-blue-600 bg-blue-100"
            : "border-blue-300 bg-blue-50 hover:border-blue-500 hover:bg-blue-100"
        }`}
      >
        <input {...getInputProps()} />

        <Upload
          size={60}
          className="mx-auto mb-6 text-blue-600"
        />

        <h2 className="text-center text-2xl font-semibold">
          {isDragActive
            ? "Drop your file here"
            : "Drag & Drop Your Document"}
        </h2>

        <p className="mt-3 text-center text-gray-600">
          PDF, DOCX, PPTX, TXT, XLSX and more
        </p>

        {file && (
          <div className="mt-6 rounded-xl bg-white p-4 text-center shadow">
            <h3 className="font-semibold text-blue-700">
              📄 {file.name}
            </h3>

            <p className="text-gray-500">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        {loading && (
          <div className="mt-6 rounded-xl bg-blue-100 p-4 text-center">
            <p className="animate-pulse font-semibold text-blue-700">
              🤖 Gemini is analyzing your document...
            </p>
          </div>
        )}

        {summary && (
          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <h3 className="flex items-center gap-2 text-xl font-bold text-green-700">
              <Sparkles size={22} />
              AI Summary
            </h3>

            <div className="mt-4 whitespace-pre-wrap rounded-lg bg-green-50 p-4">
              {summary}
            </div>
          </div>
        )}

        {text && (
          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <h3 className="flex items-center gap-2 text-xl font-bold text-blue-700">
              <FileText size={22} />
              Extracted Text
            </h3>

            <textarea
              className="mt-4 h-64 w-full rounded-lg border bg-gray-50 p-4"
              value={text}
              readOnly
            />
          </div>
        )}

        {summary && (
          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-blue-700">
              <Bot size={24} />
              Chat with Document
            </h3>

            <div className="max-h-96 space-y-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-2 font-semibold">
                      {msg.role === "user" ? (
                        <>
                          <User size={16} />
                          You
                        </>
                      ) : (
                        <>
                          <Bot size={16} />
                          DocMorph AI
                        </>
                      )}
                    </div>

                    <p className="whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {chatLoading && (
              <p className="mt-4 animate-pulse font-semibold text-blue-600">
                🤖 Thinking...
              </p>
            )}

            <div className="mt-6 flex gap-3">
              <input
                className="flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask anything about this document..."
                value={question}
                onChange={(e) =>
                  setQuestion(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    askQuestion();
                  }
                }}
              />

              <button
                onClick={askQuestion}
                disabled={chatLoading}
                className="rounded-xl bg-blue-600 px-5 text-white transition hover:bg-blue-700 disabled:bg-blue-300"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        )}

        <div className="text-center">
          <button
            type="button"
            onClick={open}
            disabled={loading}
            className="mt-8 rounded-xl bg-blue-600 px-8 py-3 text-white transition hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Analyzing..." : "Browse Files"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadBox;