import { useState } from 'react';
import Viewer from 'react-viewer';

export default function ProductViewCard({ product }) {
    const [visible, setVisible] = useState(false);

    const imgPreview = () => {
        setVisible(true);
    };

    const closePreview = () => {
        setVisible(false);
    };

    return (
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
            <div className="relative w-full sm:w-48" onClick={imgPreview}>
                <img
                    src={`/storage/products/${product.image}`}
                    alt={product.name}
                    className="rounded-md h-full w-full cursor-pointer"
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
            <Viewer
                visible={visible}
                onClose={closePreview}
                images={[{ src: `/storage/products/${product.image}`, alt: product.name }]}
            />
        </div>
    );
}
