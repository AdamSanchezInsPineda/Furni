import { Link } from "@inertiajs/react";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="px-4 gb-white flex flex-col items-center w-full border-t bg-white mt-4">
            <div className="pt-3 flex-1 md:me-10">
                <Link className="w-100" href={route("home")}>
                    <img
                        src="/images/logo.png"
                        alt="logo"
                        width={256}
                        height={75}
                    />
                </Link>
            </div>

            <div className="flex justify-center w-full gap-10 my-4 flex-wrap">
                <ul className="flex sm:gap-10 gap-2 flex-col sm:flex-row md:items-center text-sm sm:text-base md:text-lg lg:text-xl text-gray-700">
                    <li>
                        <Link
                            href={route("contact")}
                            className="hover:text-gray-400 transition-colors duration-200"
                        >
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("how-order")}
                            className="hover:text-gray-400 transition-colors duration-200"
                        >
                            How to order
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("privacy")}
                            className="hover:text-gray-400 transition-colors duration-200"
                        >
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("catalogue")}
                            className="hover:text-gray-400 transition-colors duration-200"
                        >
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route("regulations")}
                            className="hover:text-gray-400 transition-colors duration-200"
                        >
                            Terms of Service
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-96 h-px my-8 bg-neutral-300 border-0 " />
                <span className="absolute px-3 font-medium -translate-x-1/2 left-1/2">
                    <div className="flex bg-white px-2 gap-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                        <a
                            href="https://www.instagram.com/erynek3d/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaInstagram className="hover:text-fuchsia-400 cursor-pointer transition duration-300 ease-in-out" />
                        </a>
                        <a
                            href="https://www.youtube.com/@erynek3d/videos"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaYoutube className="hover:text-red-600 cursor-pointer transition duration-300 ease-in-out" />
                        </a>
                        <a
                            href="https://www.facebook.com/Erynek3D"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaFacebook className="hover:text-blue-700 cursor-pointer transition duration-300 ease-in-out" />
                        </a>
                        <a
                            href="https://twitter.com/Erynek3D"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaTwitter className="hover:text-blue-400 cursor-pointer transition duration-300 ease-in-out" />
                        </a>
                    </div>
                </span>
            </div>
            <div>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-neutral-500">
                    © {currentYear}. Developed By FurniVisual
                </p>
            </div>
        </div>
    );
}
