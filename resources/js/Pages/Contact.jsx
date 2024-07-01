import PageLayout from "@/Layouts/PageLayout";
import { useState, useEffect } from "react";
import { FaLocationDot, FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Catalogue({ auth }) {
    const [copied, setCopied] = useState(null);

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => {
                setCopied(null);
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [copied]);

    const fallbackCopyTextToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed"; // Avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            setCopied(true);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    };

    const handleCopy = async (text, identifier) => {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            setCopied(identifier);
            return;
        }
        try {
            await navigator.clipboard.writeText(text);
            setCopied(identifier);
        } catch (error) {
            console.error("Failed to copy text: ", error);
            fallbackCopyTextToClipboard(text);
        }
    };

    return (
        <PageLayout
            user={auth.user}
            headTitle={"Contact"}
            cartAmount={auth.cartAmount}
            className="bg-slate-100"
        >
            <section
                style={{
                    backgroundImage: "url('/storage/categories/Leonardo.jpeg')",
                }}
                className="text-white px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-10 bg-center"
            >
                <h1 className="text-6xl font-bold mb-10 underline underline-offset-8">
                    Contact Us
                </h1>
                <p className="text-lg max-w-[500px]">
                    Your comfort and satisfaction are our priority. If you have
                    any questions, concerns or need support, please do not
                    hesitate to contact us. We are here to help you!
                </p>
            </section>
            <section className="flex flex-col justify-around p-7">
                <h2 className="text-4xl font-bold  text-center">
                    Contact Information
                </h2>
                <p className="text-center mb-4 text-lg text-gray-700">
                    Chat to our friendly team
                </p>
                <div className="flex flex-col w-full justify-around gap-4 md:flex-row mb-12">
                    <div className="flex flex-col p-2 bg-white rounded-lg shadow-lg w-full">
                        <div className="flex justify-between items-center">
                            <div className="p-3 rounded-xl bg-black">
                                <FaLocationDot className="text-2xl text-white" />
                            </div>
                            <button
                                className={`transition-all duration-300 ease-in-out bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded-md ${
                                    copied === "address" ? "bg-green-200" : ""
                                }`}
                                onClick={() =>
                                    handleCopy(
                                        "Szybisko 26, 30-698 Kraków",
                                        "address"
                                    )
                                }
                            >
                                {copied === "address" ? "Copied ✅" : "Copy"}
                            </button>
                        </div>
                        <p className="text-xl font-semibold mt-4">Visit us</p>
                        <p>Szybisko 26, 30-698 Kraków </p>
                    </div>
                    <div className="flex flex-col p-2 bg-white rounded-lg shadow-lg w-full">
                        <div className="flex justify-between items-center">
                            <div className="p-3 rounded-xl bg-black">
                                <FaPhoneVolume className="text-2xl text-white" />
                            </div>
                            <button
                                className={`transition-all duration-300 ease-in-out bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded-md ${
                                    copied === "phone" ? "bg-green-200" : ""
                                }`}
                                onClick={() =>
                                    handleCopy("504-999-310", "phone")
                                }
                            >
                                {copied === "phone" ? "Copied ✅" : "Copy"}
                            </button>
                        </div>
                        <p className="text-xl font-semibold mt-4">Call us</p>
                        <p>Mon-Fri from 9am to 4pm</p>
                        <p className="mt-2">504-999-310</p>
                    </div>
                    <div className="flex flex-col p-2 bg-white rounded-lg shadow-lg w-full">
                        <div className="flex justify-between items-center">
                            <div className="p-3 rounded-xl bg-black">
                                <MdEmail className="text-2xl text-white" />
                            </div>
                            <button
                                className={`transition-all duration-300 ease-in-out bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded-md ${
                                    copied === "email" ? "bg-green-200" : ""
                                }`}
                                onClick={() =>
                                    handleCopy(
                                        "office@furnivisual.com",
                                        "email"
                                    )
                                }
                            >
                                {copied === "email" ? "Copied ✅" : "Copy"}
                            </button>
                        </div>
                        <p className="text-xl font-semibold mt-4">
                            Chat to sales
                        </p>
                        <p>Speak to our team!</p>
                        <p className="mt-2">office@furnivisual.com</p>
                    </div>
                </div>
                <h2 className="text-4xl font-bold text-center mb-4">
                    Location
                </h2>
                <div className="flex-1">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2565.0875020232234!2d19.94021817719616!3d49.99096892034027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471642d601218f91%3A0xda4bfff7795cee47!2sSzybisko%2026%2C%2030-698%20Krak%C3%B3w!5e0!3m2!1ses!2spl!4v1710500764030!5m2!1ses!2spl"
                        width="600"
                        height="450"
                        className="rounded-lg border-2 border-gray-200 w-full h-96"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>
        </PageLayout>
    );
}
