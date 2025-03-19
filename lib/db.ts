import postgres from "postgres";

const db = postgres(process.env.DATABASE_URL as string);

export default db;