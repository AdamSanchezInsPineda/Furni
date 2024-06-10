import {useEffect, useState} from "react";
import {FaStar} from "react-icons/fa";

export default function Rate({
                                 totalStars = 5,
                                 initialValue,
                                 onChange,
                                 disabled = false,
                                 className = ''
                             }) {
    const [rating, setRating] = useState(initialValue);
    totalStars = Math.round(totalStars);
    useEffect(() => {
        if (onChange) onChange(initialValue);
    }, []);

    const handleClick = (index) => {
        if (!disabled) {
            const rate = index + 1;
            setRating(rate);
            if (onChange) onChange(rate);
        }
    };

    return (
        <div>
            {[...Array(totalStars)].map((_, index) => {
                const filled = index < rating;
                return (
                    <FaStar
                        key={index}
                        className={`${
                            disabled ? "" : "cursor-pointer"
                        } inline-block ${
                            filled ? "text-yellow-400" : "text-gray-400"
                        } ` + className}
                        onClick={() => handleClick(index)}
                    />
                );
            })}
        </div>
    );
}
