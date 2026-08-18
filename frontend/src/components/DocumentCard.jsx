import StatusBadge from "./StatusBadge";

function DocumentCard({title, status, uploadedAt}){
    return(
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex justify-between items-center hover:shadow-md transition">

            <div>
                <h3 className="font-semibold text-[#2C2C2C]">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">Uploaded {uploadedAt}</p>
            </div>

            <StatusBadge status={status}/>
        </div>
    )
}

export default DocumentCard;