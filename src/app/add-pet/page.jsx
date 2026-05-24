"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";
import MyRequests from "@/components/MyRequests";
import MyListings from "@/components/MyListings";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Menu, X } from "lucide-react";

const AddPetPage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [activeTab, setActiveTab] = useState("add");
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [form, setForm] = useState({
        name: "",
        species: "Dog",
        breed: "",
        age: "",
        gender: "Male",
        location: "",
        image: "",
        healthStatus: "Healthy",
        vaccinationStatus: "Vaccinated",
        adoptionFee: "",
        description: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    adoptionFee: Number(form.adoptionFee),
                    ownerEmail: user?.email,
                    status: "available",
                }),
            });
            if (res.ok) {
                toast.success("Pet added successfully! 🐾");
                setForm({
                    name: "",
                    species: "Dog",
                    breed: "",
                    age: "",
                    gender: "Male",
                    location: "",
                    image: "",
                    healthStatus: "Healthy",
                    vaccinationStatus: "Vaccinated",
                    adoptionFee: "",
                    description: "",
                });
                setActiveTab("listings");
            } else {
                toast.error("Something went wrong. Try again.");
            }
        } catch (err) {
            toast.error("Server error. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-green-500 transition";
    const labelClass = "text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block";

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed md:static z-30 h-full transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}>
                <DashboardSidebar
                    activeTab={activeTab}
                    setActiveTab={(tab) => {
                        setActiveTab(tab);
                        setSidebarOpen(false);
                    }}
                />
            </div>

            <main className="flex-1 p-4 md:p-10 overflow-y-auto">

                {/* Mobile top bar */}
                <div className="flex items-center gap-3 mb-6 md:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 dark:text-white"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <h2 className="font-semibold dark:text-white capitalize">{activeTab}</h2>
                </div>

                {activeTab === "listings" && <MyListings setActiveTab={setActiveTab} />}

                {activeTab === "add" && (
                    <div className="max-w-3xl">
                        <h1 className="text-3xl font-bold dark:text-white mb-8">Add New Pet</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Pet name</label>
                                    <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Bruno" required className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Species</label>
                                    <select name="species" value={form.species} onChange={handleChange} className={inputClass}>
                                        <option>Dog</option>
                                        <option>Cat</option>
                                        <option>Bird</option>
                                        <option>Rabbit</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Breed</label>
                                    <input name="breed" value={form.breed} onChange={handleChange} placeholder="Golden Retriever" required className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Age</label>
                                    <input name="age" value={form.age} onChange={handleChange} placeholder="2 years" required className={inputClass} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Gender</label>
                                    <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Location</label>
                                    <input name="location" value={form.location} onChange={handleChange} placeholder="Dhaka" required className={inputClass} />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Image URL (imgbb / postimage)</label>
                                <input name="image" value={form.image} onChange={handleChange} placeholder="https://i.ibb.co/..." className={inputClass} />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Health status</label>
                                    <select name="healthStatus" value={form.healthStatus} onChange={handleChange} className={inputClass}>
                                        <option>Healthy</option>
                                        <option>Sick</option>
                                        <option>Recovering</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Vaccination status</label>
                                    <select name="vaccinationStatus" value={form.vaccinationStatus} onChange={handleChange} className={inputClass}>
                                        <option>Vaccinated</option>
                                        <option>Not Vaccinated</option>
                                        <option>Partially Vaccinated</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Adoption fee (৳)</label>
                                    <input name="adoptionFee" value={form.adoptionFee} onChange={handleChange} type="number" placeholder="2000" required className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Owner email</label>
                                    <input value={user?.email || ""} disabled placeholder="auto" className={`${inputClass} bg-gray-100 dark:bg-gray-700 cursor-not-allowed`} />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Description</label>
                                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Bruno is a friendly, playful dog..." rows={4} className={inputClass} />
                            </div>

                            <button type="submit" disabled={loading} className="w-fit px-10 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl transition-colors disabled:opacity-50">
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </form>
                    </div>
                )}

                {activeTab === "requests" && <MyRequests />}
            </main>
        </div>
    );
};

export default AddPetPage;