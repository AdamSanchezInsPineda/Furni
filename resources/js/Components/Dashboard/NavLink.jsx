import {Link} from '@inertiajs/react';

export default function NavLink({active = false, className = '', children, icon, ...props}) {
    const handleClick = (event) => {
        if (active) {
            event.preventDefault();
        }
    }
    return (
        <Link
            className={`flex items-center hover:bg-gray-200 hover:rounded-xl py-1 px-2 duration-300 pe-5 ${active ? 'text-blue-700 border-e-4 hover:bg-transparent border-blue-700 hover:rounded-r-none cursor-default ' : 'text-gray-600'} ${className}`}
            onClick={handleClick}
            {...props}
            disabled={active}
        >
            {icon}
            <p className='ms-2 text-nowrap'>{children}</p>
        </Link>
    );
}
