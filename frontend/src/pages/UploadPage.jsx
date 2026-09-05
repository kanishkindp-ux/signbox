import { useState } from "react";

function UploadPage() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    // a browser API designed specifically for building multipart/form-data requests
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    const token = localStorage.getItem("token");
    const res = await fetch("http://127.0.0.1:8000/documents/upload", {
      method: "POST",
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      console.log("Upload Successful");
    } else {
      console.log("Upload Failed");
    }
  }

  return (
    <div className="min-h-screen bg-[#612D53] flex flex-col justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#F3F4F4] p-8 rounded-xl shadow-2xl flex flex-col gap-5"
      >
        <div className="text-center mb-2 flex flex-col items-center">
          {/* Reusing your SignBox Logo for brand consistency */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 h-14 mb-3 drop-shadow-sm"
          >
            <path
              d="M20 9V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4C4 2.89543 4.89543 2 6 2H13L20 9Z"
              stroke="#2C2C2C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 2V9H20"
              stroke="#2C2C2C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 14C10.5 14 12 14 13 15.5C13 15.5 15.5 12 18 11.5"
              stroke="#853953"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 14.5H7.5"
              stroke="#853953"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 18H15"
              stroke="#2C2C2C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h1 className="text-2xl font-bold text-[#2C2C2C]">Upload Document</h1>
          <p className="text-[#2C2C2C] opacity-70 text-sm mt-1">
            Select a PDF to securely upload to your account.
          </p>
        </div>

        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Document title (e.g., NDA)"
          className="bg-white text-[#2C2C2C] border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#853953]"
          required
        />

        {/* File Input */}
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="bg-white text-[#2C2C2C] border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#853953]
                     file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                     file:text-sm file:font-medium file:bg-[#853953] file:text-[#F3F4F4] 
                     hover:file:bg-[#2C2C2C] file:transition-colors file:cursor-pointer"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#853953] text-[#F3F4F4] font-medium p-2.5 rounded-lg hover:bg-[#2C2C2C] transition duration-200 shadow-md mt-2"
        >
          Upload PDF
        </button>
      </form>
    </div>
  );
}

export default UploadPage;