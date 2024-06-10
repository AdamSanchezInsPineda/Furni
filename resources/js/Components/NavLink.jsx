import {Link} from '@inertiajs/react';

export default function NavLink({active = false, className = '', children, icon, text, ...props}) {
    return (
        <Link
            className={`flex flex-col items-center justify-center hover:scale-105 duration-300 ${active ? 'text-black-500 scale-105' : 'text-gray-600'} ${className}`}
            {...props}
        >
            {icon}
            <p className='text-nowrap'>{text}</p>
        </Link>
    );
}
