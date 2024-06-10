import {Link} from "@inertiajs/react";

export default function DashboardCard({href, icon, text}) {
    return (
        <Link
            href={href}
            as="button"
            className="text-center p-4 transform transition duration-500 hover:scale-105"
        >
            <div className="bg-gray-100 rounded-lg shadow-lg p-6 block">
                <h2 className="text-2xl font-bold mb-2">
                    {icon}
                </h2>
                {text}
            </div>
        </Link>
    );
}
