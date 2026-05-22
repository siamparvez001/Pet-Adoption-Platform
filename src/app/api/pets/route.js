import { connectDB } from "@/lib/connectDB";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Public — GET all pets
export async function GET(request) {
  const db = await connectDB();
  const { searchParams } = new URL(request.url);

  const searchTerm = searchParams.get("searchTerm") || "";
  const species = searchParams.get("species") || "";
  const sortFee = searchParams.get("sortFee") || "";

  const query = {};
  if (searchTerm) query.name = { $regex: searchTerm, $options: "i" };
  if (species) query.species = { $in: species.split(",") };

  let sortOption = { _id: -1 };
  if (sortFee === "fee_low") sortOption = { adoptionFee: 1 };
  if (sortFee === "fee_high") sortOption = { adoptionFee: -1 };

  const pets = await db.collection("pets").find(query).sort(sortOption).toArray();
  return Response.json(pets);
}

// Private — POST add pet (JWT protected)
export async function POST(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const db = await connectDB();
  const body = await request.json();

  const newPet = {
    ...body,
    ownerEmail: session.user.email,
    status: "available",
    createdAt: new Date(),
  };

  const result = await db.collection("pets").insertOne(newPet);
  return Response.json({ success: true, insertedId: result.insertedId }, { status: 201 });
}