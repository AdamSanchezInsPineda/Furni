import {Link, router} from "@inertiajs/react";
import Toggle from "@/Components/Toggle";
import {FaEye} from "react-icons/fa";

export default function UserTable({auth, users}) {
    const handleToggleChange = (item) => {
        const newIsAdmin = !item.is_admin;
        router.post(route("changeStatus", {user: item, is_admin: newIsAdmin}), {preserveScroll: true})
    };

    const handleToggleChangeStatus = (item, deleted) => {
        router.post(route("changeTrashStatus", {user: item, trashed: deleted}), {preserveScroll: true})
    };

    return (
        <div className="rounded-xl shadow-lg overflow-auto">
            <table className="w-full">
                <thead className="bg-neutral-800 text-white top-0 z-50">
                <tr>
                    <th className="p-3 font-bold tracking-wide text-left">
                        Admin
                    </th>
                    <th className="p-3 font-bold tracking-wide text-left">
                        Name
                    </th>
                    <th className="p-3 font-bold tracking-wide text-left max-md:hidden">
                        Email
                    </th>
                    <th className="p-3 font-bold tracking-wide text-left max-md:hidden">
                        Phone
                    </th>
                    <th className="p-3 font-bold tracking-wide text-left">
                        Status
                    </th>
                    <th className="p-3 font-bold tracking-wide text-left">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => {
                    return (
                        <tr
                            key={index}
                            className={`max-md:divide-x-2 border-b text-gray-700 hover:bg-gray-50 ${
                                index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                        >
                            <td className="p-3 w-32 ">
                                {auth.user.id !== user.id && (
                                    <Toggle
                                        initialChecked={user.is_admin}
                                        value={user}
                                        textArray={['Admin']}
                                        onChange={() =>
                                            handleToggleChange(user)
                                        }
                                    ></Toggle>
                                )}
                            </td>
                            <td className="p-3 w-32 ">{user.name}</td>
                            <td className="p-3 w-12 max-md:hidden">
                                {user.email}
                            </td>
                            <td className="p-3 w-12 max-md:hidden">
                                {user.phone}
                            </td>
                            <td className="p-3 w-12">
                                {auth.user.id !== user.id && (
                                    <Toggle
                                        initialChecked={!user.deleted_at}
                                        value={!user.deleted_at}
                                        textArray={['Status']}
                                        onChange={() =>
                                            handleToggleChangeStatus(user, !user.deleted_at)
                                        }
                                    ></Toggle>
                                )}
                            </td>
                            <td className="p-3 w-12">
                                <Link href={route("admin.user.show", user)}><FaEye
                                    className="text-xl text-blue-500 hover:text-blue-400 transition-colors duration-300 ease-in-out"/></Link>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
