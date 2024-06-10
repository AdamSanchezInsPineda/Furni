import {router} from "@inertiajs/react";
import OrdersTable from "@/Components/OrdersTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {useState} from "react";
import Pagination from "@/Components/Pagination";

export default function Orders({auth, orders, filters, isEmpty}) {
    const [searchValues, setSearchValues] = useState({
        order_number: filters.order_number,
        status: filters.status
    });

    const handleSearchChange = (field, e) => {
        const newSearchValues = {...searchValues, [field]: e.target.value};
        setSearchValues(newSearchValues);
        router.get(
            "/admin/orders",
            newSearchValues,
            {preserveState: true, replace: true}
        );
    };

    if (isEmpty) {
        return (
            <DashboardLayout auth={auth} title="Orders">
                <div className="mx-4 xl:mx-64 py-4 flex flex-col justify-center items-center" style={{height: '400px'}}>
                    <p className="text-center text-lg md:text-2xl mb-8">No orders found.</p>
                    <img src="/notFound.svg" alt="Mi SVG"/>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout auth={auth} title="Orders">
            <div className="mt-5 h-full">
                <div className="flex items-center justify-between mb-3">
                    <input
                        type="text"
                        placeholder="Search number..."
                        value={searchValues.order_number}
                        onChange={(e) => handleSearchChange('order_number', e)}
                        className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 max-md:hidden"
                    />
                    <select
                        value={searchValues.status}
                        onChange={(e) => handleSearchChange('status', e)}
                        className="w-52 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select a status</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <OrdersTable
                    auth={auth}
                    orders={orders.data}
                    head={["Number", "Status", "Price", "Created at", "Actions"]}
                    body={[
                        "number",
                        "status",
                        "price",
                        "created at",
                        "actions",
                    ]}
                />
                <div className="mt-4 flex justify-center">
                    <Pagination links={orders.links}/>
                </div>
            </div>
        </DashboardLayout>
    );
}
