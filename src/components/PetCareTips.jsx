const tips = [
    {
        emoji: "🍎",
        title: "Balanced Nutrition",
        desc: "Feed species-appropriate food in measured portions. Avoid human food that can be toxic to pets.",
    },
    {
        emoji: "🏃",
        title: "Daily Exercise",
        desc: "Regular physical activity keeps your pet healthy and reduces destructive behavior.",
    },
    {
        emoji: "🏥",
        title: "Regular Vet Visits",
        desc: "Annual check-ups catch health issues early. Keep vaccinations and parasite prevention up to date.",
    },
    {
        emoji: "💕",
        title: "Mental Stimulation",
        desc: "Puzzle toys, training sessions and social interaction keep pets mentally sharp and happy.",
    },
    {
        emoji: "🛁",
        title: "Proper Grooming",
        desc: "Regular brushing, nail trims and baths (as needed) prevent health issues and keep pets comfortable.",
    },
    {
        emoji: "🏠",
        title: "Safe Environment",
        desc: "Pet-proof your home. Remove toxic plants, secure chemicals and create a cozy, safe space.",
    },
];


const PetCareTips = () => {
    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-20 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-14">
                    <span className="px-4 py-1.5 rounded-full border border-rose-300 dark:border-rose-700 text-rose-500 dark:text-rose-400 text-xs font-semibold mb-5">
                        Pet Care Guide
                    </span>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Expert{" "}
                        <span className="text-rose-400">Pet Care</span>{" "}
                        <span className="text-teal-500">Tips</span>
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 text-base max-w-md leading-relaxed">
                        Give your new companion the best life possible with these essential
                        care guidelines.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {tips.map((tip) => (
                        <div
                            key={tip.title}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                        >
                            <div className="text-3xl mt-0.5 shrink-0">{tip.emoji}</div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-1.5">
                                    {tip.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {tip.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PetCareTips;