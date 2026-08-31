import Navbar from "../components/Navbar";
import DocumentCard from "../components/DocumentCard";
import { useState, useEffect } from "react";

function DashboardPage() {
  // 1. State and Effect live INSIDE the component that renders the UI
  const [documents, setdocuments] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/documents") //returns a promise
      .then((res) => res.json())  //returns a promise 
      .then((data) => setdocuments(data)) //re-renders the components to reflect the new data 
      .catch((err) => console.error("Error fetching documents:", err)); //safety net
  }, []); // important to include [] to avoid infinite fetch loop

  // 2. The return statement uses the state declared directly above it
  return (
    <div className="min-h-screen bg-[#F3F4F4]">
      <Navbar />

      <main className="max-w-4xl mx-auto mt-10 px-4">
        <h1 className="text-2xl font-bold text-[#2C2C2C] mb-6">My Documents</h1>
        <div className="flex flex-col gap-4">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id} // important to include a key while rendering a list using react 
              title={doc.title}
              status={doc.status}
              uploadedAt={doc.created_at}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;