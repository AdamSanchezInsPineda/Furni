import {Link, useForm} from "@inertiajs/react";
import {BiSolidEditAlt} from "react-icons/bi";
import {FaTrashAlt} from "react-icons/fa";
import {useState} from "react";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";

export default function AddressTable({addresses}) {
    const {delete: handleDelete} = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDeleteClick = (address) => {
        setItemToDelete(address);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        handleDelete(route("address.destroy", itemToDelete));
        setIsModalOpen(false);
    };

    return (
        <div className="rounded-xl shadow-lg overflow-auto">
            <table className="w-full">
                <thead className="bg-neutral-800 text-white top-0 z-50">
                <tr>
                    <th className="p-3 font-bold tracking-wide text-left">
                        Name
                    </th>
                    <th className="p-3 font-bold tracking-wide text-left max-md:hidden">
                        Tax ID
                    </th>
                    <th className="p-3 font-bold tracking-wide text-left max-md:hidden">
                        Country
                    </th>
                    <th className="p-3 font-bold tracking-wide text-left">
                        Street Address
                    </th>
                    <th className="p-3 font-bold tracking-wide text-left">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {addresses.map((address, index) => {
                    return (
                        <tr
                            key={index}
                            className={`max-md:divide-x-2 border-b text-gray-700 hover:bg-gray-50 ${
                                index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                        >
                            <td className="p-3 w-32 ">{address.name}</td>
                            <td className="p-3 w-12 max-md:hidden">
                                {address.tax_number}
                            </td>
                            <td className="p-3 max-md:hidden">
                                {address.country}
                            </td>
                            <td className="p-3">
                                {address.street_address}
                            </td>
                            <td className="p-3">
                                <div className="flex gap-2 text-xl">
                                    <Link
                                        href={route(
                                            "address.edit",
                                            address
                                        )}
                                    >
                                        <BiSolidEditAlt className="text-blue-500"/>
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleDeleteClick(address)
                                        }
                                        className="text-red-500 hover:underline flex items-center"
                                    >
                                        <FaTrashAlt className="text-red-400 cursor-pointer"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <Modal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className="h-screen w-1/2 flex items-center justify-center mx-auto border-0 bg-red-600 text-white overflow-auto"
            >
                <div className="p-6 bg-white rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">
                        Confirm Delete
                    </h2>
                    <p className="mb-6">
                        Are you sure you want to delete this Address?
                    </p>
                    <div className="flex justify-end">
                        <SecondaryButton onClick={() => setIsModalOpen(false)}>Cancel</SecondaryButton>

                        <DangerButton className="ml-3" onClick={handleConfirmDelete}>
                            Delete Address
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
