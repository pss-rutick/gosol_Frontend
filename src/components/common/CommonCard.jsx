import React from "react";

const CommonCard = ({ value, label, Icon, bgColor, textColor, Icon2 }) => {
    return (
        <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div>
                <h2 className={`text-2xl font-bold text-[#0000FF]`}>
                    {value}
                </h2>
                <p className="text-gray-500 text-xs font-medium mt-1">{label}</p>
            </div>
            <div className={`flex gap-2 p-3 rounded-lg ${bgColor ? bgColor : 'bg-gray-50'}`}>
                <Icon className={`h-5 w-5 ${textColor ? textColor : 'text-gray-600'}`} />
                {Icon2 && <Icon2 className={`h-5 w-5 ${textColor ? textColor : 'text-gray-600'}`} />}
            </div>
        </div>
    )
}

export default CommonCard