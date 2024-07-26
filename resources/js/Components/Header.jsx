import {
    IoHome,
    IoImage,
    IoInformationCircleSharp,
    IoCart,
    IoReorderThreeOutline,
    IoClose,
    IoPerson,
} from "react-icons/io5";
import NavLink from "./NavLink";
import Dropdown from "./Dropdown";
import {useState} from "react";
import {Link} from "@inertiajs/react";
import LanguageSelector from "./LanguageSelector";
const navlinks = [
    {
        icon: <IoHome className="text-4xl"/>,
        text: "Home",
        href: "home",
    },
    {
        icon: <IoImage className="text-4xl"/>,
        text: "Catalogue",
        href: "catalogue",
    },
    {
        icon: <IoInformationCircleSharp className="text-4xl"/>,
        text: "About us",
        href: "about",
    },
];
const navlinksResponsive = [
    {
        text: "Profile",
        href: "profile.edit",
    },
    {
        text: "Address",
        href: "address.index",
    },
    {
        text: "Orders",
        href: "orders.index",
    },
    {
        text: "Cart",
        href: "cart.index",
    }
];
const Header = ({user, cartAmount}) => {
    const [openNabBar, SetOpenNabBar] = useState(false);
    return (
        <>
            <header className="bg-white w-full  fixed top-0 z-50">
                <div
                    className="flex justify-between items-center border-b border-gray-200 py-2 px-8 md:px-16 xl:px-32 2xl:px-64 min-h-[92px]">
                    <div className="flex-1 md:me-10">
                        <Link className="w-64" href={route("home")}>
                            <img
                                src="/images/logo.png"
                                alt="logo"
                                width={256}
                                height={75}
                            />
                        </Link>
                    </div>
                    <div className="lg:flex justify-center hidden">
                        <ul className="flex gap-6">
                            {navlinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink
                                        className="text-xl font-semibold"
                                        text={link.text}
                                        active={route().current(link.href)}
                                        href={route(link.href)}
                                    ></NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 lg:hidden flex justify-end">
                        <button
                            onClick={() => SetOpenNabBar(!openNabBar)}
                            className={`text-3xl ${
                                openNabBar ? "hidden" : "inline-flex"
                            }`}
                            disabled={openNabBar}
                        >
                            <IoReorderThreeOutline/>
                        </button>
                    </div>
                    {/* Hamburger Navbar Section */}
                    {openNabBar && (
                        <div
                            className="absolute z-50 top-0 bg-gray-50 flex-col left-0 h-screen gap-4 p-10 flex shadow-2xl rounded-b-xl w-5/6 lg:hidden">
                            <div className="flex justify-end">
                                <IoClose
                                    className={`text-4xl hover:bg-gray-200 cursor-pointer rounded transition-colors duration-300 ease-in-out ${
                                        !openNabBar ? "hidden" : "inline-flex"
                                    }`}
                                    onClick={() => SetOpenNabBar(!openNabBar)}
                                />
                            </div>
                            <Link
                                className="flex justify-center mt-5"
                                href={route("home")}
                            >
                                <img
                                    src="/images/logo.png"
                                    alt="logo"
                                    width={256}
                                    height={75}
                                />
                            </Link>
                            <div>
                                {/* flex-grow flex flex-col justify-center */}
                                <ul className="flex flex-col items-start border-b-2 py-10 gap-6">
                                    {navlinks.map((link, index) => (
                                        <li key={index}>
                                            <NavLink
                                                className="text-4xl font-semibold"
                                                text={link.text}
                                                active={route().current(
                                                    link.href
                                                )}
                                                href={route(link.href)}
                                            ></NavLink>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="flex flex-col items-start border-b-2 py-10 gap-6">
                                    {user && user.is_admin === 1 && (
                                        <li>
                                            <NavLink
                                                href={route("dashboard")}
                                                className="text-4xl font-semibold"
                                                active={route().current(
                                                    "dashboard"
                                                )}
                                                text="Dashboard"
                                            >
                                                Dashboard
                                            </NavLink>
                                        </li>
                                    )}
                                    {navlinksResponsive.map((link, index) => (
                                        <li key={index}>
                                            <NavLink
                                                className="text-4xl font-semibold"
                                                text={link.text}
                                                active={route().current(
                                                    link.href
                                                )}
                                                href={route(link.href)}
                                            ></NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col justify-end items-center flex-1 gap-4">
                                <Link
                                    href={route("login")}
                                    as="button"
                                    className="bg-black text-white py-1 px-10 rounded-md font-bold text-3xl hover:bg-white hover:text-black hover:border hover:border-gray-400 transition-all duration-300"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="bg-red-600 text-white py-1 px-10 rounded-md font-bold text-3xl hover:bg-white hover:text-black  hover:border hover:border-gray-400 transition-all duration-300"
                                >
                                    Log out
                                </Link>
                            </div>
                        </div>
                    )}
                    <div className="flex-1 lg:flex justify-end items-end hidden">
                        <ul className="flex space-x-4 items-center">
                            {user ? (
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline rounded-md">
                                                {user.avatar ? (
                                                    <button type="button">
                                                        <img
                                                            src={`/storage/avatars/${user.avatar}`}
                                                            alt="User avatar"
                                                            className="object-cover w-10 h-10 rounded-full"
                                                        />
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="w-10 h-10 text-xl text-white font-bold bg-gray-700 rounded-full transition ease-in-out duration-300"
                                                    >
                                                        {user.name.charAt(0)}
                                                    </button>
                                                )}
                                            </span>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            {user && user.is_admin === 1 && (
                                                <Dropdown.Link
                                                    href={route("dashboard")}
                                                >
                                                    Dashboard
                                                </Dropdown.Link>
                                            )}
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("address.index")}
                                            >
                                                Address
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("orders.index")}
                                            >
                                                Orders
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Logout
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            ) : (
                                <li>
                                    <Link
                                        href={route("login")}
                                        className="flex items-center gap-2 text-lg text-gray-500 font-semibold bg-gray-100 rounded-full px-6 py-1 border hover:border-black duration-500 hover:text-black whitespace-nowrap ms-10"
                                    >
                                        <IoPerson/>
                                        Sign in
                                    </Link>
                                </li>
                            )}
                            <li>
                                <LanguageSelector/>
                            </li>
                            <li className="relative">
                                <NavLink
                                    icon={
                                        <>
                                            <IoCart
                                                className="text-3xl hover:text-black transition-colors duration-300"/>
                                            {cartAmount > 0 && (
                                                <span
                                                    className="absolute bottom-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                                    {cartAmount}
                                                </span>
                                            )}
                                        </>
                                    }
                                    href={route("cart.index")}
                                ></NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <div className="mt-[92px]"></div>
        </>
    );
};
export default Header;
