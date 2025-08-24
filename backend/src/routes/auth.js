// import express from "express";
// import oracledb from "oracledb";
// import { Router } from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { execute } from '../db.js';
// export const auth = Router();
// auth.post('/signup', async (req, res)=>{
//   try{
//     const { username, password, name, mobile, email } = req.body;
//     if(!username || !password) return res.status(400).json({message:'username and password required'});
//     const hash = await bcrypt.hash(password, 10);
//     await execute(`INSERT INTO USERS (ID, USERNAME, PASSWORD_HASH, NAME, MOBILE, EMAIL, CREATED_AT)
//                    VALUES (USERS_SEQ.NEXTVAL, :username, :hash, :name, :mobile, :email, SYSDATE)`,
//                    { username, hash, name, mobile, email });
//     res.json({ message:'User created' });
//   }catch(e){ console.error(e); res.status(500).json({message:'Signup failed'}); }
// });
// auth.post('/login', async (req, res)=>{
//   try{
//     const { username, password } = req.body;
//     if(!username || !password) return res.status(400).json({message:'username and password required'});
//     const r = await execute(`SELECT ID, USERNAME, PASSWORD_HASH, NAME, MOBILE, EMAIL FROM USERS WHERE USERNAME=:u OR EMAIL=:u`, { u: username });
//     const user = r.rows?.[0];
//     if(!user) return res.status(401).json({message:'Invalid credentials'});
//     const ok = await bcrypt.compare(password, user.PASSWORD_HASH);
//     if(!ok) return res.status(401).json({message:'Invalid credentials'});
//     const token = jwt.sign({ id: user.ID, username: user.USERNAME }, process.env.JWT_SECRET, { expiresIn:'8h' });
//     res.json({ token, user: { id:user.ID, username:user.USERNAME, name:user.NAME, mobile:user.MOBILE, email:user.EMAIL } });
//   }catch(e){ console.error(e); res.status(500).json({message:'Login failed'}); }
// });


// //const express = require("express");
// const router = express.Router();
// //const oracledb = require("oracledb");
// //const bcrypt = require("bcrypt");
// //const jwt = require("jsonwebtoken");

// const JWT_SECRET = "your_jwt_secret"; // Move to .env in production

// // SIGNUP
// router.post("/signup", async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ error: "Username and password required" });
//     }

//     try {
//         const connection = await oracledb.getConnection({
//             user: process.env.DB_USER,
//             password: process.env.DB_PASS,
//             connectString: process.env.DB_CONNECT
//         });

//         // Check if username exists
//         const checkUser = await connection.execute(
//             `SELECT id FROM users WHERE username = :username`,
//             [username]
//         );

//         if (checkUser.rows.length > 0) {
//             await connection.close();
//             return res.status(400).json({ error: "Username already exists" });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert new user
//         const result = await connection.execute(
//             `INSERT INTO users (id, username, password_hash) VALUES (users_seq.NEXTVAL, :username, :password_hash)`,
//             { username, password_hash: hashedPassword },
//             { autoCommit: true }
//         );

//         await connection.close();

//         res.json({ message: "User registered successfully" });

//     } catch (err) {
//         console.error("Signup error:", err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const connection = await oracledb.getConnection({
//             user: process.env.DB_USER,
//             password: process.env.DB_PASS,
//             connectString: process.env.DB_CONNECT
//         });

//         const result = await connection.execute(
//             `SELECT id, password_hash FROM users WHERE username = :username`,
//             [username]
//         );

//         if (result.rows.length === 0) {
//             await connection.close();
//             return res.status(401).json({ error: "Invalid username or password" });
//         }

//         const user = {
//             id: result.rows[0][0],
//             password_hash: result.rows[0][1]
//         };

//         const isMatch = await bcrypt.compare(password, user.password_hash);
//         if (!isMatch) {
//             await connection.close();
//             return res.status(401).json({ error: "Invalid username or password" });
//         }

//         const token = jwt.sign({ id: user.id, username }, JWT_SECRET, { expiresIn: "1h" });

//         await connection.close();

//         res.json({ message: "Login successful", token });

//     } catch (err) {
//         console.error("Login error:", err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// //module.exports = router;
// export default router;
// router.post("/login", (req, res) => {
//   throw new Error("Something went wrong");
// });



import express from "express";
import oracledb from "oracledb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { username, password, name, mobile, email } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      connectString: process.env.DB_CONNECT
    });

    const checkUser = await connection.execute(
      `SELECT id FROM users WHERE username = :username OR email = :email`,
      { username, email }
    );

    if (checkUser.rows.length > 0) {
      await connection.close();
      return res.status(400).json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.execute(
      `INSERT INTO users (id, username, password_hash, name, mobile, email, created_at) 
       VALUES (users_seq.NEXTVAL, :username, :password, :name, :mobile, :email, SYSDATE)`,
      { username, password: hashedPassword, name, mobile, email },
      { autoCommit: true }
    );

    await connection.close();
    res.json({ message: "User registered successfully" });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      connectString: process.env.DB_CONNECT
    });

    const result = await connection.execute(
      `SELECT id, username, password_hash, name, mobile, email 
       FROM users 
       WHERE username = :u OR email = :u`,
      { u: username }
    );

    if (result.rows.length === 0) {
      await connection.close();
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const row = result.rows[0];
    const user = {
      id: row[0],
      username: row[1],
      password_hash: row[2],
      name: row[3],
      mobile: row[4],
      email: row[5]
    };

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      await connection.close();
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    await connection.close();
    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username, name: user.name, mobile: user.mobile, email: user.email }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
