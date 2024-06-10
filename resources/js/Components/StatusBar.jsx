const StatusBar = ({currentStatus}) => {
    const statuses = ["pending", "processing", "completed"];

    const getClass = (status, index) => {
        let baseClass = "w-1/3 flex items-center justify-center h-14 border-r-2 transition-all"

        if (index === 0) {
            baseClass += ' rounded-l-full'
        }
        if (index === statuses.length - 1) {
            baseClass += ' rounded-r-full'
        }

        if (currentStatus) {
            if (currentStatus.toLowerCase() === 'canceled') {
                return `${baseClass} bg-red-500`
            }
            if (status === currentStatus) {
                return `${baseClass} bg-green-500 rounded shadow-lg scale-110`
            }

            if (statuses.indexOf(currentStatus) > index) {
                return `${baseClass} bg-blue-500`
            }
            return `${baseClass} bg-blue-300`
        } else {
            if (status === 'pending') {
                return `${baseClass} bg-green-500 rounded shadow-lg scale-110`
            }
            return `${baseClass} bg-blue-300`
        }
    }

    return (
        <div className="flex justify-around border-4 rounded-full border-blue-200">
            {statuses.map((status, index) => (
                <div key={index} className={getClass(status, index)}>
                    <p className="uppercase font-medium italic text-white drop-shadow text-center">
                        <span className="block text-xl font-bold not-italic leading-none">{index + 1}</span>
                        {status}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default StatusBar;
