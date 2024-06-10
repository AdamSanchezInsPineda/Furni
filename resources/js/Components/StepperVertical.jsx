import React from 'react';
import {FaCheck, FaXmark} from "react-icons/fa6";

export default function StepperVertical({currentStep, numberOfSteps, nameOfSteps}) {
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
        <div className="flex flex-col">
            {Array.from({length: numberOfSteps}).map((_, index) => (
                <React.Fragment key={index}>
                    <div className="flex flex-row">
                        <div className="flex flex-col items-center">
                            <div
                                className={`pt-2 text-center text-white font-bold w-10 h-10 rounded-full ${activeColor(index)}`}>
                                {currentStep === -1 && index < 3 ?
                                    <FaXmark className="ml-2 w-6 h-6"/> : currentStep >= index ?
                                        <FaCheck className="ml-2 w-6 h-6"/> : index + 1}
                            </div>
                            {isFinalStep(index) ? null : <div
                                className={`w-1 h-28 my-2 ${activeColorLine(index)}`}/>}
                        </div>
                        <div className="flex text-start mt-2 ml-2">
                            <p className="font-bold max-lg:hidden">{nameOfSteps[index].charAt(0).toUpperCase() + nameOfSteps[index].slice(1).toLowerCase()}</p>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}
