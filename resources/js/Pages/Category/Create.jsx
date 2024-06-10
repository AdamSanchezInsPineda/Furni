import DashboardLayout from "@/Layouts/DashboardLayout";
import {useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import TextArea from "@/Components/TextArea";
import InputError from "@/Components/InputError";
import {IoMdArrowRoundBack} from "react-icons/io";

export default function Create({auth}) {
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        description: '',
        image: null,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.category.store"))
    };

    return (
        <DashboardLayout auth={auth} title="Create Category">
            <IoMdArrowRoundBack onClick={() => window.history.back()}
                                className="text-5xl bg-white rounded-xl p-2 cursor-pointer hover:bg-gray-900 hover:text-white transition-colors duration-200 ease-in-out"/>
            <div className="mx-4 xl:mx-64 py-4">
                <form onSubmit={handleSubmit} className="bg-white rounded-md px-6 py-4 shadow-xl">
                    <h1 className="font-bold text-xl mb-2">Add New Category</h1>
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
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                            Description:
                        </label>
                        <TextArea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            rows="4"
                            className="resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        ></TextArea>
                        <InputError message={errors.description} className="mt-2"/>
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
                    <button
                        type="submit"
                        className="bg-neutral-800 text-white px-4 py-2 rounded-xl font-bold hover:bg-neutral-700"
                        disabled={processing}
                    >
                        Add Category
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}
