const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://pet-adoption-platform-server-seven.vercel.app";

export const fetchPets = async (searchTerm = '', species = '', sortFee = '') => {
  const params = new URLSearchParams();
  if (searchTerm) params.set("searchTerm", searchTerm);
  if (species) params.set("species", species);
  if (sortFee) params.set("sortFee", sortFee);

  try {
    const res = await fetch(`${BASE_URL}/pets?${params.toString()}`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [];
  }
};

export const fetchPetById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/pets/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const fetchFeaturedPets = async () => {
  try {
    const res = await fetch(`${BASE_URL}/pets`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.slice(0, 6) || [];
  } catch (err) {
    return [];
  }
};