import {FaCircle} from "react-icons/fa6";

export default function OrderStatus({currentStatus}) {
    const statuses = ["pending", "processing", "completed"];

    const getClass = (status, index) => {
        let baseClass = "flex items-center justify-center";
        let afterClass = "w-full after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block";
        if (index === 0) {
            if (statuses.indexOf(currentStatus) > index) {
                return `${baseClass} ${afterClass}  text-blue-500  after:border-blue-200`;
            }
            return `${baseClass} ${afterClass} text-blue-500`;
        }
        if (index === 1) {
            if (status === currentStatus) {
                return `${baseClass} ${afterClass} text-blue-500`;
            }
            if (statuses.indexOf(currentStatus) > index) {
                return `${baseClass} ${afterClass} text-blue-500 after:border-blue-200`;
            }
            return `${baseClass} ${afterClass} `;
        }
        if (index === 2) {
            if (status === currentStatus) {
                return `${baseClass} text-blue-500`;
            }
        }
    };

    return (
        <div className="flex w-full justify-between">
            {statuses.map((status, index) => (
                <div key={index} className={getClass(status, index)}>
                    <div className="flex flex-col items-center">
                        <FaCircle/>
                        <span>{status}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
