import NavLink from "@/Components/Dashboard/NavLink";
import NavLinkSmall from "@/Components/Dashboard/NavLinkSmall";
import Dropdown from "@/Components/Dropdown";
import MainButton from "@/Components/MainButton";
import {Head, Link} from "@inertiajs/react";
import {useState} from "react";
import {
    BiBarChartAlt,
    BiBasket,
    BiCategory,
    BiClipboard,
    BiUser,
    BiWrench,
} from "react-icons/bi";
import {IoClose, IoReorderThreeOutline} from "react-icons/io5";
import "@/../css/scroll.css";

export default function DashboardLayout({
                                            children,
                                            auth,
                                            title = "Dashboard",
                                        }) {
    const navLinks = [
        {
            name: "Dashboard",
            href: "dashboard",
            icon: <BiBarChartAlt/>,
        },
        {
            name: "Products",
            href: "admin.products",
            icon: <BiBasket/>,
        },
        {
            name: "Categories",
            href: "admin.categories",
            icon: <BiCategory/>,
        },
        {
            name: "Orders",
            href: "admin.orders",
            icon: <BiClipboard/>,
        },
        {
            name: "Users",
            href: "admin.users",
            icon: <BiUser/>,
        },
        {
            name: "Profile",
            href: "profile.edit",
            icon: <BiWrench/>,
        },
    ];
    const [openNabBar, setOpenNabBar] = useState(false);
    if (openNabBar) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    return (
        <div className="flex flex-col max-md:items-center md:flex-row p-2 h-screen">
            <Head title="Dashboard"/>
            <nav className="hidden w-72 md:flex flex-col items-center px-4 mb-4 divide-y-2">
                <Link
                    href={route("home")}
                    className="mt-2 pb-4 flex items-center gap-2 font-black text-4xl"
                >
                    <img src="/images/erynek.webp" alt="logo" width={50}/>
                    <h1>FurniVisual</h1>
                </Link>
                <section className="pt-4 pb-4 w-full">
                    <div
                        className="[&>h1]:flex [&>h1]:items-center [&>h1]:gap-2 text-2xl flex flex-col gap-4 font-bold">
                        {navLinks.map((link, index) => (
                            <NavLink
                                key={index}
                                icon={link.icon}
                                active={route().current(link.href)}
                                href={route(link.href)}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </section>
                <div className="flex-grow flex items-end w-full justify-center">
                    <Link href={route('logout')} method="post">
                        <MainButton className="bg-gray-800">Log Out</MainButton>
                    </Link>
                </div>
            </nav>
            <nav className="flex md:hidden w-full justify-around items-center">
                <IoReorderThreeOutline
                    className={`text-4xl hover:bg-gray-200 cursor-pointer rounded transition-colors duration-300 ease-in-out ${
                        !openNabBar ? "inline-flex" : "hidden"
                    }`}
                    onClick={() => setOpenNabBar(!openNabBar)}
                />
                <Link
                    href={route("home")}
                    className="mt-2 pb-4 flex items-center gap-2 font-black text-4xl"
                >
                    <img src="/images/erynek.webp" alt="logo" width={50}/>
                </Link>
                <div className="flex items-center gap-4">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="flex gap-2 cursor-pointer">
                                {auth.user.avatar ? (
                                    <img
                                        src={`/storage/avatars/${auth.user.avatar}`}
                                        alt="avatar"
                                        className="w-12 h-12 rounded-full"
                                    />
                                ) : (
                                    <button
                                        type="button"
                                        className="w-12 h-12 text-xl text-white font-bold hover:outline hover:outline-gray-300 bg-gray-700 rounded-full transition ease-in-out duration-300"
                                    >
                                        {auth.user.name.charAt(0)}
                                    </button>
                                )}
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route("home")}>
                                Home
                            </Dropdown.Link>
                            <Dropdown.Link href={route("profile.edit")}>
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link href={route("address.index")}>
                                Address
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
                {/* Hamburger Navbar Section */}
                {openNabBar && (
                    <div
                        className="absolute z-50 top-0 bg-white flex-col left-0 h-full gap-4 p-10 flex shadow-xl rounded-b-xl w-5/6">
                        <div className="flex justify-between">
                            <IoClose
                                className={`text-4xl hover:bg-gray-200 cursor-pointer rounded transition-colors duration-300 ease-in-out ${
                                    !openNabBar ? "hidden" : "inline-flex"
                                }`}
                                onClick={() => setOpenNabBar(!openNabBar)}
                            />
                            <h1>Log Out</h1>
                        </div>
                        <Link
                            href={route("home")}
                            className="mt-2 pb-4 flex items-center gap-2 font-black text-4xl self-center"
                        >
                            <img
                                src="/images/erynek.webp"
                                alt="logo"
                                width={80}
                            />
                        </Link>
                        <div className="">
                            {/* flex-grow flex flex-col justify-center */}
                            {navLinks.map((link, index) => (
                                <NavLinkSmall
                                    key={index}
                                    icon={link.icon}
                                    active={route().current(link.href)}
                                    href={route(link.href)}
                                >
                                    {link.name}
                                </NavLinkSmall>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
            <main className="w-full flex-1 bg-gray-100 rounded-3xl shadow-gray-300 shadow-inner md:overflow-auto p-2"
                  id="myScrollableSection">
                <div className="md:flex justify-between items-center gap-4 pb-2 hidden p-2 mb-2">
                    {/* Title and user dropdown section */}
                    <h1 className="text-4xl font-black">{title}</h1>
                    <div className="ms-3 relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="flex gap-2 cursor-pointer">
                                    {auth.user.avatar ? (
                                        <img
                                            src={`/storage/avatars/${auth.user.avatar}`}
                                            alt="avatar"
                                            className="w-12 h-12 rounded-full"
                                        />
                                    ) : (
                                        <button
                                            type="button"
                                            className="w-12 h-12 text-xl text-white font-bold hover:outline hover:outline-gray-300 bg-gray-700 rounded-full transition ease-in-out duration-300"
                                        >
                                            {auth.user.name.charAt(0)}
                                        </button>
                                    )}
                                    <div className=" text-nowrap max-w-48">
                                        <h1 className="text-xl font-bold text-ellipsis overflow-hidden">
                                            {auth.user.name +
                                                " " +
                                                auth.user.last_name}
                                        </h1>
                                        <h2 className="text-sm text-gray-600">
                                            {auth.user.email}
                                        </h2>
                                    </div>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route("home")}>
                                    Home
                                </Dropdown.Link>
                                <Dropdown.Link href={route("profile.edit")}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link href={route("address.index")}>
                                    Address
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
                </div>
                <div className="overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
