// export const fetchPets = async (searchTerm = '') => {
//   // console.log();

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pet_collection?search=${searchTerm}`);
//   const data = await res.json();
//   return data || [];
// };

// export const fetchFeaturedPets = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`);
//   const data = await res.json();
//   return data || [];
// };

export const fetchPets = async (searchTerm = '') => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/pets?search=${searchTerm}`;
  console.log("Fetching from:", url); // ← এটা দিয়ে দেখো URL কী আসছে
  const res = await fetch(url);
  const data = await res.json();
  return data || [];
};