import { fetchFeaturedPets } from "@/lib/pets/data";
import FeaturedCard from "./FeaturedCard";
import Link from "next/link";

const FeaturedSection = async () => {
    const pets = await fetchFeaturedPets();

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">
                Featured Pets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pets?.map((pet) => (
                    <FeaturedCard key={pet._id} pet={pet} />
                ))}
            </div>
            <div className="text-center mt-10 rounded-lg bg-rose-100 dark:bg-rose-900 p-4 w-fit mx-auto">
                <Link href="/pets" className="text-rose-500 hover:text-rose-600 dark:text-white dark:hover:text-rose-300 font-semibold">
                    View All Pets
                </Link>
            </div>
        </section>
    );
};

export default FeaturedSection;