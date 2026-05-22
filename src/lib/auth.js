import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("pet_adoption");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  session:{
    cookieCache:{
      enabled: true,
      // strategy: "jwt",
      maxAge: 60 * 60 * 24 * 7, 
    }
  },
  plugins:[
    jwt()
  ],
  emailAndPassword: {
    enabled: true
  },
  account: {
    accountLinking: {
      enabled: true,        
      trustedProviders: ["google"],
      allowDifferentEmails: true
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://pet-adoption-platform-a188.vercel.app"
    // "http://localhost:3001", 
  ],
  // baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
  },
});