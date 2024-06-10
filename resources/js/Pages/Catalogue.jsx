import PageLayout from "@/Layouts/PageLayout";
import {Link} from "@inertiajs/react";

export default function Catalogue({auth, categories}) {
    return (
        <PageLayout user={auth.user} headTitle={"Catalogue"} cartAmount={auth.cartAmount} className="bg-slate-100">
            <section
                style={{backgroundImage: "url('/images/catalogue.webp')"}}
                className="text-white px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-10 bg-center"
            >
                <h1 className="text-6xl font-bold mb-10 underline underline-offset-8">
                    Catalogue
                </h1>
                <p className="text-lg max-w-[500px]">
                    Our catalog offers a wide selection that allows you to
                    tailor the interior to your individual needs. We are
                    committed to ensuring that you find something in our
                    proposals that will perfectly meet your expectations.
                </p>
            </section>
            <section className="mx-4 my-7 xl:mx-64 py-4 grid gap-10 md:grid-cols-2 grid-cols-1 md:text-nowrap">
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        href={route("categoryProduct", category)}
                        className="flex flex-col h-full border border-gray-200 rounded-lg"
                    >
                        <img
                            src={`/images/categories/${category.image}`}
                            alt={`category-${index}`}
                            className="rounded-t-lg aspect-video w-full h-96 object-cover"
                            width={1920}
                            height={1080}
                        />
                        <div className="bg-white rounded-b-lg px-6 py-4 shadow-xl h-full hover:bg-gray-100">
                            <h1 className="font-bold text-xl mb-2">
                                {category.name}
                            </h1>
                            <p className="text-gray-700 text-wrap">
                                {category.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </section>
        </PageLayout>
    );
}
