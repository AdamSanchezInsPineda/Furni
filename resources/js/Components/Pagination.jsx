import {Link} from "@inertiajs/react";

export default function Pagination({links}) {
    return (
        <div className="flex justify-center my-4">
            {links.map((link, index) => {
                const Component = link.url && !link.active ? Link : "span";
                return (
                    <Component
                        key={index}
                        href={link.url && !link.active ? link.url : null}
                        dangerouslySetInnerHTML={{
                            __html: link.label,
                        }}
                        className={`px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${
                            link.active
                                ? "bg-neutral-800 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-default"
                                : "text-gray-900 bg-white ring-1 ring-inset ring-gray-300 hover:bg-gray-100 hover:text-black cursor-pointer"
                        }`}
                    />
                );
            })}
        </div>
    );
}
