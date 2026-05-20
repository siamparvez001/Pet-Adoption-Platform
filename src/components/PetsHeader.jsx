// import SearchBar from "./SearchBar";

// const PetsHeader = () => {
//     return (
//         <header className="bg-white border-b border-slate-200 py-16">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
//                     Explore Our{' '}
//                     <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-blue-800">Premium</span>{' '}
//                     Courses
//                 </h1>
//                 <p className="text-xl text-slate-500 max-w-2xl mx-auto">
//                     Find the perfect course to advance your career. Learn from the best experts in the field.
//                 </p>

//                 <div className="max-w-2xl mx-auto pt-4">
//                     <SearchBar />
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default PetsHeader;









import SearchBar from "./SearchBar";

const PetsHeader = () => {
    return (
        <header className="bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
                    Find Your{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
                        Perfect Pet
                    </span>
                </h1>
                <p className="text-xl text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">
                    Thousands of loving animals are waiting for the right family. Find your perfect companion today.
                </p>

                <div className="max-w-2xl mx-auto pt-4">
                    <SearchBar />
                </div>
            </div>
        </header>
    );
};

export default PetsHeader;