import OrderAddress from "@/Components/Dashboard/OrderAddress";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Toggle from "@/Components/Toggle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TextInput from "@/Components/TextInput";
import {Transition} from "@headlessui/react";
import {Link, router, useForm} from "@inertiajs/react";
import "@/../css/scroll.css";

export default function Show({auth, user, orders}) {
    //Change verified to truthy or falsy
    user.email_verified_at = user.email_verified_at ? true : false;
    const {
        data: userData,
        setData: userSetData,
        put: userPut,
        errors: userErrors,
        processing: userProcessing,
        recentlySuccessful: userRecentlySuccessful,
    } = useForm({
        name: user.name,
        last_name: user.last_name,
        phone: user.phone,
    });

    const handleToggleChangeVerified = (verified) => {
        router.post(
            route("admin.changeVerified", {
                user: user,
                verified: verified,
            }),
            {preserveScroll: true}
        );
    };

    const handleOnChange = (event) => {
        userSetData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        userPut(route("admin.user.update", user), {
            preserveScroll: true,
        });
    };

    return (
        <DashboardLayout auth={auth} title="User Show">
            <div className="flex flex-col gap-4">
                <div className="bg-white shadow-lg p-4 rounded-xl border">
                    <h1 className="text-2xl font-bold mb-4">
                        User information
                    </h1>
                    <div className="flex flex-col md:flex-row md:gap-4">
                        <div className="max-md:m-auto">
                            <p>Avatar</p>
                            <div className="bg-gray-100 p-4 pb-2 rounded-xl border flex flex-col gap-2 items-center">
                                {user.avatar ? (
                                    <img
                                        src={`/storage/avatars/${user.avatar}`}
                                        alt="avatar"
                                        className="w-20 h-20 rounded-full outline outline-offset-2 outline-2 outline-gray-400"
                                    />
                                ) : (
                                    <p>No avatar</p>
                                )}
                                <div>
                                    <p className="mb-2 text-sm text-nowrap">
                                        Email verification
                                    </p>
                                    <Toggle
                                        initialChecked={
                                            user.email_verified_at
                                        }
                                        value={user.email_verified_at}
                                        textArray={["Validated"]}
                                        onChange={() =>
                                            handleToggleChangeVerified(
                                                user.email_verified_at
                                            )
                                        }
                                    ></Toggle>
                                    <InputError
                                        message={userErrors.email_verified_at}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="md:w-full">
                            {/* name lastname phone email verified(true false) deleted(true false)*/}
                            <form onSubmit={submit}>
                                <div className="md:grid md:grid-cols-2 md:items-center md:gap-4 md:h-full">
                                    <div className="">
                                        <InputLabel
                                            htmlFor="name"
                                            value="Name"
                                        />

                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={userData.name}
                                            className="mt-1 block w-full"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={handleOnChange}
                                        />

                                        <InputError
                                            message={userErrors.name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="max-md:mt-2">
                                        <InputLabel
                                            htmlFor="last_name"
                                            value="Last name"
                                        />

                                        <TextInput
                                            id="last_name"
                                            name="last_name"
                                            value={userData.last_name}
                                            className="mt-1 block w-full"
                                            autoComplete="last_name"
                                            onChange={handleOnChange}
                                        />

                                        <InputError
                                            message={userErrors.last_name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />

                                        <TextInput
                                            id="email"
                                            name="email"
                                            value={user.email}
                                            className="mt-1 block w-full"
                                            disabled={true}
                                        />

                                        <InputError
                                            message={userErrors.email}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <InputLabel
                                            htmlFor="phone"
                                            value="Phone"
                                        />

                                        <TextInput
                                            id="phone"
                                            name="phone"
                                            value={userData.phone}
                                            className="mt-1 block w-full"
                                            autoComplete="phone"
                                            onChange={handleOnChange}
                                        />

                                        <InputError
                                            message={userErrors.phone}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center mt-4 gap-4">
                                    <PrimaryButton disabled={userProcessing}>
                                        Save
                                    </PrimaryButton>
                                    <Transition
                                        show={userRecentlySuccessful}
                                        enterFrom="opacity-0"
                                        leaveTo="opacity-0"
                                        className="transition ease-in-out"
                                    >
                                        <p className="text-sm text-gray-600 ">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div
                    className="bg-white shadow-lg p-4 rounded-xl border md:max-h-[250px] md:overflow-y-auto"
                    id="myScrollableSection"
                >
                    <h1 className="text-2xl font-bold mb-4">User addresses</h1>
                    <table className="w-full max-md:hidden">
                        <thead className="sticky -top-4 bg-gray-100">
                        <tr className="[&>th]:text-start [&>th]:p-2 text-gray-600 text-sm border-b tracking-wide font-bold">
                            <th className="max-xl:hidden">Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Country</th>
                            <th className="max-xl:hidden">Tax Number</th>
                            <th>Zip code</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {user.addresses.map((address) => (
                            <tr
                                className="border-b text-start [&>td]:p-2"
                                key={address.id}
                            >
                                <td className="max-xl:hidden">
                                    {address.name}
                                </td>
                                <td className="max-w-44 truncate">
                                    {address.street_address}
                                </td>
                                <td className="">{address.city}</td>
                                <td>{address.country}</td>
                                <td className="max-xl:hidden">
                                    {address.tax_number}
                                </td>
                                <td className="">{address.zip}</td>
                                <td className="space-x-2">
                                    <Link
                                        className="text-blue-700 hover:underline"
                                        href={route(
                                            "address.edit",
                                            address
                                        )}
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        className="text-red-500 hover:underline"
                                        href={route(
                                            "address.destroy",
                                            address
                                        )}
                                        method="delete"
                                        as="button"
                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="flex gap-4 flex-col md:hidden">
                        {user.addresses.map((address) => (
                            <div className="bg-gray-100 rounded-xl p-4 shadow-lg border border-gray-300 gap-2"
                                 key={address.id}>
                                <div className="space-x-2">
                                    <p className="inline-block bg-gray-800 text-white font-black py-1 px-4 rounded-xl text-sm">
                                        {address.name}
                                    </p>
                                </div>
                                <h1 className="text-lg font-bold inline-block">
                                    {address.country}, {address.city}
                                </h1>
                                <p className="font-black text-sm inline-block ms-2">
                                    ({address.zip})
                                </p>
                                <div className="text-gray-700">
                                    <p>{address.street_address}</p>
                                    <p>Tax: {address.tax_number}</p>
                                </div>
                                <div className="space-x-2 mt-4">
                                    <Link
                                        href={route("address.edit", address)}
                                        className="p-2 bg-white rounded-xl border-2 font-bold"
                                    >
                                        Edit address
                                    </Link>
                                    <Link
                                        as="button"
                                        href={route("address.destroy", address)}
                                        method="delete"
                                        className="p-2 bg-white rounded-xl border-2 font-bold"
                                    >
                                        Delete address
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white shadow-lg p-4 rounded-xl border md:max-h-[200px] md:overflow-y-auto">
                    <h1 className="text-2xl font-bold mb-4">User orders</h1>
                    <div className="flex flex-col gap-2 mb-2">
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <OrderAddress
                                    order={order}
                                    key={index}
                                ></OrderAddress>
                            ))
                        ) : (
                            <p>No orders</p>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
