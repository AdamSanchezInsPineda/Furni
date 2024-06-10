import {Link, router} from "@inertiajs/react";
import {useState} from "react";
import ProductTable from "@/Components/Dashboard/ProductTable";
import Pagination from "@/Components/Pagination";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Products({auth, products, filters, isEmpty, categories}) {
    const [searchValues, setSearchValues] = useState({search: filters.search, category: filters.category});

    const handleSearchChange = (field, e) => {
        const newSearchValues = {...searchValues, [field]: e.target.value};
        setSearchValues(newSearchValues);
        router.get(
            "/admin/products",
            newSearchValues,
            {preserveState: true, replace: true}
        );
    };

    if (isEmpty) {
        return (
            <DashboardLayout auth={auth} title="Products">
                <div className="mx-4 mt-4 xl:mx-64 py-4 flex flex-col justify-center items-center"
                     style={{height: '300px'}}>
                    <p className="text-center text-lg md:text-2xl mb-8">No products found.</p>
                    <img src="/notFound.svg" alt="Mi SVG"/>
                    <Link
                        href={route("admin.product.create")}
                        className="mt-10 bg-neutral-800 text-white font-bold py-2 px-4 rounded hover:bg-neutral-700"
                    >
                        Create Product
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout auth={auth} title="Products">
            <div className="mt-5 h-full">
                <div className="flex items-center justify-between mb-3">
                    <Link
                        href={route("admin.product.create")}
                        className="bg-neutral-800 text-white px-4 py-2 rounded-xl font-bold hover:bg-neutral-700"
                    >
                        Create Product
                    </Link>
                    <select
                        value={searchValues.category}
                        onChange={(e) => handleSearchChange('category', e)}
                        className="w-52 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 max-[882px]:hidden"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Search name..."
                        value={searchValues.search}
                        onChange={(e) => handleSearchChange('search', e)}
                        className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 max-sm:hidden"
                    />
                </div>
                <ProductTable
                    products={products.data}
                    head={["Name", "Category", "Price", "Image", "Description"]}
                    body={[
                        "name",
                        "category",
                        "price",
                        "image",
                        "short_description",
                    ]}
                />
                <div className="mt-4 flex justify-center">
                    <Pagination links={products.links}/>
                </div>
            </div>
        </DashboardLayout>
    );
}
