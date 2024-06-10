import TextInput from '@/Components/TextInput';
import {useForm} from '@inertiajs/react';
import {Transition} from '@headlessui/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import {useState} from "react";

export default function UpdateProfileInformation({className, address}) {
    const {delete: handleDelete} = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const {data, setData, post, errors, processing, recentlySuccessful} = useForm({
        name: address.name,
        tax_number: address.tax_number,
        country: address.country,
        street_address: address.street_address,
        city: address.city,
        zip: address.zip,
    });

    const handleDeleteClick = (address) => {
        setItemToDelete(address);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        handleDelete(route("address.destroy", itemToDelete));
        setIsModalOpen(false);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('address.update', address));
    };

    return (
        <section className={className}>
            <header>
                <p className="mt-1 text-sm text-gray-600 ">
                    Update your Billing details.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name"/>
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        isFocused
                        autoComplete="name"
                        required
                    />
                    <InputError className="mt-2" message={errors.name}/>
                </div>
                <div>
                    <InputLabel htmlFor="tax_number" value="Tax ID number"/>
                    <TextInput
                        id="tax_number"
                        className="mt-1 block w-full"
                        value={data.tax_number}
                        onChange={(e) => setData('tax_number', e.target.value)}
                        isFocused
                        autoComplete="tax_number"
                        required
                    />
                    <InputError className="mt-2" message={errors.tax_number}/>
                </div>

                <div>
                    <InputLabel htmlFor="country" value="Country / Region"/>

                    <TextInput
                        id="country"
                        className="mt-1 block w-full"
                        value={data.country}
                        onChange={(e) => setData('country', e.target.value)}
                        isFocused
                        autoComplete="country"
                        required
                    />

                    <InputError className="mt-2" message={errors.country}/>
                </div>

                <div>
                    <InputLabel htmlFor="street_address" value="Street Address"/>

                    <TextInput
                        id="street"
                        className="mt-1 block w-full"
                        value={data.street_address}
                        onChange={(e) => setData('street_address', e.target.value)}
                        isFocused
                        autoComplete="street_address"
                        required
                    />

                    <InputError className="mt-2" message={errors.street_address}/>
                </div>
                <div>
                    <InputLabel htmlFor="city" value="City / Town"/>

                    <TextInput
                        id="city"
                        className="mt-1 block w-full"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        isFocused
                        autoComplete="city"
                        required
                    />

                    <InputError className="mt-2" message={errors.city}/>
                </div>

                <div>
                    <InputLabel htmlFor="zip" value="ZIP Code"/>

                    <TextInput
                        id="zip"
                        className="mt-1 block w-full"
                        value={data.zip}
                        onChange={(e) => setData('zip', e.target.value)}
                        isFocused
                        autoComplete="zip"
                        required
                    />

                    <InputError className="mt-2" message={errors.zip}/>
                </div>
                <div className="flex items-center gap-4 justify-between">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600 ">Saved.</p>
                    </Transition>


                    <DangerButton
                        onClick={() =>
                            handleDeleteClick(address)
                        }
                    >
                        Delete Address
                    </DangerButton>
                </div>
            </form>
            <Modal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className="h-screen w-1/2 flex items-center justify-center mx-auto border-0 bg-red-600 text-white overflow-auto"
            >
                <div className="p-6 bg-white rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">
                        Confirm Delete
                    </h2>
                    <p className="mb-6">
                        Are you sure you want to delete this Address?
                    </p>
                    <div className="flex justify-end">
                        <SecondaryButton onClick={() => setIsModalOpen(false)}>Cancel</SecondaryButton>

                        <DangerButton className="ml-3" onClick={handleConfirmDelete}>
                            Delete Address
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
