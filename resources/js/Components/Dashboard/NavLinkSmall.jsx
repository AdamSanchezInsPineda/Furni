import {Link} from "@inertiajs/react";

export default function NavLinkSmall({active = false, className = '', children, icon, ...props}) {
    return (
        <Link
            className={`flex items-center duration-300 hover:text-black p-4 rounded-xl text-4xl ${active ? 'bg-gray-200' : 'text-gray-600'} ${className}`}
            {...props}
        >
            {icon}
            <p className='ms-2 text-nowrap'>{children}</p>
        </Link>
    );
}
