import React from "react";
import {router} from "@inertiajs/react";
import {IoMdDownload} from "react-icons/io";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Stepper from "@/Components/Stepper";
import StatusButton from "@/Components/StatusButtons";

export default function Show({auth, order}) {
    const STATUS_MAP = {
        "cancelled": -1,
        "pending": 0,
        "processing": 1,
        "completed": 2
    };

    const [currentStep, setCurrentStep] = React.useState(STATUS_MAP[order.status]);
    const NUMBER_OF_STEPS = 3
    const NAME_OF_STEPS = ["pending", "processing", "completed"];

    const goToCancellingStep = () => {
        setCurrentStep(-1);
        router.put(route("orders.updateStatus", {
            order,
            status: "cancelled",
        }))
    }
    const goToPendingStep = () => {
        setCurrentStep(0);
        router.put(route("orders.updateStatus", {
            order,
            status: "pending",
        }))

    }
    const goToProcessingStep = () => {
        setCurrentStep(1);
        router.put(route("orders.updateStatus", {
            order,
            status: "processing",
        }))
    }
    const goToCompletedStep = () => {
        setCurrentStep(2);
        router.put(route("orders.updateStatus", {
            order,
            status: "completed",
        }))
    }

    const handleDownload = (e) => {
        e.preventDefault();
        try {
            const images = JSON.parse(order.cart.products[0].pivot.images);
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
            console.log(
                "Failed to download images from the order:",
                order.cart.products[0].pivot.images
            );
        }
    };

    return (
        <DashboardLayout auth={auth} title="Orders details">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 xl:flex-row">
                    <div className="bg-white p-4 rounded-xl shadow-lg w-full flex flex-col">
                        <h1 className="text-gray-500 font-black">Number: {order.order_number}</h1>
                        <h1 className="font-black text-2xl mb-2">Order status</h1>
                        <div className="flex justify-around p-2 border-y">
                            <p>
                                {new Date(
                                    order.created_at
                                ).toLocaleDateString()}
                            </p>
                            <div className="border-l-2 border-gray-200 h-auto m-y2"></div>
                            <p>{order.total_price}€</p>
                        </div>
                        <div className="flex flex-col justify-center items-center mt-6">
                            <Stepper currentStep={currentStep} numberOfSteps={NUMBER_OF_STEPS}
                                     nameOfSteps={NAME_OF_STEPS}/>
                            <div className="flex flex-row gap-10 mt-10 ">
                                <div className="flex max-[940px]:flex-col gap-10">
                                    <StatusButton
                                        onClick={goToCancellingStep}
                                    >
                                        Cancelled
                                    </StatusButton>
                                    <StatusButton
                                        onClick={goToPendingStep}
                                    >
                                        Pending
                                    </StatusButton>
                                </div>
                                <div className="flex max-[940px]:flex-col gap-10">
                                    <StatusButton
                                        onClick={goToProcessingStep}
                                    >
                                        Confirm
                                    </StatusButton>
                                    <StatusButton
                                        onClick={goToCompletedStep}
                                    >
                                        Completed
                                    </StatusButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-lg w-full">
                        <h1 className="text-2xl font-bold mb-2">
                            Order information
                        </h1>
                        <div
                            className="max-h-72 overflow-auto"
                            id="myScrollableSection"
                        >
                            <table className="w-full ">
                                <tbody className="divide-y">
                                <tr>
                                    <td className="text-gray-800 w-32">
                                        <div className="my-2">
                                            Tax number
                                        </div>
                                    </td>
                                    <td className="text-end font-semibold w-56">
                                        <div className="my-2">
                                            {order.tax_number}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-gray-800">
                                        <div className="my-2">
                                            Order address
                                        </div>
                                    </td>
                                    <td className="text-end font-semibold">
                                        <div className="my-2">
                                            {order.street_address}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-gray-800">
                                        <div className="my-2">
                                            Order ZIP number
                                        </div>
                                    </td>
                                    <td className="text-end font-semibold">
                                        <div className="my-2">
                                            {order.zip}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-gray-800">
                                        <div className="my-2">
                                            Order Phone
                                        </div>
                                    </td>
                                    <td className="text-end font-semibold">
                                        <div className="my-2">
                                            {order.user.phone}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-gray-800">
                                        <div className="my-2">
                                            Order email
                                        </div>
                                    </td>
                                    <td className="text-end font-semibold">
                                        <div className="my-2">
                                            {order.user.email}
                                        </div>
                                    </td>
                                </tr>
                                {order.notes && (
                                    <tr>
                                        <td className="text-gray-800">
                                            <div className="my-2">
                                                Notes
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className="text-end font-semibold max-h-24 overflow-auto my-2"
                                                id="myScrollableSection"
                                            >
                                                {order.notes}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <h1 className="text-2xl font-bold mb-2">Products</h1>
                    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {order.cart.products.map((product, index) => {
                            return (
                                <div className="bg-gray-200 p-2 rounded-xl shadow-lg">
                                    <h1>{product.name}</h1>
                                    <div>
                                        <img
                                            src={`${product.image}`}
                                            alt=""
                                            className="rounded-xl"
                                        />
                                    </div>
                                    <h1>User samples</h1>
                                    <div className="flex gap-2">
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
                                                            className="rounded-md w-32 object-cover"
                                                        />
                                                        <div
                                                            onClick={
                                                                handleDownload
                                                            }
                                                            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm rounded-md cursor-pointer"
                                                        >
                                                            <IoMdDownload
                                                                className="font-black text-4xl p-1 rounded-full bg-white"/>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2">
                                        <div className="flex flex-col">
                                            <p className="text-neutral-400">Name</p>
                                            <p>{product.name}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-neutral-400">Date</p>
                                            <p>{new Date(order.created_at).toLocaleString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                hour12: false
                                            }).replace(/,|at/g, '')}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-neutral-400">Address</p>
                                            <p className="truncate w-48">{order.street_address + ", " + order.city + ", " + order.country}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-neutral-400">Deadline</p>
                                            <p>{new Date(product.pivot.deadline).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-neutral-400">Perspective</p>
                                            <p> {product.pivot.perspective}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-neutral-400">Visualizations</p>
                                            <p> {product.pivot.products_number}</p>
                                        </div>
                                        {product.pivot.information && (
                                            <div className="flex flex-col">
                                                <p className="text-neutral-400">Information</p>
                                                <p>{product.pivot.information}</p>
                                            </div>
                                        )}
                                        {order.notes && (
                                            <div className="flex flex-col">
                                                <p className="text-neutral-400">Comment</p>
                                                <p>{order.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
