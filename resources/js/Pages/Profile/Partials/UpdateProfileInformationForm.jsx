import {useState} from "react";
import {FaUser} from "react-icons/fa";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import {Link, useForm, usePage} from "@inertiajs/react";
import {Transition} from "@headlessui/react";

export default function UpdateProfileInformation({mustVerifyEmail, status, className,}) {
    const user = usePage().props.auth.user;
    const {data, setData, post, errors, processing, recentlySuccessful} =
        useForm({
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            website: user.website,
            phone: user.phone,
            avatar: user.avatar,
        });

    const [newAvatar, setAvatar] = useState(`/storage/avatars/${user.avatar}`); // Mueve esta línea aquí

    const handleImagesChange = (event) => {
        const file = event.target.files[0];
        setData("avatar", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setAvatar(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 ">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 ">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6 ">
                <div className="flex lg:flex-row justify-between flex-col gap-2">
                    <div className="rounded-lg flex-1 max-w-xl space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Name"/>

                            <TextInput
                                id="name"
                                className="mt-1 block w-full text-lg h-10"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="name"
                            />
                            <InputError className="mt-2" message={errors.name}/>
                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="last_name" value="Second Name"/>
                            <TextInput
                                id="last_name"
                                className="mt-1 block w-full text-lg h-10"
                                value={data.last_name}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="last_name"
                            />
                            <InputError className="mt-2" message={errors.last_name}/>
                            <InputError
                                className="mt-2"
                                message={errors.last_name}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email"/>

                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full text-lg h-10"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                                autoComplete="username"
                            />
                            <InputError className="mt-2" message={errors.email}/>
                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="website" value="Website"/>

                            <TextInput
                                id="website"
                                className="mt-1 block w-full text-lg h-10"
                                value={data.website}
                                onChange={(e) =>
                                    setData("website", e.target.value)
                                }
                                isFocused
                                autoComplete="website"
                            />
                            <InputError className="mt-2" message={errors.website}/>
                            <InputError
                                className="mt-2"
                                message={errors.website}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="phone" value="phone"/>
                            <TextInput
                                id="phone"
                                className="mt-1 block w-full text-lg h-10"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="phone"
                            />
                            <InputError className="mt-2" message={errors.phone}/>
                            <InputError
                                className="mt-2"
                                message={errors.phone}
                            />
                        </div>

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                                <p className="text-sm mt-2 text-gray-800 ">
                                    Your email address is unverified.
                                    <Link
                                        href={route("verification.send")}
                                        method="post"
                                        as="button"
                                        className="underline text-sm text-gray-600  hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Click here to re-send the verification
                                        email.
                                    </Link>
                                </p>

                                {status === "verification-link-sent" && (
                                    <div className="mt-2 font-medium text-sm text-green-600">
                                        A new verification link has been sent to
                                        your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center mt-4 gap-4">
                            <PrimaryButton disabled={processing}>
                                Save
                            </PrimaryButton>

                            <Transition
                                show={recentlySuccessful}
                                enterFrom="opacity-0"
                                leaveTo="opacity-0"
                                className="transition ease-in-out"
                            >
                                <p className="text-sm text-gray-600 ">Saved.</p>
                            </Transition>
                        </div>
                    </div>
                    <div className="rounded-lg flex flex-col items-center justify-center space-y-4 m-auto">
                        <div
                            className="w-32 h-32 rounded-full border-4 border-gray-300 bg-gray-200 flex items-center justify-center text-2xl font-bold text-white">
                            {newAvatar ? (
                                <img
                                    src={newAvatar}
                                    alt={'avatar-' + user.id}
                                    className="w-32 h-32 rounded-[70px] object-cover"
                                />
                            ) : (
                                <FaUser
                                    className={"text-black w-16 h-16"}/>
                            )}
                        </div>
                        <div className="flex flex-col justify-center items-center w-28">
                            <input
                                type="file"
                                name="avatar"
                                id="avatar"
                                onChange={handleImagesChange}
                                className="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-black file:text-white
                                        hover:file:bg-neutral-800 file:cursor-pointer"
                            />
                            <InputError
                                message={errors.avatar}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}
