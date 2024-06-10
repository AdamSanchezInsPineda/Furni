import DashboardLayout from "@/Layouts/DashboardLayout";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import TextArea from "@/Components/TextArea";
import {useForm} from "@inertiajs/react";
import {IoMdArrowRoundBack} from "react-icons/io";

export default function Create({auth, categories}) {
    const {data, setData, post, processing, errors} = useForm({
        name: "",
        price: "",
        short_description: "",
        full_description: "",
        image: null,
        gallery: [],
        category: categories.length > 0 ? categories[0].id : "",
    });

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
        post(route("admin.product.store"))
    };

    return (
        <DashboardLayout auth={auth} title={"Product Create"}>
            <IoMdArrowRoundBack onClick={() => window.history.back()}
                                className="text-5xl bg-white rounded-xl p-2 cursor-pointer hover:bg-gray-900 hover:text-white transition-colors duration-200 ease-in-out"/>
            <div className="mx-4 xl:mx-64 py-4">
                <form onSubmit={handleSubmit} className="bg-white rounded-md px-6 py-4 shadow-lg">
                    <h1 className="font-bold text-xl mb-2">Add New Product</h1>
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
                            required
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
                            required
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
                            required
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
                        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                            Image:
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        <InputError message={errors.image} className="mt-2"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gallery" className="block text-gray-700 text-sm font-bold mb-2">
                            Gallery (multiple files):
                        </label>
                        <input
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
                        Add Product
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}
