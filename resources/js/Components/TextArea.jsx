import {forwardRef, useEffect, useRef} from "react";

export default forwardRef(function TextArea(
    {type = "text", className = "", isFocused = false, ...props},
    ref
) {
    const inputRef = ref || useRef();

    useEffect(() => {
        if (isFocused) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <div className="flex flex-col items-start">
            <textarea
                {...props}
                type={type}
                className={`border-gray-300 focus:border-indigo-500
                            focus:ring-indigo-500 rounded-md shadow-sm ${className}`}
                ref={inputRef}
            />
        </div>
    );
});
