import PetCard from "@/components/PetCard";
import PetsHeader from "@/components/PetsHeader";
import FilterSearch from "@/components/FilterSearch";
import { fetchPets } from "@/lib/pets/data";
import { MdOutlinePets } from "react-icons/md";
import Link from "next/link";

const PetsPage = async ({ searchParams }) => {
    const sParams = await searchParams;
    const pets = await fetchPets(
        sParams?.searchTerm || "",
        sParams?.species || "",
        sParams?.sortFee || ""
    );


    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-950">

            {/* Header */}
            <PetsHeader />

            <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">

                {/* Filter & Search */}
                <div className="mb-10">
                    <FilterSearch />
                </div>

                {/* Title */}
                <div className="flex items-center gap-2 mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
                        <MdOutlinePets className="w-6 h-6 text-green-600" />
                        All Pets
                    </h2>
                </div>

                {/* Pet Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pets?.map((pet) =>
                        <PetCard key={pet._id} pet={pet} />
                    )}
                </div>
                <div className="mt-12 p-6  rounded-lg flex flex-col items-center gap-4 text-center">
                    <div>
                        <h1 className="text-4xl font-bold dark:text-white my-2">Ready to find your perfect companion?</h1>
                        <p className="opacity-75">Thousands of pets are waiting for their forever homes.</p>
                    </div>
                    <div>
                        <Link href="/add-pet" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Add a Pet
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PetsPage;