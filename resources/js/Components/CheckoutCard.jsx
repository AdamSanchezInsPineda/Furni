import {Link} from "@inertiajs/react";

export default function CheckoutCard({address, onAddressClick}) {
    const handleClick = () => {
        onAddressClick(address);
    };
    return (
        <div
            key={address.id}
            className="bg-white rounded-lg border-2 border-gray-300 flex flex-col justify-between cursor-pointer transition duration-300 ease-in-out hover:shadow-lg hover:border-gray-400"
            onClick={handleClick}
        >
            <div>
                <h2 className="text-xl font-bold border-b-2 px-4 p-2 text-nowrap">
                    {address.name}
                </h2>
                <div className="p-4 text-base">
                    <p className="font-extrabold text-lg">{address.country}</p>
                    <p>{address.tax_number}</p>
                    <p>{address.street_address}</p>
                    <p>{address.zip}</p>
                    <p>{address.city}</p>
                </div>
            </div>
            <div className="p-4 flex justify-end">
                <Link href={route("address.edit", address.id)} className="text-teal-600 font-bold">Edit</Link>
            </div>
        </div>
    );
}
