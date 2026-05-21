"use client";

import { authClient } from "@/lib/auth-client";
import { PlusCircle, ListChecks, ClipboardList } from "lucide-react";

const DashboardSidebar = ({ activeTab, setActiveTab }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    return (
        <aside className="w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-700 p-6 flex flex-col gap-6">

            {/* User info */}
            <div className="flex items-center gap-3 pb-6 border-b border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-300 font-bold text-lg">
                    {user?.name?.charAt(0) || "U"}
                </div>
                <div>
                    <p className="font-semibold dark:text-white">{user?.name || "User"}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Pet Owner</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-2">
                {[
                    { key: "listings", label: "My Listings", icon: <ListChecks className="w-4 h-4" /> },
                    { key: "add", label: "Add Pet", icon: <PlusCircle className="w-4 h-4" /> },
                    { key: "requests", label: "My Requests", icon: <ClipboardList className="w-4 h-4" /> },
                ].map((item) => (
                    <button
                        key={item.key}
                        onClick={() => setActiveTab(item.key)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === item.key
                                ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default DashboardSidebar;