import {Link} from "@inertiajs/react";

export default function Product({product}) {
    return (
        <div className="overflow-hidden">
            <Link href={route('admin.product.edit', product)}>
                <img
                    src={`/storage/products/${product.image}`}
                    alt={product.name}
                    className="rounded-xl w-full h-32 aspect-video-16/9 object-cover"
                />
            </Link>
            <h1 className="font-bold">{product.name}</h1>
            <p className="text-sm text-gray-600">{product.price}€</p>
        </div>
    );
}
