import QuantitySelector from "@/Components/QuantitySelector";
import InputError from "@/Components/InputError";
import PageLayout from "@/Layouts/PageLayout";
import ReviewForm from "@/Components/ReviewForm";
import Rate from "@/Components/Rate";
import {useEffect, useState} from "react";
import {IoCalendarOutline, IoInformationCircleOutline} from "react-icons/io5";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import {useForm} from "@inertiajs/react";
import Modal from "react-modal";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Show({auth, product, reviews}) {
    const [hasModel, setHasModel] = useState(false);

    const {data, setData, post, processing, errors} = useForm({
        product_id: product.id,
        images: [],
        products_number: 1,
        perspective: 1,
        model: false,
        deadline: null,
        information: "",
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleImagesChange = (event) => {
        setData("images", Array.from(event.target.files));
    };

    //Para cuando el usuario cambie el valor del modelo
    useEffect(() => {
        const updateModel = async () => {
            await setData("model", hasModel);
        };
        updateModel();
    }, [hasModel]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("cart.store"));
    };

    return (
        <PageLayout user={auth.user} headTitle={"Show"} cartAmount={auth.cartAmount}>
            <section className="flex flex-col lg:flex-row py-8 lg:px-32 px-8 bg-gray-100">
                <div className="flex-1 bg-white p-4">
                    <Carousel
                        showArrows={false}
                        showStatus={false}
                        showThumbs={true}
                        showIndicators={false}
                        swipeable={true}
                    >
                        <div>
                            <img
                                src={`/storage/products/${product.image}`}
                                alt={`product-${product.name}`}
                                className="rounded-md"
                            />
                        </div>
                        {product.gallery.map((image, index) => (
                            <div key={index}>
                                <img
                                    src={`/storage/products/${image}`}
                                    alt={`product-${index}`}
                                    className="rounded-md"
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div className="flex-1 text-lg flex flex-col gap-2 bg-white p-4">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <h1 className="text-2xl">{product.price} €</h1>
                    <div>
                        <h1 className="font-semibold">Description: </h1>
                        <p>{product.full_description}</p>
                    </div>
                    <form onSubmit={submit} className="flex flex-col gap-2 ">
                        <div className="mb-4">
                            <h1 className="font-semibold">
                                Upload samples (Max 5):
                            </h1>
                            <input
                                type="file"
                                name="images"
                                id="images"
                                onChange={handleImagesChange}
                                className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-black file:text-white
                                hover:file:bg-neutral-800 file:cursor-pointer"
                                multiple={true}
                            />
                            {Object.keys(errors).filter(key => key.startsWith('images.')).map((key, index) => (
                                <InputError
                                    key={index}
                                    message={errors[key].replace(/\.0/g, '')}
                                    className="mt-2"
                                />
                            ))}
                        </div>
                        <div className="mb-4">
                            <div className="flex flex-row">
                                <h1 className="font-semibold">
                                    Enter number of furniture:
                                    <span className="text-red-500"> *</span>
                                </h1>
                                <div className="group relative flex">
                                    <IoInformationCircleOutline className="w-5 h-5 text-gray-800"/>
                                    <span
                                        className="absolute w-48 -top-16 left-6 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100"> Number of products you want to include in the arrangement (you can add several product variants to one arrangement) </span>
                                </div>
                            </div>
                            <QuantitySelector
                                value={data.products_number}
                                initialQuantity={1}
                                onQuantityChange={(number) =>
                                    setData("products_number", number)
                                }
                            ></QuantitySelector>
                            <InputError
                                message={errors.products_number}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex flex-row">
                                <h1 className="font-semibold">
                                    Enter number of perspectives:
                                    <span className="text-red-500"> *</span>
                                </h1>
                                <div className="group relative flex">
                                    <IoInformationCircleOutline className="w-5 h-5 text-gray-800"/>
                                    <span
                                        className="absolute w-48 -top-8 left-6 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100"> Enter the number of scenes you want </span>
                                </div>
                            </div>
                            {/*TODO Que haya un selector o algo para pedir las cantidades de cada perspectiva*/}
                            <QuantitySelector
                                value={data.perspective}
                                initialQuantity={1}
                                maxQuantity={product.gallery.length}
                                onQuantityChange={(number) =>
                                    setData("perspective", number)
                                }
                            ></QuantitySelector>
                            <InputError
                                message={errors.perspective}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex flex-row">
                                <h1 className="font-semibold">
                                    3D Model:
                                </h1>
                                <div className="group relative flex">
                                    <IoInformationCircleOutline className="w-5 h-5 text-gray-800"/>
                                    <span
                                        className="absolute w-48 -top-28 left-6 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100"> Mark YES if you have your own 3D model of the product, mark NO if you do not have a 3D model.
                                        <p className="text-red-300">NOTE: If you do not have a model, please send photos, drawings, design or reference</p>
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 uppercase text-base">
                                <input
                                    type="radio"
                                    name="radio"
                                    id=""
                                    value={false}
                                    onChange={() => setHasModel(true)}
                                />
                                yes
                                <input
                                    type="radio"
                                    name="radio"
                                    id=""
                                    value={true}
                                    onChange={() => setHasModel(false)}
                                />
                                no
                            </div>
                            <InputError
                                message={errors.model}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex flex-row">
                                <h1 className="font-semibold">
                                    I have a deadline:
                                </h1>
                                <div className="group relative flex">
                                    <IoInformationCircleOutline className="w-5 h-5 text-gray-800"/>
                                    <span
                                        className="absolute w-48 -top-12 left-6 scale-0 transition-all rounded bg-gray-900 p-2 text-xs text-white group-hover:scale-100"> Enter your deadline.
                                        <p className="text-red-300">NOTE: we do not work on weekends </p>
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <label
                                    htmlFor="deadline"
                                    className="text-gray-600"
                                >
                                    <IoCalendarOutline className="text-xl"/>
                                </label>
                                <TextInput
                                    type="date"
                                    name="deadline"
                                    onChange={handleOnChange}
                                    id="deadline"
                                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <InputError
                                message={errors.deadline}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-4">
                            <p className="font-bold">
                                Any additional information:
                            </p>
                            <TextArea
                                name="information"
                                value={data.information}
                                id="information"
                                onChange={handleOnChange}
                                rows="10"
                                className="border-gray-300 rounded-md w-full"
                                placeholder="Additional comments"
                            ></TextArea>
                            <InputError
                                message={errors.information}
                                className="mt-2"
                            />
                        </div>
                        <p>Category: {product.category.name}</p>
                        <div className="flex justify-center">
                            <button
                                className="bg-black font-bold flex items-center gap-2 text-white px-8 py-2 rounded-xl text-center">
                                Add to cart
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <div className="items-center justify-center text-center border-0">
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    className="h-screen w-1/2 flex items-center justify-center mx-auto border-0"
                >
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className="w-full h-auto"
                    />
                </Modal>
            </div>
        </PageLayout>
    );
}
