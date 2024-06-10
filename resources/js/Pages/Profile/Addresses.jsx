import {Link, router} from "@inertiajs/react";
import {useState} from "react";
import PageLayout from '@/Layouts/PageLayout';
import AddressTable from "@/Components/AddressTable";
import Pagination from "@/Components/Pagination";

export default function Addresses({auth, addresses, filters, isEmpty}) {
    const [searchValue, setSearchValue] = useState(filters.name);
    const handleSearchChange = (e) => {
        const newSearchValue = e.target.value;
        setSearchValue(newSearchValue);
        router.get(
            "/profile/addresses",
            {name: newSearchValue},
            {preserveState: true, replace: true}
        );
    };

    if (isEmpty) {
        return (
            <PageLayout user={auth.user} className="bg-slate-100" headTitle={"Address"} cartAmount={auth.cartAmount}>
                <div className="mx-4 xl:mx-64 py-4 flex flex-col justify-center items-center" style={{height: '400px'}}>
                    <p className="text-center text-lg md:text-2xl mb-8">No addresses found.</p>
                    <img src="/notFound.svg" alt="Mi SVG"/>
                    <Link
                        href={route("address.create")}
                        className="mt-10 bg-neutral-800 text-white font-bold py-2 px-4 rounded hover:bg-neutral-700"
                    >
                        Create Invoice Data
                    </Link>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout user={auth.user} className="bg-slate-100" headTitle={"Addresses"} cartAmount={auth.cartAmount}>
            <div className="text-9xl font-black font-mono text-center">
                    <span className="bg-clip-text text-transparent bg-center bg-[url('/images/catalogue.webp')]">
                       Your Invoice Data
                    </span>
            </div>
            <div className="h-full p-5 xl:mx-60">
                <div className="flex items-center justify-between mb-3">
                    <Link
                        href={route("address.create")}
                        className="bg-neutral-800 text-white px-4 py-2 rounded-xl font-bold hover:bg-neutral-700"
                    >
                        Create Invoice Data
                    </Link>
                    <input
                        type="text"
                        placeholder="Search name..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 max-sm:hidden"
                    />
                </div>
                <AddressTable
                    addresses={addresses.data}
                    head={["Name", "Tax ID", "Country", "Street Address", "Actions"]}
                    body={[
                        "name", "tax id", "country", "street_address", "actions",
                    ]}
                />
                <div className="mt-4 flex justify-center">
                    <Pagination links={addresses.links}/>
                </div>
            </div>
        </PageLayout>
    );
}
