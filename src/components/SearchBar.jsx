
// "use client";

// import { Search } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";

// import { useState } from "react";

// const SearchBar = () => {
//   const [search, setSearch] = useState();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   // console.log(searchParams);

//   const handleSearch = () => {
//     const params = new URLSearchParams(searchParams.toString())
//     // ?filter= ?searchTerm=node
//     if (search) {
//       params.set("searchTerm", search)
//     } else {
//       params.delete("searchTerm")
//     }
//     router.push(`/pet_collection?${params.toString()}`)


//   }

//   return (
//     <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:ring-4 focus-within:ring-blue-600/10 focus-within:border-blue-600 transition-all overflow-hidden">

//       <div className="pl-5 text-slate-400">
//         <Search className="w-5 h-5" />
//       </div>

//       <input
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         type="text"
//         placeholder="Search for courses (e.g. Next.js, Web Design...)"
//         className="flex-1 h-14 px-4 outline-none bg-transparent text-slate-700 placeholder:text-slate-400"
//       />

//       <button
//         onClick={handleSearch}
//         className="h-10 px-6 mr-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"

//       >
//         Search
//       </button>
//     </div>
//   );
// };

// export default SearchBar;








"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("searchTerm", search);
    } else {
      params.delete("searchTerm");
    }
    router.push(`/pets?${params.toString()}`);
  };

  return (
    <div className="relative flex items-center bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-2xl shadow-sm focus-within:ring-4 focus-within:ring-green-600/10 focus-within:border-green-600 transition-all overflow-hidden">

      <div className="pl-5 text-slate-400 dark:text-gray-400">
        <Search className="w-5 h-5" />
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search for pets (e.g. Dog, Cat...)"
        className="flex-1 h-14 px-4 outline-none bg-transparent text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500"
      />

      <button
        onClick={handleSearch}
        className="h-10 px-6 mr-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;