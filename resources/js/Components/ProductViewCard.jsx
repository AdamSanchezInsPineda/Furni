export default function ProductViewCard({product}) {
    return (
        <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
            <div className="w-full sm:w-48">
                <img
                    src={`/storage/products/${product.image}`}
                    alt=""
                    className="rounded-md h-full w-full"
                />
            </div>
            <div className="flex-1">
                <h1 className="text-2xl">{product.name}</h1>
                <h1 className="text-gray-500">
                    Price: {product.price}$
                </h1>
                <h1>
                    Nº Products: {product.pivot.products_number}
                </h1>
                <h1>
                    Nº Perspectives: {product.pivot.perspective}
                </h1>
                {product.pivot.information && (
                    <h1>
                        Information: {product.pivot.information}
                    </h1>
                )}
                {product.pivot.model === true && (
                    <h1>
                        3D Model: {product.pivot.model}
                    </h1>
                )}
            </div>
        </div>
    );
}
