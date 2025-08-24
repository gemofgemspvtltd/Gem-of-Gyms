
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.js";   // default export from routes/auth.js
import members from './routes/members.js';   // make sure members.js has export default
import dashboard from './routes/dashboard.js'; // same for dashboard.js

import { initPool, closePool } from './db.js';

dotenv.config();
console.log("DB_CONNECT =", process.env.DB_CONNECT);
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/members", members);
app.use("/api/dashboard", dashboard);

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message });
});

// Start server after DB pool is ready
const PORT = process.env.PORT || 5000;
let server;

initPool()
  .then(() => {
    server = app.listen(PORT, () => {
      console.log(`API running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Oracle pool error:', err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGINT', async () => {
  await closePool();
  server?.close(() => process.exit(0));
});
console.log("DB_CONNECT =", process.env.DB_CONNECT);



import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

console.log("DB_USER =", process.env.DB_USER);
console.log("DB_PASS =", process.env.DB_PASS ? "*****" : "MISSING");
console.log("DB_CONNECT =", process.env.DB_CONNECT);
