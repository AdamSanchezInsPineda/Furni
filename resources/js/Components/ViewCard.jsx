import {IoMdDownload} from "react-icons/io";

export default function CartCard({product}) {
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
                    Price per product: {product.price}$
                </h1>
                <h1>
                    Enter number of products: {product.pivot.products_number}
                </h1>
                <h1>
                    Enter number of visualizations: {product.pivot.perspective}
                </h1>
                <h1>
                    Product information: <br/> {product.pivot.information}
                </h1>
            </div>
            <div
                className="w-full sm:w-auto flex justify-center sm:items-center gap-1 bg-orange-400 p-2 rounded-xl text-white font-bold cursor-pointer hover:bg-red-600 mt-4 sm:mt-0">
                <IoMdDownload className="font-black text-xl"/>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        try {
                            const images = JSON.parse(product.pivot.images);
                            if (Array.isArray(images)) {
                                images.forEach((image, index) => {
                                    const link = document.createElement("a");
                                    link.href = `/storage/cart/${image}`;
                                    link.download = `download_${index}`;
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                });
                            }
                        } catch (error) {
                            // console.log(
                            //     "Failed to parse product.pivot.images:",
                            //     product.pivot.images
                            // );
                        }
                    }}
                >
                    Download
                </button>

            </div>
        </div>
    );
}
