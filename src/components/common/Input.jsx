// src/components/common/Input.jsx
import React from "react";

function Input({ inputProps, showPasswordToggle, onTogglePassword, isPasswordVisible }) {
    const { type, placeholder, lable, value, onChange, errors, isDisabled, name } = inputProps;

    // Determine the actual input type
    const inputType = showPasswordToggle && type === "password"
        ? (isPasswordVisible ? "text" : "password")
        : type;

    return (
        <div>
            {lable &&
                <label className="block mb-1 text-sm font-medium">
                    {lable}
                </label>
            }
            <div className="relative">
                <input
                    type={inputType}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={isDisabled}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 border pr-12
                          ${errors ? 'border-red-500' : 'border-gray-200'}
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-500 disabled:opacity-50`}
                />

                {/* Password Toggle Button */}
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={onTogglePassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {isPasswordVisible ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
            {errors && <p className="text-red-500 text-xs mt-1">{errors}</p>}
        </div>
    )
}

export default Input;
