import CheckoutCard from "@/Components/CheckoutCard";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import PageLayout from "@/Layouts/PageLayout";
import {FaPlus} from "react-icons/fa6";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import {Link, useForm} from "@inertiajs/react";

export default function CheckoutForm({auth, address}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        tax_number: "",
        country: "",
        street_address: "",
        zip: "",
        city: "",
        notes: "",
    });

/*    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };*/

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddressClick = (address) => {
        const {tax_number, country, street_address, zip, city} = address;
        setData({
            tax_number,
            country,
            street_address,
            zip,
            city,
            notes: data.notes || "",
        });
    };

    const handleReset = () => {
        reset(
            "tax_number",
            "country",
            "street_address",
            "zip",
            "city",
            "notes"
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("checkout"));
    };

    return (
        <PageLayout
            user={auth.user}
            headTitle="Checkout Form"
            cartAmount={auth.cartAmount}
        >
            <div className="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 bg-gray-100 py-8">
                <div className="mb-4">
                    <h1 className="text-4xl font-bold my-4">{address.length > 0 ? "Your invoices data" : "Add invoice data"}</h1>
                    <div className="flex flex-wrap items-center justify-center gap-2 overflow-auto">
                        <Link
                            className="flex flex-col items-center justify-center bg-white border-2 border-gray-400 border-dashed rounded-xl p-8"
                            href={route("address.create")}
                        >
                            <FaPlus className="text-gray-400 text-2xl"/>
                            <h1 className="text-nowrap font-bold text-gray-700">
                                Add Invoices Data
                            </h1>
                        </Link>
                        {address.length > 0 &&
                            address.map((address) => (
                                <CheckoutCard
                                    key={address.id}
                                    address={address}
                                    onAddressClick={handleAddressClick}
                                />
                            ))}
                    </div>
                </div>
                <h1 className="text-4xl uppercase font-bold">Invoice Data</h1>
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="tax_number" value="Tax number*"/>
                            <TextInput
                                id="tax_number"
                                type="text"
                                name="tax_number"
                                value={data.tax_number || ""}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={handleOnChange}
                            />
                            <InputError message={errors.tax_number} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="country" value="Country*"/>
                            <TextInput
                                id="country"
                                type="text"
                                name="country"
                                value={data.country || ""}
                                className="mt-1 block w-full"
                                onChange={handleOnChange}
                            />
                            <InputError message={errors.country} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="street_address" value="Street address*"/>
                            <TextInput
                                id="street_address"
                                type="text"
                                name="street_address"
                                value={data.street_address || ""}
                                className="mt-1 block w-full"
                                onChange={handleOnChange}
                            />
                            <InputError message={errors.street_address} className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="zip" value="Zip*"/>
                            <TextInput
                                id="zip"
                                type="text"
                                name="zip"
                                value={data.zip || ""}
                                className="mt-1 block w-full"
                                onChange={handleOnChange}
                            />
                            <InputError message={errors.zip} className="mt-2"/>
                        </div>
                        <div>
                            <InputLabel htmlFor="city" value="City*"/>
                            <TextInput
                                id="city"
                                type="text"
                                name="city"
                                value={data.city}
                                className="mt-1 block w-full"
                                onChange={handleOnChange}
                            />
                            <InputError message={errors.city} className="mt-2"/>
                        </div>
                        <div>
                            <InputLabel htmlFor="notes" value="Notes"/>
                            <TextArea
                                id="notes"
                                name="notes"
                                value={data.notes || ""}
                                className="mt-1 block w-full"
                                onChange={handleOnChange}
                            />
                            <InputError message={errors.notes} className="mt-2"/>
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton
                                className="ml-4 mr-2"
                                disabled={processing}
                                type="submit"
                            >
                                Process payment
                            </PrimaryButton>
                            <SecondaryButton onClick={handleReset}>
                                reset
                            </SecondaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </PageLayout>
    );
}
