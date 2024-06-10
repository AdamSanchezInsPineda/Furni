import {Link, router} from "@inertiajs/react";
import {useState} from "react";
import CategoryTable from "@/Components/Dashboard/CategoryTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Pagination from "@/Components/Pagination";

export default function Categories({auth, categories, filters, isEmpty}) {
    const [searchValue, setSearchValue] = useState(filters.search);
    const handleSearchChange = (e) => {
        const newSearchValue = e.target.value;
        setSearchValue(newSearchValue);
        router.get(
            "/admin/categories",
            {search: newSearchValue},
            {preserveState: true, replace: true}
        );
    };

    if (isEmpty) {
        return (
            <DashboardLayout auth={auth} title="Orders">
                <div className="mx-4 mt-4 xl:mx-64 py-4 flex flex-col justify-center items-center"
                     style={{height: '300px'}}>
                    <p className="text-center text-lg md:text-2xl mb-8">No categories found.</p>
                    <img src="/notFound.svg" alt="Mi SVG"/>
                    <Link
                        href={route("admin.category.create")}
                        className="mt-10 bg-neutral-800 text-white font-bold py-2 px-4 rounded hover:bg-neutral-700"
                    >
                        Create Category
                    </Link>
                </div>
            </DashboardLayout>
        )
            ;
    }

    return (
        <DashboardLayout auth={auth} title="Categories">
            <div className="mt-5 h-full">
                <div className="flex items-center justify-between mb-3">
                    <Link
                        href={route("admin.category.create")}
                        className="bg-neutral-800 text-white px-4 py-2 rounded-xl font-bold hover:bg-neutral-700 "
                    >
                        Create Category
                    </Link>
                    <input
                        type="text"
                        placeholder="Search name..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 max-lg:hidden"
                    />
                </div>
                <CategoryTable
                    categories={categories.data}
                    head={["Name", "Description", "Image", "Action"]}
                    body={["name", "description", "image", "action"]}
                />
                <div className="mt-4 flex justify-center">
                    <Pagination links={categories.links}/>
                </div>
            </div>
        </DashboardLayout>
    );
}
