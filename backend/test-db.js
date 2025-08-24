import oracledb from "oracledb";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_CONNECT:", process.env.DB_CONNECT);

try {
  const conn = await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectString: process.env.DB_CONNECT
  });
  console.log("✅ Connected to Oracle!");
  await conn.close();
} catch (err) {
  console.error("❌ Oracle connection failed:", err);
}
