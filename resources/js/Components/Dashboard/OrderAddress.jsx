import {Link} from "@inertiajs/react";
import {FaCircle, FaEdit} from "react-icons/fa";

export default function OrderAddress({order, className = "", ...props}) {
    const orderStatusColor = {
        unpaid: "bg-red-200 text-red-800",
        pending: "bg-yellow-200 text-yellow-800",
        processing: "bg-blue-200 text-blue-800",
        completed: "bg-green-200 text-green-800",
        cancelled: "bg-gray-200 text-gray-800",
    };
    const statusColor =
        orderStatusColor[order.status] || "bg-gray-200 text-gray-800";

    return (
        <div
            {...props}
            className="flex bg-gray-100 p-2 items-center justify-around rounded-full w-full border-2 border-gray-200"
        >
            <h1>{order.order_number}</h1>
            <p>{order.total_price}</p>
            <p className={`${statusColor} px-2 rounded-full font-bold`}>
                <FaCircle className="inline-block mr-2 text-xs"/>
                {order.status}
            </p>
            <div className="flex gap-4 text-xl">
                <Link href={route("admin.orders.show", order)}><FaEdit
                    className="text-blue-500 cursor-pointer hover:text-blue-400 transition-colors duration-300 ease-in-out"/></Link>
            </div>
        </div>
    );
}
