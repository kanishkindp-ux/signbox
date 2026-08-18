import Navbar from "../components/Navbar";
import DocumentCard from "../components/DocumentCard";

const fakeDocuments = [
    { id:1, title: "Freelance Contract.pdf", status: 'Draft', uploadedAt: '2 days ago'},
    { id:2, title: "NDA Agreement.pdf", status: 'Pending', uploadedAt: '5 days ago'},
    { id:3, title: "Lease Agreement.pdf", status: 'Signed', uploadedAt: '1 week ago'},
]

function DashboardPage(){
    return(
        <div className="min-h-screen bg-[#F3F4F4]">

            <Navbar/>

            <main className="max-w-4xl mx-auto mt-10 px-4">
                <h1 className="text-2xl font-bold text-[#2C2C2C] mb-6">My Documents</h1>
                <div className="flex flex-col gap-4">
                    {fakeDocuments.map((doc) => (
                        <DocumentCard
                            key={doc.id} //important to provide a key prop every time we render a list in react 
                            title={doc.title}
                            status={doc.status}
                            uploadedAt={doc.uploadedAt}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default DashboardPage;