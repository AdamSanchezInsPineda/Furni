import ProductCard from "@/Components/ProductCard";
import PageLayout from "@/Layouts/PageLayout";
import {Link} from "@inertiajs/react";

export default function Catalogue({auth, products}) {
    return (
        <PageLayout user={auth.user} headTitle={"Category Product"} cartAmount={auth.cartAmount}
                    className="bg-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 py-10 lg:mx-32 mx-8">
                {products.data.map((product, index) => (
                    <ProductCard key={index} product={product}/>
                ))}
            </div>
            <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        {products.links.map((link, index) => {
                            const Component = link.url ? Link : "span";

                            return (
                                <Component
                                    key={index}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={`px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 rounded- ${
                                        link.active
                                            ? "bg-gray-900 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 hover:text-black"
                                    }`}
                                />
                            );
                        })}
                    </nav>
                </div>
            </div>
        </PageLayout>
    );
}
