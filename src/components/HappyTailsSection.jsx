"use client";

const stories = [
    {
        emoji: "🐕‍🦺",
        title: "Bruno found his family",
        quote: "We adopted Bruno 6 months ago. He's the best thing that happened to our kids!",
        author: "Karim family, Dhaka",
    },
    {
        emoji: "🐱",
        title: "Mochi loves her new home",
        quote: "Mochi adjusted within a week. Can't imagine life without her.",
        author: "Nadia, Chittagong",
    },
    {
        emoji: "🦜",
        title: "Kiku talks all day!",
        quote: "He learned our names in 2 days. Absolutely incredible bird.",
        author: "Tanvir, Sylhet",
    },
];


import React from 'react';

const HappyTailsSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
 
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-amber-600 dark:text-amber-400 mb-3">
          Testimonials
        </p>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Happy Tails 💛
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base">
          Real families, real stories
        </p>
      </div>
 
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((item) => (
          <div
            key={item.title}
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-gray-900 transition-all duration-200 cursor-default"
          >
            <div className="text-4xl mb-5">{item.emoji}</div>
 
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
              {item.title}
            </h3>
 
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              &ldquo;{item.quote}&rdquo;{" "}
              <span className="text-gray-400 dark:text-gray-500 italic">
                — {item.author}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
    );
};

export default HappyTailsSection;


