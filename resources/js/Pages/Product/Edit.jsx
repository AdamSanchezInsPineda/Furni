import DashboardLayout from "@/Layouts/DashboardLayout";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import TextArea from "@/Components/TextArea";
import {useForm} from "@inertiajs/react";
import {useState} from "react";
import {IoMdArrowRoundBack} from "react-icons/io";

export default function Edit({auth, product, categories}) {
    const {data, setData, post, processing, errors} = useForm({
        name: product.name,
        price: product.price,
        short_description: product.short_description,
        full_description: product.full_description,
        image: product.image,
        gallery: product.gallery,
        category: product.category_id,
    });

    const {delete: handleDelete} = useForm();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData((prevData) => ({
            ...prevData,
            image: file,
        }));
    };

    const handleGalleryChange = (e) => {
        const files = e.target.files;
        const galleryArray = Array.from(files);
        setData((prevData) => ({
            ...prevData,
            gallery: galleryArray,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.product.update", product));
    };

    const handleDeleteImage = () => {
        setData((prevData) => {
            const updatedGallery = prevData.gallery.filter(
                (image) => image !== selectedImage
            );
            return {
                ...prevData,
                gallery: updatedGallery,
            };
        });
        handleDelete(
            route("admin.product.deleteImage", {
                selectedImage: selectedImage,
                product: product.id,
            })
        );
        setSelectedImage(null); // Mover setSelectedImage aquí
    };

    return (
        <DashboardLayout
            auth={auth}
            headTitle={"Product Edit"}
        >
            <IoMdArrowRoundBack onClick={() => window.history.back()}
                                className="text-5xl bg-white rounded-xl p-2 cursor-pointer hover:bg-gray-900 hover:text-white transition-colors duration-200 ease-in-out"/>
            <div className="mx-4 xl:mx-64 py-4">
                <form onSubmit={handleSubmit} className="bg-white rounded-md px-6 py-4 shadow-xl">
                    <h1 className="font-bold text-xl mb-2">Edit Product</h1>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Name:
                        </label>
                        <TextInput
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <InputError message={errors.name} className="mt-2"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                            Price:
                        </label>
                        <TextInput
                            type="number"
                            id="price"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <InputError message={errors.price} className="mt-2"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="short_description" className="block text-gray-700 text-sm font-bold mb-2">
                            Short Description:
                        </label>
                        <TextArea
                            id="short_description"
                            name="short_description"
                            value={data.short_description}
                            onChange={handleChange}
                            rows="4"
                            className="resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></TextArea>
                        <InputError message={errors.short_description} className="mt-2"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="full_description" className="block text-gray-700 text-sm font-bold mb-2">
                            Full Description:
                        </label>
                        <TextArea
                            id="full_description"
                            name="full_description"
                            value={data.full_description}
                            onChange={handleChange}
                            rows="6"
                            className="resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></TextArea>
                        <InputError message={errors.full_description} className="mt-2"/>
                    </div>
                    <div className="mb-4">
                        <div>
                            <label htmlFor="image" className="block text-gray-700 text-sm font-bold">
                                Image:
                            </label>
                            <img
                                src={`/storage/products/${product.image}`}
                                alt={"product-" + product.id}
                                width={200}
                                height={100}
                                className="rounded-md mt-2"
                            />
                        </div>
                        <TextInput
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="appearance-none border mt-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <InputError message={errors.image} className="mt-2"/>
                    </div>
                    <div className="mb-4">
                        <div>
                            <label htmlFor="gallery" className="block text-gray-700 text-sm font-bold">
                                Gallery (multiple files):
                            </label>
                            <div className="flex gap-2 py-2">
                                {product.gallery &&
                                    Array.isArray(product.gallery) &&
                                    product.gallery.map((image, index) => (
                                        <div key={index}>
                                            <img
                                                src={`/storage/products/${image}`}
                                                alt={"gallery-" + index}
                                                width={200}
                                                height={100}
                                                onClick={() =>
                                                    setSelectedImage(image)
                                                }
                                                className={`cursor-pointer mx-2 rounded-md hover:scale-110 transition-transform duration-500 ease-in-out transform ${
                                                    selectedImage === image ? "border-2 border-blue-500 scale-110" : ""}`
                                                }
                                            />
                                            {selectedImage === image && (
                                                <div className="flex justify-center items-center">
                                                    <button onClick={handleDeleteImage}
                                                            className="bg-red-500 mt-5 text-white rounded-md px-4 py-2 hover:bg-red-700 focus:outline-none">
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <TextInput
                            type="file"
                            id="gallery"
                            name="gallery"
                            onChange={handleGalleryChange}
                            accept="image/*"
                            multiple
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {Object.keys(errors).filter(key => key.startsWith('gallery.')).map((key, index) => (
                            <InputError
                                key={index}
                                message={errors[key].replace(/\.0/g, '')}
                                className="mt-2"
                            />
                        ))}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gallery" className="block text-gray-700 text-sm font-bold mb-2">
                            Categories:
                        </label>
                        <select
                            name="category"
                            id="category"
                            onChange={handleChange}
                            value={data.category}
                        >
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.category} className="mt-2"/>
                    </div>
                    <button
                        type="submit"
                        className="bg-neutral-800 text-white px-4 py-2 rounded-xl font-bold hover:bg-neutral-700"
                        disabled={processing}
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}
