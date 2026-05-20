
import PetCard from "@/components/PetCard";
import PetsHeader from "@/components/PetsHeader";
import { fetchPets } from "@/lib/pets/data";
import { Filter } from "lucide-react";
import { MdOutlinePets } from "react-icons/md";

const PetsPage = async ({ searchParams }) => {
    const sParams = await searchParams;
    const pets = await fetchPets(sParams?.searchTerm || "");

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-950">

            {/* Header */}
            <PetsHeader />

            <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
                        <MdOutlinePets className="w-6 h-6 text-green-600" />
                        All Pets
                    </h2>
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-bold transition-colors"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pets?.map((pet) =>
                        <PetCard key={pet._id} pet={pet} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default PetsPage;