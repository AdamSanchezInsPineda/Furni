import {IoMdArrowRoundBack} from "react-icons/io";
import UpdateAddressesInformationForm from "./Partials/UpdateAddressesInformationForm";
import PageLayout from "@/Layouts/PageLayout";

export default function Edit({auth, mustVerifyEmail, status, address}) {
    return (
        <PageLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Address
                </h2>
            }
            headTitle={"Address"}
            className="bg-slate-100"
            cartAmount={auth.cartAmount}
        >

            <div className="py-12">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <IoMdArrowRoundBack
                        onClick={() => window.history.back()}
                        className="text-5xl bg-white rounded-xl p-2 cursor-pointer hover:bg-gray-900 hover:text-white transition-colors duration-200 ease-in-out"
                    />
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                            Update Address Information
                        </h3>
                        <UpdateAddressesInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            address={address}
                        />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
