
"use client";

import Image from "next/image";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { DollarSign } from "lucide-react";
import toast from "react-hot-toast";

const speciesEmoji = {
    Dog: "🐕",
    Cat: "🐱",
    Bird: "🦜",
    Rabbit: "🐰",
    Other: "🐾",
};

const PetCard = ({ pet }) => {
    
    const isAdopted = pet.status?.toLowerCase() === "adopted";

    const handleAdoptClick = () => {
        toast.error("This pet has already been adopted!", {
            icon: "🐾",
            style: {
                borderRadius: "12px",
                fontWeight: "500",
            },
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col">

            {/* Image */}
            <div className="relative w-full h-52 overflow-hidden">
                <Image
                    src={pet.image || "/pet.jpeg"}
                    alt={pet.name}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-[3200ms]"
                />

                {/* Species badge — top left */}
                <span className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-sm">
                    {speciesEmoji[pet.species] || "🐾"} {pet.species}
                </span>

                {/* Status badge — top right */}
                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${isAdopted
                    ? "bg-red-100 text-red-600 dark:bg-red-900/60 dark:text-red-300"
                    : "bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300"
                    }`}>
                    {isAdopted ? "⊘ Adopted" : "✓ Available"}
                </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-2 flex-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {pet.name}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {pet.breed} • {pet.age} old • {pet.gender}
                </p>

                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <IoLocationOutline className="text-rose-400" />
                    {pet.location}
                </div>

                <div className="flex items-center gap-1 text-sm font-semibold text-rose-500 dark:text-rose-400">
                    <DollarSign size={14} />
                    {pet.adoptionFee === 0 ? "Free" : `৳${Number(pet.adoptionFee).toLocaleString()} adoption fee`}
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 dark:border-gray-700" />

            {/* Buttons */}
            <div className="flex gap-3 p-4">
                <Link
                    href={`/pets/${pet._id}`}
                    className="flex-1 text-center py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    View Details
                </Link>

                {isAdopted ? (
                    <button
                        onClick={handleAdoptClick}
                        className="flex-1 py-2 rounded-xl text-sm font-semibold bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    >
                        Adopted
                    </button>
                ) : (
                    <Link
                        href={`/pets/${pet._id}`}
                        className="flex-1 text-center py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-teal-500 hover:opacity-90 transition-opacity"
                    >
                        Adopt Now
                    </Link>
                )}
            </div>
        </div>
    );
};

export default PetCard;