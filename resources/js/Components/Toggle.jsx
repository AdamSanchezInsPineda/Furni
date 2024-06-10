import React, {useState} from "react";

export default function Toggle({
                                   onChange,
                                   initialChecked = false,
                                   textArray = ['Admin', 'Status']
                               }) {
    const [isChecked, setIsChecked] = useState(initialChecked);

    const handleToggleChange = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        onChange(newState);
    };

    const getText = () => {
        if (textArray.includes('Admin')) {
            return isChecked ? 'Admin' : 'User';
        } else if (textArray.includes('Status')) {
            return isChecked ? 'Activate' : 'Deactivate';
        } else if (textArray.includes('Validated')) {
            return isChecked ? 'Validated' : 'Not validated';
        }
    };

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={isChecked}
                onChange={handleToggleChange}
            />
            <div
                className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 text-nowrap">
                 {getText()}
           </span>
        </label>
    );
}
