import React, { useState } from "react";
import PageLayout from "@/Layouts/PageLayout";
import { FaCircle } from "react-icons/fa";
import StepperVertical from "@/Components/StepperVertical";
import Stepper from "@/Components/Stepper";
import PrimaryButton from "@/Components/PrimaryButton";
import ProductViewCard from "@/Components/ProductViewCard";
import "@/../css/scroll.css";
import { useForm } from "@inertiajs/inertia-react";

const OrderDetailsPage = ({ auth, order }) => {
    const STATUS_MAP = {
        "cancelled": -1,
        "pending": 0,
        "processing": 1,
        "completed": 2
    };

    const [images, setImages] = useState([]);

    const { data, setData, put, processing, errors } = useForm({
        images: [],
    });

    const handleImagesChange = (event) => {
        const fileArray = Array.from(event.target.files);
        setData("images", fileArray);
        setImages(fileArray);
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        fetch(route("cart.update", order.id), {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'X-HTTP-Method-Override': 'PUT'
            }
        }).then(response => {
            if (response.ok) {
                console.log("Images uploaded successfully.");
                window.location.reload();
            } else {
                console.error("Error uploading images.");
                window.location.reload();
            }
        }).catch(error => {
            console.error("Error:", error);
        });
    };


    const NUMBER_OF_STEPS = 3;
    const NAME_OF_STEPS = ["pending", "processing", "completed"];
    const orderStatusColor = {
        unpaid: 'bg-red-200 text-red-800',
        pending: 'bg-yellow-200 text-yellow-800',
        processing: 'bg-blue-200 text-blue-800',
        completed: 'bg-green-200 text-green-800',
        cancelled: 'bg-gray-200 text-gray-800',
    };
    const statusColor = orderStatusColor[order.status] || 'bg-gray-200 text-gray-800';
    const currentStep = STATUS_MAP[order.status];

    const img = JSON.parse(order.cart.products[0].pivot.images);

    const imageUpload = img[0] === "placeholder.png" ?
        <form onSubmit={submit} className='flex items-center'>
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
            <PrimaryButton disabled={processing}>
                Upload
            </PrimaryButton>
        </form>
        :
        JSON.parse(order.cart.products[0].pivot.images).map(
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
        );

    return (
        <PageLayout
            user={auth.user}
            className="bg-slate-100"
            headTitle={"Orders"}
            cartAmount={auth.cartAmount}
        >
            <div className="container mx-auto py-4 px-14 max-sm:px-2">
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col gap-4 w-full">
                        <div
                            className="flex bg-white p-6 rounded-xl shadow-lg items-center justify-between max-[765px]:flex-col">
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold">{order.order_number}</h1>
                                <p>{new Date(order.created_at).toLocaleString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                })}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {imageUpload}
                            </div>
                            <p className={`${statusColor} px-2 rounded-full font-bold text-lg`}>
                                <FaCircle className="inline-block mr-2 mb-1 text-xs"/>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase()}
                            </p>
                        </div>
                        <div
                            className="bg-white p-6 w-auto rounded-xl shadow-lg items-center justify-between lg:hidden">
                            <h1 className="text-2xl font-bold pb-2">Status</h1>
                            <Stepper numberOfSteps={NUMBER_OF_STEPS} nameOfSteps={NAME_OF_STEPS}
                                     currentStep={currentStep}/>
                        </div>
                        <div
                            className="flex flex-row bg-white p-6 rounded-xl shadow-lg justify-between gap-4 max-sm:flex-col">
                            <div className="w-1/2">
                                <h1 className="text-2xl font-bold">Customer Details</h1>
                                <div className="flex flex-col justify-between">
                                    <p className="font-bold">{order.user.name}</p>
                                    <p>{order.user.email}</p>
                                    <p className="text-gray-600">{order.user.phone}</p>
                                    <p className="text-gray-600">{order.street_address + ", " + order.city + ", " + order.country}</p>
                                </div>
                                {order.notes && (
                                    <div className="flex flex-col mt-4">
                                        <p className="font-bold text-lg">Notes</p>
                                        <p>{order.notes}</p>
                                    </div>
                                )}
                            </div>
                            <div
                                id="myScrollableSection"
                                className="relative overflow-x-auto shadow-md rounded-lg border h-[295px]"
                            >
                                <div className="flex justify-center items-center">
                                    <div className="rounded flex flex-col gap-2">
                                        {order.cart.products.map((product) => (
                                            <ProductViewCard
                                                key={product.id}
                                                order={order}
                                                product={product}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg gap-2 self-start w-1/6 hidden lg:block">
                        <h1 className="text-2xl font-bold pb-2">Status</h1>
                        <StepperVertical numberOfSteps={NUMBER_OF_STEPS} nameOfSteps={NAME_OF_STEPS}
                                         currentStep={currentStep}/>
                    </div>

                </div>

            </div>
        </PageLayout>
    );
};

export default OrderDetailsPage;
