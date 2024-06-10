import React from 'react';
import {FaCheck, FaXmark} from "react-icons/fa6";

export default function Stepper({currentStep, numberOfSteps, nameOfSteps}) {
    const activeColor = (index) => {
        if (currentStep === -1) {
            return 'bg-red-500';
        }
        if (currentStep === numberOfSteps - 1) {
            return 'bg-green-500';
        }
        return currentStep >= index ? 'bg-blue-500' : 'bg-gray-500';
    }
    const activeColorLine = (index) => {
        if (currentStep === -1) {
            return 'bg-red-500';
        }
        if (currentStep === numberOfSteps - 1) {
            return 'bg-green-500';
        }
        return currentStep >= index ? 'bg-blue-300' : 'bg-gray-300';
    }
    const isFinalStep = (index) => index === numberOfSteps - 1

    return (
        <div className="flex items-center">
            {Array.from({length: numberOfSteps}).map((_, index) => (
                <React.Fragment key={index}>
                    <div className="flex flex-col justify-center gap-2">
                        <div className="flex flex-row items-center gap-2 mr-2 ml-4">
                            <div
                                className={`pt-2 text-center text-white font-bold w-10 h-10 rounded-full ${activeColor(index)}`}>
                                {currentStep === -1 && index < 3 ?
                                    <FaXmark className="ml-2 w-6 h-6"/> : currentStep >= index ?
                                        <FaCheck className="ml-2 w-6 h-6"/> : index + 1}
                            </div>
                            {isFinalStep(index) ? null : <div
                                className={`w-36 h-1 ml-4 max-[1280px]:w-56 max-[1060px]:w-28 max-[515px]:w-20 max-[452px]:w-8 ${activeColorLine(index)}`}/>}
                        </div>
                        <div
                            className="flex text-center font-bold max-[900px]:hidden">{nameOfSteps[index].charAt(0).toUpperCase() + nameOfSteps[index].slice(1).toLowerCase()}</div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}
