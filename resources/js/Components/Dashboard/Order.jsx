import {Link} from "@inertiajs/react";
import {FaCircle} from "react-icons/fa";

export default function Order({order, className = "", ...props}) {
    const orderStatusColor = {
        unpaid: 'bg-red-200 text-red-800',
        pending: 'bg-yellow-200 text-yellow-800',
        processing: 'bg-blue-200 text-blue-800',
        completed: 'bg-green-200 text-green-800',
        cancelled: 'bg-gray-200 text-gray-800',
    };
    const statusColor = orderStatusColor[order.status] || 'bg-gray-200 text-gray-800';

    return (
        <Link
            {...props}
            className="flex bg-gray-100 p-2 justify-around rounded-full w-full border-2 border-gray-200 transition-shadow duration-300 ease-in-out text-nowrap"
            href={route("admin.orders.show", order)}
        >
            <h1>{order.order_number}</h1>
            <p>{order.user.name}</p>
            <p>{order.total_price}</p>
            <p className={`${statusColor} px-2 rounded-full font-bold `}>
                <FaCircle className="inline-block mr-2 text-xs"/>
                {order.status}
            </p>
        </Link>
    );
}
