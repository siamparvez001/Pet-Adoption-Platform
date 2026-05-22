import { connectDB } from "@/lib/connectDB";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";

// Public — GET single pet
export async function GET(request, { params }) {
  const db = await connectDB();
  const pet = await db.collection("pets").findOne({ _id: new ObjectId(params.id) });

  if (!pet) {
    return Response.json({ message: "Pet not found" }, { status: 404 });
  }
  return Response.json(pet);
}

// Private — PUT update pet (JWT protected)
export async function PUT(request, { params }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const db = await connectDB();
  const body = await request.json();

  // শুধু owner update করতে পারবে
  const pet = await db.collection("pets").findOne({ _id: new ObjectId(params.id) });
  if (pet.ownerEmail !== session.user.email) {
    return Response.json({ message: "Forbidden" }, { status: 403 });
  }

  await db.collection("pets").updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { ...body, updatedAt: new Date() } }
  );
  return Response.json({ success: true });
}

// Private — DELETE pet (JWT protected)
export async function DELETE(request, { params }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const db = await connectDB();

  // শুধু owner delete করতে পারবে
  const pet = await db.collection("pets").findOne({ _id: new ObjectId(params.id) });
  if (pet.ownerEmail !== session.user.email) {
    return Response.json({ message: "Forbidden" }, { status: 403 });
  }

  await db.collection("pets").deleteOne({ _id: new ObjectId(params.id) });
  return Response.json({ success: true });
}