import {router} from "@inertiajs/react";
import UserTable from "@/Components/Dashboard/UserTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Pagination from "@/Components/Pagination";
import {useState} from "react";

export default function Users({auth, users, filters, isEmpty}) {
    const [searchValues, setSearchValues] = useState({name: filters.name, email: filters.email});

    const handleSearchChange = (field, e) => {
        const newSearchValues = {...searchValues, [field]: e.target.value};
        setSearchValues(newSearchValues);
        router.get(
            "/admin/users",
            newSearchValues,
            {preserveState: true, replace: true}
        );
    };

    if (isEmpty) {
        return (
            <DashboardLayout auth={auth} title="Users">
                <div className="mx-4 xl:mx-64 py-4 flex flex-col justify-center items-center" style={{height: '400px'}}>
                    <p className="text-center text-lg md:text-2xl mb-8">No users found.</p>
                    <img src="/notFound.svg" alt="Mi SVG"/>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout auth={auth} title="Users">
            <div className="mt-5 h-full">
                <div className="flex items-center justify-between gap-3 mb-3">
                    <input
                        type="text"
                        placeholder="Search name..."
                        value={searchValues.name}
                        onChange={(e) => handleSearchChange('name', e)}
                        className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Search email..."
                        value={searchValues.email}
                        onChange={(e) => handleSearchChange('email', e)}
                        className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 max-md:hidden"
                    />
                </div>
                <UserTable
                    users={users.data}
                    auth={auth}
                    head={["Admin", "Name", "Email", "Phone", "Status"]}
                    body={[
                        "admin",
                        "name",
                        "email",
                        "phone",
                        "status",
                    ]}
                />
                <div className="mt-4 flex justify-center">
                    <Pagination links={users.links}/>
                </div>
            </div>
        </DashboardLayout>
    );
}
