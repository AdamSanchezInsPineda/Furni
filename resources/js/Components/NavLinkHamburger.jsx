import {Link} from '@inertiajs/react';

export default function NavLinkHamburger({active = false, className = '', children, icon, text, ...props}) {
    return (
        <Link
            className={`flex flex-col ${active ? 'text-black-500' : 'text-gray-600'} ${className}`}
            {...props}
        >
            {icon}
            <p className='text-nowrap '>{text}</p>
        </Link>
    );
}
