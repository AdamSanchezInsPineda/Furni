import {useForm} from "@inertiajs/react";
import {IoTrashOutline} from "react-icons/io5";
import {useState} from "react";
import {IoMdDownload} from "react-icons/io";

export default function CartCard({product}) {
    const {delete: handleDelete} = useForm();
    const model = JSON.parse(product.pivot.model);
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded shadow-lg max-sm:flex-col">
            <div className="w-48">
                <img src={`/storage/products/${product.image}`} alt="" className="rounded-md"/>
            </div>
            <div className="flex-1">
                <h1 className="text-2xl">{product.name}</h1>
                <h1 className="text-gray-500">
                    Price per product: {product.price} €
                </h1>
                <h1 className="truncate">
                    Enter number of products: {product.pivot.products_number}
                </h1>
                <h1 className="truncate">
                    Enter number of visualizations: {product.pivot.perspective}
                </h1>
                <h1 className="truncate">
                    I have my own 3D model: {model ? "YES" : "NO"}
                </h1>
            </div>
            <div className="flex-1">
                <div className="flex flex-wrap gap-2 justify-center">
                    {JSON.parse(product.pivot.images).map(
                        (image, index) => {
                            return (
                                <div
                                    key={index}
                                    className="relative"
                                >
                                    <img
                                        src={`/storage/cart/${image}`}
                                        alt=""
                                        className="rounded-md w-28 object-cover"
                                    />
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
            <button
                className="flex items-center gap-1 bg-red-500 p-2 rounded-xl text-white font-bold cursor-pointer hover:bg-red-600"
                onClick={() =>
                    handleDelete(route("cart.destroy.product", product))
                }>
                <IoTrashOutline className="font-black text-xl"/>
                Delete
            </button>
        </div>
    );
}
