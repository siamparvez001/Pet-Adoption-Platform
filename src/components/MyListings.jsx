"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Trash2, Plus } from "lucide-react";

const speciesEmoji = {
    Dog: "🐕",
    Cat: "🐱",
    Bird: "🦜",
    Rabbit: "🐰",
    Other: "🐾",
};

const MyListings = ({ setActiveTab }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyPets = async () => {
        if (!user?.email) return;
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/pets?ownerEmail=${user.email}`
            );
            const data = await res.json();
            setPets(data);
        } catch (err) {
            toast.error("Failed to load listings.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyPets();
    }, [user]);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this pet?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                toast.success("Pet deleted.");
                setPets(pets.filter((p) => p._id !== id));
            } else {
                toast.error("Failed to delete.");
            }
        } catch (err) {
            toast.error("Server error.");
        }
    };

    const total = pets.length;
    const available = pets.filter((p) => p.status?.toLowerCase() === "available").length;
    const adopted = pets.filter((p) => p.status?.toLowerCase() === "adopted").length;

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-gray-400 dark:text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold dark:text-white">My Listings</h1>
                <button
                    onClick={() => setActiveTab("add")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Pet
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                    <p className="text-3xl font-bold text-blue-500">{total}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total listings</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                    <p className="text-3xl font-bold text-green-500">{available}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Available</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                    <p className="text-3xl font-bold text-orange-400">{adopted}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Adopted</p>
                </div>
            </div>

            {/* Pet Cards */}
            {pets.length === 0 ? (
                <div className="text-center py-20 text-gray-400 dark:text-gray-500">
                    <p className="text-5xl mb-4">🐾</p>
                    <p className="text-lg">No pets listed yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pets.map((pet) => {
                        const isAvailable = pet.status?.toLowerCase() === "available";
                        return (
                            <div
                                key={pet._id}
                                className={`rounded-2xl border overflow-hidden flex ${
                                    isAvailable
                                        ? "bg-teal-50 dark:bg-teal-900/10 border-teal-100 dark:border-teal-800"
                                        : "bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800"
                                }`}
                            >
                                {/* Image */}
                                <div className="relative w-36 h-full min-h-[180px] flex-shrink-0 flex items-center justify-center">
                                    {pet.image ? (
                                        <Image
                                            src={pet.image}
                                            alt={pet.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <span className="text-5xl">
                                            {speciesEmoji[pet.species] || "🐾"}
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-between p-4 flex-1 gap-3">
                                    <div>
                                        <h3 className="text-xl font-bold dark:text-white">{pet.name}</h3>
                                        <p className="text-green-600 dark:text-green-400 font-semibold">
                                            ৳ {Number(pet.adoptionFee).toLocaleString()}
                                        </p>
                                        <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold ${
                                            isAvailable
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                                : "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                                        }`}>
                                            {isAvailable ? "Available" : "Adopted"}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            href={`/pets/${pet._id}`}
                                            className="px-4 py-1.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm text-center text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/pets/${pet._id}/edit`}
                                                className="flex-1 px-4 py-1.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm text-center text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(pet._id)}
                                                className="px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyListings;