
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import tenantRoutes from './routes/tenant.js';
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
app.use('/api/tenants', tenantRoutes);

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

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.join(__dirname, "../.env") });

// console.log("DB_USER =", process.env.DB_USER);
// console.log("DB_PASS =", process.env.DB_PASS ? "*****" : "MISSING");
// console.log("DB_CONNECT =", process.env.DB_CONNECT);



// const app = express();

// // const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/dashboard', dashboardRoutes);

// // Test route
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'Backend is working!' });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`📋 Test endpoint: http://localhost:${PORT}/api/test`);
// });

// import express from 'express';
// import cors from 'cors';

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Test route
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'Backend is working!' });
// });

// // Basic auth routes (you can add these back when you create auth.js)
// app.post('/api/auth/signup', (req, res) => {
//   console.log('Signup request:', req.body);
//   res.json({ message: 'Signup endpoint working (mock)' });
// });

// app.post('/api/auth/login', (req, res) => {
//   console.log('Login request:', req.body);
//   res.json({ message: 'Login endpoint working (mock)' });
//   const { username, password } = req.body;
  // IMPORTANT: Update these column names to match your actual database
//     const userResult = await execute(`
//       SELECT USERNAME, PASSWORD_HASH, NAME, EMAIL 
//       FROM USERS 
//       WHERE USERNAME = :username
//     `, { username });
    
//     // If no user found
//     if (userResult.length === 0) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
    
//     const user = userResult[0];
    
//     // For now, let's do simple password check (not recommended for production)
//     if (password !== user.PASSWORD_HASH) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
    
//     res.json({
//       message: 'Login successful',
//       user: {
//         username: user.USERNAME,
//         name: user.NAME,
//         email: user.EMAIL
//       }
//     });
    
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ 
//       message: 'Login failed',
//       error: error.message 
//     });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📋 Test endpoint: http://localhost:${PORT}/api/test`);
// });
