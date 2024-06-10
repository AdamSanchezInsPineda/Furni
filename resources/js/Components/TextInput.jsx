import {forwardRef, useEffect, useRef} from 'react';

export default forwardRef(function TextInput({
                                                 type = 'text',
                                                 className = '',
                                                 isFocused = false,
                                                 disabled = false,
                                                 ...props
                                             }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                {...props}
                type={type}
                disabled={disabled}
                className={
                    'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                    (disabled ? 'opacity-50 cursor-not-allowed ' : '') +
                    className
                }
                ref={input}
            />
        </div>
    );
});
