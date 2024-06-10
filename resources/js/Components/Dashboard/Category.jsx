import {Link} from "@inertiajs/react";

export default function Category({category, className = "", ...props}) {

    return (
        <div
            {...props}
            className={"overflow-hidden " + className}
        >
            <Link href={route("admin.category.edit", category)}>
                <img
                    src={`/storage/categories/${category.image}`}
                    alt={category.name}
                    className="rounded-xl w-full h-32 aspect-video-16/9 object-cover"
                />
            </Link>
            <h1 className="font-bold">{category.name}</h1>
            <p className="text-sm text-gray-600">{category.products_count} Products</p>
        </div>
    );
}
