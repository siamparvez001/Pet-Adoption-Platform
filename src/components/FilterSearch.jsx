"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

const FilterSearch = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("searchTerm") || "");
    const [species, setSpecies] = useState(searchParams.get("species") || "");
    const [sortFee, setSortFee] = useState(searchParams.get("sortFee") || "");

    const updateURL = (newSearch, newSpecies, newSortFee) => {
        const params = new URLSearchParams();
        if (newSearch) params.set("searchTerm", newSearch);
        if (newSpecies) params.set("species", newSpecies);
        if (newSortFee) params.set("sortFee", newSortFee);
        router.push(`/pets?${params.toString()}`);
    };

    // real-time search — 400ms debounce
    const debouncedSearch = useDebouncedCallback((value) => {
        updateURL(value, species, sortFee);
    }, 400);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        debouncedSearch(e.target.value);
    };

    const handleSpeciesChange = (e) => {
        setSpecies(e.target.value);
        updateURL(search, e.target.value, sortFee);
    };

    const handleSortChange = (e) => {
        setSortFee(e.target.value);
        updateURL(search, species, e.target.value);
    };

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm">

            {/* Title */}
            <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-rose-500" />
                <h3 className="font-bold text-gray-800 dark:text-white">Filter & Search</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Search by name */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 dark:text-gray-400">Search by name</label>
                    <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-green-500 transition">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            value={search}
                            onChange={handleSearchChange}
                            type="text"
                            placeholder="Search pets..."
                            className="flex-1 outline-none bg-transparent text-sm text-gray-700 dark:text-white placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* Filter by species */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 dark:text-gray-400">Filter by species</label>
                    <select
                        value={species}
                        onChange={handleSpeciesChange}
                        className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-green-500 transition"
                    >
                        <option value="">All Species</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Rabbit">Rabbit</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Sort by fee */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500 dark:text-gray-400">Sort by fee</label>
                    <select
                        value={sortFee}
                        onChange={handleSortChange}
                        className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-green-500 transition"
                    >
                        <option value="">Default</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>
                </div>

            </div>
        </div>
    );
};

export default FilterSearch;