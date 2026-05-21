export const fetchPets = async (searchTerm = '', species = '', sortFee = '') => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("searchTerm", searchTerm);
    if (species) params.set("species", species);
    if (sortFee) params.set("sortFee", sortFee);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/pets?${params.toString()}`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return data || [];
};

export const fetchFeaturedPets = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/featured`;
  const res = await fetch(url);
  const data = await res.json();
  return data || [];
};