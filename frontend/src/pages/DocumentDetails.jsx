import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DocumentDetails(){
    const { id } = useParams();
    const [document, setdocument] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        fetch(`http://127.0.0.1:8000/documents/${id}`, {
            headers: { Authorization : `Bearer ${token}`},
        })
        .then((res) => res.json())
        .then((data)=> setdocument(data));
    }, [id]);

    // important to include [id] bcuz if the id changes the effect should rerun to fetch the new document, an empty [] would only fetch once ever even if id changes

    if (!document){
        return (
      <div className="min-h-screen bg-[#F3F4F4] flex items-center justify-center">
        <p className="text-[#2C2C2C] font-semibold text-xl animate-pulse">Loading document...</p>
      </div>
    );
    }

    return (
    <div className="min-h-screen bg-[#612D53] p-8 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-[#F3F4F4] p-8 rounded-xl shadow-2xl flex flex-col gap-5 mt-4">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-[#2C2C2C]">{document.title}</h1>
          <p className="text-[#853953] font-bold mt-1">Status: {document.status}</p>
        </div>
        
        <iframe
          src={`http://127.0.0.1:8000/documents/${id}/file?t=${Date.now()}`}
          className="w-full h-[700px] border border-gray-300 rounded-lg bg-white shadow-sm"
          title="Document PDF"
        />
      </div>
    </div>
  );
}

export default DocumentDetails;