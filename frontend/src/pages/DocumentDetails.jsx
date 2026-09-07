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

    return(
        <div className="min-h-screen bg-[#F3F4F4] p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#2C2C2C]">{document.title}</h1>
          <p className="text-[#853953] font-medium mt-1">Status: {document.status}</p>
        </div>
        
        <iframe
          src={`http://127.0.0.1:8000/documents/${id}/file?t=${Date.now()}`}
          className="w-full h-[700px] border-2 border-gray-100 rounded-lg shadow-inner bg-gray-50"
          title="Document PDF"
        />
      </div>
    </div>
    );
}

export default DocumentDetails;