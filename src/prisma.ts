import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.ts";
import dotenv from "dotenv"
dotenv.config()
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  idleTimeoutMillis: 100_00,
  connectionTimeoutMillis: 5,
  keepAlive: true,
});
export const prisma = new PrismaClient({
  adapter,
  log: [{ emit: "event", level: "query" }],
});
if (process.env.ENVIRONMENT === "Development") {
  prisma.$on("query", (e) => {
    console.log("Query duration :", e.duration); // how much time db query is taking
    console.log("Query :", e.query); // db exact running query
  });
}
