export const fetchPets = async (searchTerm = '', species = '', sortFee = '') => {
  const params = new URLSearchParams();
  if (searchTerm) params.set("searchTerm", searchTerm);
  if (species) params.set("species", species);
  if (sortFee) params.set("sortFee", sortFee);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/pets?${params.toString()}`;
  const res = await fetch(url, { cache: "no-store" });
  return await res.json() || [];
};

export const fetchPetById = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${id}`, { cache: "no-store" });
  return await res.json();
};

export const fetchFeaturedPets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`, { cache: "no-store" });
  const data = await res.json();
  return data?.slice(0, 6) || [];
};