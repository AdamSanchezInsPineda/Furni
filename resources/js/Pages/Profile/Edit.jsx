import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import PageLayout from "@/Layouts/PageLayout";
import {IoMdArrowRoundBack} from "react-icons/io";

export default function Edit({auth, mustVerifyEmail, status}) {
    const {is_admin} = auth.user;

    return (
        <PageLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
            headTitle={"Profile"}
            cartAmount={auth.cartAmount}
        >
            <div className="flex flex-col gap-2 md:px-10 px-5 py-2 bg-gray-100">
                {/* To redirect back */}
                <IoMdArrowRoundBack onClick={() => window.history.back()}
                                    className="text-5xl bg-white rounded-xl p-2 cursor-pointer hover:bg-gray-900 hover:text-white transition-colors duration-200 ease-in-out"/>
                <div className="bg-white shadow-md rounded-lg p-4 sm:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>
                <div className="p-4 sm:p-8 bg-white shadow-md rounded-lg">
                    <UpdatePasswordForm className="max-w-xl"/>
                </div>
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    {is_admin ? (
                        <p className="text-red-600">
                            You cannot delete your account because you are an
                            administrator.
                        </p>
                    ) : (
                        <DeleteUserForm className="max-w-xl"/>
                    )}
                </div>
            </div>
        </PageLayout>
    );
}
