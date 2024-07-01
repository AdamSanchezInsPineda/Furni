import { AiOutlineClose } from "react-icons/ai";
import {Link, router} from "@inertiajs/react";
import {FaEye} from "react-icons/fa6";
import {BiSolidEditAlt} from "react-icons/bi";
import StatusButton from "@/Components/StatusButtons";
import React from "react";

export default function OrdersTable({auth, orders}) {
    const {is_admin} = auth.user;

    function getStatusColor(status) {
        switch (status) {
            case "pending":
                return "text-yellow-500";
            case "processing":
                return "text-blue-500";
            case "completed":
                return "text-green-500";
            case "cancelled":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    }

    function deleteButton(order) {
        if (order.status === "unpaid") {
            return (
                <button
                    onClick={() => {
                        router.put(route("orders.updateStatus", {
                            order,
                            status: "cancelled",
                        }));
                    }}
                    className="text-red-500"
                >
                    <AiOutlineClose/>
                </button>
            )
        }
    }

    return (
        <div className="rounded-xl shadow-lg overflow-auto">
            <table className="w-full">
                <thead className="bg-neutral-800 text-white top-0 z-50">
                <tr>
                    <th className="p-3 font-bold tracking-wide text-left">
                        Number
                    </th>
                    <th className="p-3 font-bold tracking-wide text-left">
                        Status
                    </th>
                    <th className="p-3 font-bold tracking-wide text-left max-md:hidden">
                        Price
                    </th>
                    <th className="p-3 font-bold tracking-wide text-left max-md:hidden">
                        Created at
                    </th>
                    <th className="p-3 font-bold tracking-wide text-left">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => {
                    return (
                        <tr
                            key={index}
                            className={`max-md:divide-x-2 border-b text-gray-700 hover:bg-gray-50 ${
                                index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                        >
                            <td className="p-3 w-32 ">{order.order_number}</td>
                            <td className={`p-3 w-32 " ${getStatusColor(
                                order.status
                            )}`}>
                                {order.status}</td>
                            <td className="p-3 w-12 max-md:hidden">
                                {order.total_price}€
                            </td>
                            <td className="p-3 w-12 max-md:hidden">
                                {new Date(
                                    order.created_at
                                ).toLocaleDateString()}
                                {/*Example: 4/12/2021*/}
                            </td>

                            <td className="p-3 w-12">
                                <div className="flex gap-2 text-xl">
                                    <Link
                                        href={route("orders.view", order)}
                                        className="text-blue-500 text-center"
                                    >
                                        <FaEye
                                            className="text-xl hover:text-blue-400 transition-colors ease-in-out duration-200"/>
                                    </Link>
                                    {is_admin === 1 && (
                                        <Link
                                            href={route("admin.orders.show", order)}
                                            className="text-black text-center"
                                        >
                                            <BiSolidEditAlt
                                                className="text-xl hover:text-gray-400 transition-colors ease-in-out duration-200"/>
                                        </Link>
                                    )}
                                    {deleteButton(order)}
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
