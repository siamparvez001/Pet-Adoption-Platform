"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const speciesEmoji = {
    Dog: "🐕",
    Cat: "🐱",
    Bird: "🦜",
    Rabbit: "🐰",
    Other: "🐾",
};

const statusStyle = {
    pending: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300",
    approved: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300",
    rejected: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300",
};

const MyRequests = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        if (!user?.email) return;
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/adoption-requests?email=${user.email}`
            );
            const data = await res.json();
            setRequests(data);
        } catch (err) {
            toast.error("Failed to load requests.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [user]);

    const handleCancel = async (id) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/adoption-requests/${id}`,
                { method: "DELETE" }
            );
            if (res.ok) {
                toast.success("Request cancelled.");
                setRequests(requests.filter((r) => r._id !== id));
            } else {
                toast.error("Failed to cancel request.");
            }
        } catch (err) {
            toast.error("Server error.");
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-gray-400 dark:text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold dark:text-white mb-8">My Requests</h1>

            {requests.length === 0 ? (
                <div className="text-center py-20 text-gray-400 dark:text-gray-500">
                    <p className="text-5xl mb-4">🐾</p>
                    <p className="text-lg">No adoption requests yet.</p>
                </div>
            ) : (
                <div className="rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-5 px-6 py-3 bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                        <span>Pet</span>
                        <span>Request Date</span>
                        <span>Pickup Date</span>
                        <span>Status</span>
                        <span>Actions</span>
                    </div>

                    {/* Rows */}
                    {requests.map((req, index) => (
                        <div
                            key={req._id}
                            className={`grid grid-cols-5 items-center px-6 py-4 ${index !== requests.length - 1
                                    ? "border-b border-gray-100 dark:border-gray-700"
                                    : ""
                                } bg-white dark:bg-gray-900`}
                        >
                            {/* Pet */}
                            <div className="flex items-center gap-2 font-semibold text-gray-800 dark:text-white">
                                <span className="text-xl">
                                    {speciesEmoji[req.petSpecies] || "🐾"}
                                </span>
                                {req.petName}
                            </div>

                            {/* Request Date */}
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(req.requestDate || req._id?.toString().substring(0, 8)
                                    ? new Date(parseInt(req._id?.substring(0, 8), 16) * 1000).toISOString()
                                    : null)}
                            </span>

                            {/* Pickup Date */}
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(req.pickupDate)}
                            </span>

                            {/* Status */}
                            <span className={`w-fit px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyle[req.status?.toLowerCase()] || statusStyle.pending
                                }`}>
                                {req.status || "Pending"}
                            </span>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Link
                                    href={`/pets/${req.petId}`}
                                    className="px-4 py-1.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Go View
                                </Link>
                                {req.status?.toLowerCase() === "pending" && (
                                    <button
                                        onClick={() => handleCancel(req._id)}
                                        className="px-4 py-1.5 rounded-xl border border-red-200 dark:border-red-800 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRequests;