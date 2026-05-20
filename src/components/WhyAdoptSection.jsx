"use client";

const features = [
    {
        icon: "🛡️",
        title: "Verified Listings",
        desc: "Every pet owner and shelter goes through our verification process before they can post a listing.",
        bg: "bg-green-50",
        border: "border-green-200",
    },
    {
        icon: "💉",
        title: "Health Checked",
        desc: "Each pet profile includes full vaccination records and up-to-date health status information.",
        bg: "bg-blue-50",
        border: "border-blue-200",
    },
    {
        icon: "🤝",
        title: "Easy Process",
        desc: "Send a request, get approved by the owner, and arrange pickup — just three simple steps.",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
    },
];

import React from 'react';

const WhyAdoptSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">

            {/* Header */}
            <div className="mb-12">
                <p className="text-xs font-semibold tracking-widest uppercase text-green-700 mb-3">
                    Why Choose Us
                </p>
                <h2 className="text-4xl font-bold  mb-3">
                    Why Adopt from PawsHome?
                </h2>
                <p className="opacity-75 text-base max-w-md leading-relaxed">
                    We make the adoption process simple, transparent, and joyful for everyone involved.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((item) => (
                    <div
                        key={item.title}
                        className="bg-white border border-gray-200 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-default"
                    >
                        <div className={`w-14 h-14 rounded-xl ${item.bg} ${item.border} border flex items-center justify-center text-2xl mb-6`}>
                            {item.icon}
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {item.title}
                        </h3>

                        <p className="text-sm text-gray-500 leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyAdoptSection;




