import {useEffect} from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Checkbox from "@/Components/Checkbox";
import TextInput from "@/Components/TextInput";
import {Head, Link, useForm} from "@inertiajs/react";

export default function Register() {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: "",
        last_name: "",
        email: "",
        website: "",
        phone: "",
        password: "",
        password_confirmation: "",
        is_accepted: false,
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.value
        );
    };

    const handleTerms = (event) => {
        setData(
            "is_accepted", event.target.checked
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register"/>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name*"/>
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={handleOnChange}
                        required
                    />
                    <InputError message={errors.name} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="last_name" value="Last Name*"/>
                    <TextInput
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        autoComplete="last_name"
                        isFocused={true}
                        onChange={handleOnChange}
                        required
                    />
                    <InputError message={errors.last_name} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="website" value="Website"/>
                    <TextInput
                        id="website"
                        name="website"
                        value={data.website}
                        className="mt-1 block w-full"
                        autoComplete="website"
                        isFocused={true}
                        onChange={handleOnChange}
                    />
                    <InputError message={errors.website} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Phone Number*"/>
                    <TextInput
                        id="phone"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="phone"
                        isFocused={true}
                        onChange={handleOnChange}
                        required
                    />
                    <InputError message={errors.phone} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email*"/>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={handleOnChange}
                        required
                    />
                    <InputError message={errors.email} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password*"/>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleOnChange}
                        required
                    />
                    <InputError message={errors.password} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleOnChange}
                        required
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="is_accepted" value="Terms*"/>
                    <Checkbox
                        value={data.is_accepted}
                        onChange={handleTerms}
                        className="pr-3 mr-3"
                    />
                    I accept the {' '}
                    <Link href={route('regulations')}
                          className="hover:underline text-blue-700">Terms of Service</Link>
                    {' '} and the {' '}
                    <Link href={route('privacy')}
                          className="hover:underline text-blue-700">Privacy Policy</Link>
                    <InputError message={errors.is_accepted} className="mt-2"/>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4">
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
