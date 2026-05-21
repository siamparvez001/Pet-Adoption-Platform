"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { MapPin } from "lucide-react";

const PetDetailsPage = () => {
    const { id } = useParams();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        pickupDate: "",
        message: "",
    });

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${id}`);
                const data = await res.json();
                setPet(data);
            } catch (err) {
                toast.error("Failed to load pet details.");
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchPet();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please sign in to submit an adoption request.");
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adoption-requests`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    petId: id,
                    petName: pet.name,
                    requesterName: user.name,
                    requesterEmail: user.email,
                    ownerEmail: pet.ownerEmail,
                    pickupDate: form.pickupDate,
                    message: form.message,
                    status: "pending",
                }),
            });
            if (res.ok) {
                toast.success("Adoption request submitted! 🐾");
                setForm({ pickupDate: "", message: "" });
            } else {
                toast.error("Something went wrong. Try again.");
            }
        } catch (err) {
            toast.error("Server error. Try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
                <p className="text-gray-500 dark:text-gray-400 text-lg">Loading...</p>
            </div>
        );
    }

    if (!pet) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
                <p className="text-gray-500 dark:text-gray-400 text-lg">Pet not found.</p>
            </div>
        );
    }

    const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-green-500 transition";
    const labelClass = "text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block";

    const infoBox = (label, value, valueClass = "") => (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{label}</p>
            <p className={`font-semibold text-gray-900 dark:text-white ${valueClass}`}>{value}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 py-12 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* Left — Pet Details */}
                <div className="flex flex-col gap-6">

                    {/* Image */}
                    <div className="relative w-full h-80 rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <Image
                            src={pet.image || "/pet.jpeg"}
                            alt={pet.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Name & Meta */}
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {pet.name}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            {pet.breed} · Listed by {pet.ownerEmail?.split("@")[0]} ·
                            <MapPin className="w-4 h-4 text-rose-400 inline ml-1" />
                            {pet.location}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                            {pet.vaccinationStatus}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                            {pet.healthStatus}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                            {pet.gender}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                            {pet.age} old
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {pet.description}
                    </p>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {infoBox("Species", pet.species)}
                        {infoBox("Breed", pet.breed)}
                        {infoBox("Age", pet.age)}
                        {infoBox("Gender", pet.gender)}
                        {infoBox("Vaccination", pet.vaccinationStatus, "text-green-600 dark:text-green-400")}
                        {infoBox("Adoption Fee", `৳ ${Number(pet.adoptionFee).toLocaleString()}`, "text-green-600 dark:text-green-400")}
                        {infoBox("Location", pet.location)}
                        {infoBox("Status", pet.status === "available" ? "Available" : "Adopted",
                            pet.status === "available" ? "text-green-600 dark:text-green-400" : "text-red-500"
                        )}
                    </div>
                </div>

                {/* Right — Adoption Request Form */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 h-fit">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Submit Adoption Request
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* Pet name (read only) */}
                        <div>
                            <label className={labelClass}>Pet name</label>
                            <input
                                value={`${pet.name} (read only)`}
                                disabled
                                className={`${inputClass} bg-gray-100 dark:bg-gray-700 cursor-not-allowed`}
                            />
                        </div>

                        {/* Your name (read only) */}
                        <div>
                            <label className={labelClass}>Your name</label>
                            <input
                                value={user ? `${user.name} (read only)` : "Please sign in"}
                                disabled
                                className={`${inputClass} bg-gray-100 dark:bg-gray-700 cursor-not-allowed`}
                            />
                        </div>

                        {/* Your email (read only) */}
                        <div>
                            <label className={labelClass}>Your email</label>
                            <input
                                value={user ? `${user.email} (read only)` : "Please sign in"}
                                disabled
                                className={`${inputClass} bg-gray-100 dark:bg-gray-700 cursor-not-allowed`}
                            />
                        </div>

                        {/* Pickup date */}
                        <div>
                            <label className={labelClass}>Preferred pickup date</label>
                            <input
                                type="date"
                                value={form.pickupDate}
                                onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className={labelClass}>Message to owner</label>
                            <textarea
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                placeholder="I would love to adopt Bruno. We have a big yard..."
                                rows={4}
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* Info note */}
                        <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 rounded-xl px-4 py-3 text-sm text-teal-700 dark:text-teal-300">
                            🗒️ Request will be submitted as <strong>Pending</strong> until the owner reviews it.
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting || !user || pet.status !== "available"}
                            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? "Submitting..." : "Submit Request"}
                        </button>

                        {!user && (
                            <p className="text-center text-sm text-red-500">
                                Please sign in to submit an adoption request.
                            </p>
                        )}
                    </form>
                </div>

            </div>
        </div>
    );
};

export default PetDetailsPage;