import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import PageLayout from "@/Layouts/PageLayout";
import TextInput from "@/Components/TextInput";
import {useForm} from "@inertiajs/react";

export default function AddressCreate({auth}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: "",
        tax_number: "",
        country: "",
        street_address: "",
        zip: "",
        city: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("address.store"));
    };
    return (
        <PageLayout
            user={auth.user}
            headTitle="Checkout Form"
            cartAmount={auth.cartAmount}
        >
            <div className="min-screen flex flex-col justify-center items-center pt-6 sm:pt-0 bg-gray-100 py-8">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <form onSubmit={submit}>
                        <h1 className="text-4xl font-bold mb-2">Add New Address</h1>
                        <div>
                            <InputLabel htmlFor="name" value="Name*"/>
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                onChange={handleChange}
                                required
                            />
                            <InputError message={errors.name} className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="tax_number" value="Tax number"/>
                            <TextInput
                                id="tax_number"
                                type="text"
                                name="tax_number"
                                value={data.tax_number}
                                className="mt-1 block w-full"
                                onChange={handleChange}
                                required
                            />

                            <InputError message={errors.tax_number} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="country" value="Country*"/>
                            <TextInput
                                id="country"
                                type="text"
                                name="country"
                                value={data.country}
                                className="mt-1 block w-full"
                                onChange={handleChange}
                                required
                            />
                            <InputError message={errors.country} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="street_address" value="Street address*"/>
                            <TextInput
                                id="street_address"
                                type="text"
                                name="street_address"
                                value={data.street_address}
                                className="mt-1 block w-full"
                                onChange={handleChange}
                                required
                            />
                            <InputError message={errors.street_address} className="mt-2"/>
                        </div>
                        <div>
                            <InputLabel htmlFor="zip" value="Zip*"/>
                            <TextInput
                                id="zip"
                                type="text"
                                name="zip"
                                value={data.zip}
                                className="mt-1 block w-full"
                                onChange={handleChange}
                                required
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
                                onChange={handleChange}
                                required
                            />
                            <InputError message={errors.city} className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton
                                className="ml-4 mr-2"
                                disabled={processing}
                                type="submit"
                            >
                                Add Address
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </PageLayout>
    );
}
