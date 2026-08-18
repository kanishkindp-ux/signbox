function StatusBadge({status}){
    //A JS object acting as a dictionary to map the tailwind classes with the status word passed from the parent component.
    const statusStyles = {
        Draft: 'bg-gray-200 text-gray-700',
        Pending: 'bg-yellow-200 text-yellow-800',
        Viewed: 'bg-blue-200 text-blue-800',
        Signed: 'bg-green-200 text-green-800',
    };

    return (
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[status] || 'bg-gray-200 text-gray-700'}`}>
            { status }
        </span>
    );
}

export default StatusBadge;
