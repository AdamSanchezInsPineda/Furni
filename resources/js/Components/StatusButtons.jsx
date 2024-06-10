import React from 'react';

const StatusButton = ({onClick, children}) => {
    return (
        <button
            onClick={onClick}
            className="h-12 py-2 px-4 text-neutral-700 border-2 border-neutral-700 hover:bg-neutral-700 hover:text-white rounded-lg font-bold transition-colors duration-300 ease-in-out"
        >
            {children}
        </button>
    );
};

export default StatusButton;
