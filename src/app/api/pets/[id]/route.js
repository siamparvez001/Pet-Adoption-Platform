import { connectDB } from "@/lib/connectDB";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";

// Public — GET single pet
export async function GET(request, { params }) {
  const { id } = await params;
  const db = await connectDB();
  const pet = await db.collection("pet_collection").findOne({ _id: new ObjectId(id) });

  if (!pet) {
    return Response.json({ message: "Pet not found" }, { status: 404 });
  }
  return Response.json(pet);
}

// Private — PUT update pet
export async function PUT(request, { params }) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const db = await connectDB();
  const body = await request.json();

  const pet = await db.collection("pet_collection").findOne({ _id: new ObjectId(id) });
  if (pet.ownerEmail !== session.user.email) {
    return Response.json({ message: "Forbidden" }, { status: 403 });
  }

  await db.collection("pet_collection").updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...body, updatedAt: new Date() } }
  );
  return Response.json({ success: true });
}

// Private — DELETE pet
export async function DELETE(request, { params }) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const db = await connectDB();

  const pet = await db.collection("pet_collection").findOne({ _id: new ObjectId(id) });
  if (pet.ownerEmail !== session.user.email) {
    return Response.json({ message: "Forbidden" }, { status: 403 });
  }

  await db.collection("pet_collection").deleteOne({ _id: new ObjectId(id) });
  return Response.json({ success: true });
}