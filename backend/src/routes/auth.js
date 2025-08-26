
// import express from "express";
// import oracledb from "oracledb";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const router = express.Router();



// // SIGNUP
// router.post("/signup", async (req, res) => {
//   const { username, password, name, mobile, email } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: "Username and password required" });
//   }

//   try {
//     const connection = await oracledb.getConnection({
//       user: process.env.DB_USER,
//       password: process.env.DB_PASS,
//       connectString: process.env.DB_CONNECT
//     });

//     const checkUser = await connection.execute(
//       `SELECT id FROM users WHERE username = :username OR email = :email`,
//       { username, email }
//     );

//     if (checkUser.rows.length > 0) {
//       await connection.close();
//       return res.status(400).json({ error: "Username or email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await connection.execute(
//       `INSERT INTO users (id, username, password_hash, name, mobile, email, created_at) 
//        VALUES (users_seq.NEXTVAL, :username, :password, :name, :mobile, :email, SYSDATE)`,
//       { username, password: hashedPassword, name, mobile, email },
//       { autoCommit: true }
//     );

//     await connection.close();
//     res.json({ message: "User registered successfully" });

//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const connection = await oracledb.getConnection({
//       user: process.env.DB_USER,
//       password: process.env.DB_PASS,
//       connectString: process.env.DB_CONNECT
//     });

//     const result = await connection.execute(
//       `SELECT id, username, password_hash, name, mobile, email 
//        FROM users 
//        WHERE username = :u OR email = :u`,
//       { u: username }
//     );

//     if (result.rows.length === 0) {
//       await connection.close();
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     const row = result.rows[0];
//     const user = {
//       id: row[0],
//       username: row[1],
//       password_hash: row[2],
//       name: row[3],
//       mobile: row[4],
//       email: row[5]
//     };

//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch) {
//       await connection.close();
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     const token = jwt.sign(
//       { id: user.id, username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "8h" }
//     );

//     await connection.close();
//     res.json({
//       message: "Login successful",
//       token,
//       user: { id: user.id, username: user.username, name: user.name, mobile: user.mobile, email: user.email }
//     });

//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;
// router.post("/login", (req, res) => {
//   throw new Error("Something went wrong");
// });



// import express from "express";
// import { execute } from '../db.js';
// import oracledb from "oracledb";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const router = express.Router();

// // SIGNUP
// router.post("/signup", async (req, res) => {
//   const { username, password, name, mobile, email } = req.body;
//  console.log('Signup attempt:', { username, email, name, mobile });

//   if (!username || !password) {
//     return res.status(400).json({ error: "Username and password required" });
//   }

//   try {
//     const connection = await oracledb.getConnection({
//       user: process.env.DB_USER,
//       password: process.env.DB_PASS,
//       connectString: process.env.DB_CONNECT
//     });

//     const checkUser = await connection.execute(
//       `SELECT id FROM users WHERE username = :username OR email = :email`,
//       { username, email }
//     );

//     if (checkUser.rows.length > 0) {
//       await connection.close();
//       return res.status(400).json({ error: "Username or email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await connection.execute(
//       `INSERT INTO users (id, username, password_hash, name, mobile, email, created_at) 
//        VALUES (users_seq.NEXTVAL, :username, :password, :name, :mobile, :email, SYSDATE)`,
//       { username, password: hashedPassword, name, mobile, email },
//       { autoCommit: true }
//     );

//     await connection.close();
//     res.json({ message: "User registered successfully" });

//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const connection = await oracledb.getConnection({
//       user: process.env.DB_USER,
//       password: process.env.DB_PASS,
//       connectString: process.env.DB_CONNECT
//     });

//     const result = await connection.execute(
//       `SELECT id, username, password_hash, name, mobile, email 
//        FROM users 
//        WHERE username = :u OR email = :u`,
//       { u: username }
//     );

//     if (result.rows.length === 0) {
//       await connection.close();
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     const row = result.rows[0];
//     const user = {
//       id: row[0],
//       username: row[1],
//       password_hash: row[2],
//       name: row[3],
//       mobile: row[4],
//       email: row[5]
//     };

//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch) {
//       await connection.close();
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     const token = jwt.sign(
//       { id: user.id, username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "8h" }
//     );

//     await connection.close();
//     res.json({
//       message: "Login successful",
//       token,
//       user: { id: user.id, username: user.username, name: user.name, mobile: user.mobile, email: user.email }
//     });

//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;


import express from 'express';
import { execute } from '../db.js';
import oracledb from "oracledb"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const router = express.Router();

// Signup route
// router.post('/signup', async (req, res) => {
//   try {
//     const { username, password, name, mobile, email } = req.body;
    
//     console.log('Signup attempt:', { username, email, name, mobile });
    
//     // Check if user already exists
//     const existingUser = await execute(
//       'SELECT USERNAME FROM USERS WHERE USERNAME = :username OR EMAIL = :email',
//       { username, email }
//     );
    
//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
    
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     // Insert new user (adjust table/column names to match your database)
//     await execute(`
//       INSERT INTO USERS (USERNAME, PASSWORD, NAME, MOBILE, EMAIL, CREATED_DATE)
//       VALUES (:username, :password, :name, :mobile, :email, SYSDATE)
//     `, { 
//       username, 
//       password: hashedPassword, 
//       name, 
//       mobile, 
//       email 
//     });
    
//     res.status(201).json({ 
//       message: 'User created successfully',
//       success: true 
//     });
    
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ 
//       message: 'Failed to create user',
//       error: error.message 
//     });
//   }
// });

// Login route
// router.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
    
//     console.log('Login attempt:', username);
    
//     // Find user (adjust table/column names to match your database)
//     const userResult = await execute(
//       'SELECT USERNAME, PASSWORD, NAME, EMAIL FROM USERS WHERE USERNAME = :username',
//       { username }
//     );
    
//     if (userResult.length === 0) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
    
//     const user = userResult[0];
    
//     // Check password
//     const validPassword = await bcrypt.compare(password, user.PASSWORD);
    
//     if (!validPassword) {
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
// Login with tenant context
router.post('/login', async (req, res) => {
  try {
    const { username, password, tenantId } = req.body;
    
    // Find user in specific tenant
    const userResult = await execute(`
      SELECT tu.USER_ID, tu.TENANT_ID, tu.USERNAME, tu.EMAIL, tu.PASSWORD_HASH, 
             tu.FULL_NAME, tu.ROLE, t.TENANT_NAME, t.SUBDOMAIN
      FROM TENANT_USERS tu
      JOIN TENANTS t ON tu.TENANT_ID = t.TENANT_ID
      WHERE tu.USERNAME = :username AND tu.TENANT_ID = :tenantId AND tu.STATUS = 'ACTIVE'
    `, { username, tenantId });
    
    if (userResult.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = userResult[0];
    const validPassword = await bcrypt.compare(password, user.PASSWORD_HASH);
    
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT with tenant context
    const token = jwt.sign(
      { 
        userId: user.USER_ID,
        tenantId: user.TENANT_ID,
        role: user.ROLE 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user.USER_ID,
        username: user.USERNAME,
        email: user.EMAIL,
        fullName: user.FULL_NAME,
        role: user.ROLE
      },
      tenant: {
        tenantId: user.TENANT_ID,
        tenantName: user.TENANT_NAME,
        subdomain: user.SUBDOMAIN
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Tenant routes signup
// router.get('/', (req, res) => {
//   res.json({ message: 'Tenant routes mounted successfully' });
// });

// Tenant registration route
router.post('/signup', async (req, res) => {
   res.status(201).json({ message: 'Tenant signup successful (mock)' });
  try {
    const { tenantName, email, password, fullName, subdomain } = req.body;

    // Check if tenant already exists
    const existingTenant = await execute(
      'SELECT TENANT_ID FROM TENANTS WHERE TENANT_EMAIL = :email',
      { email }
    );

    if (existingTenant.length > 0) {
      return res.status(400).json({ message: 'Tenant already exists' });
    }

    // Create tenant and capture the generated TENANT_ID using RETURNING clause
    // const result = await execute(
    //   `DECLARE
    //      v_tenant_id TENANTS.TENANT_ID%TYPE;
    //    BEGIN
    //      INSERT INTO TENANTS (TENANT_ID, TENANT_NAME, TENANT_EMAIL, SUBDOMAIN, STATUS)
    //      VALUES (TENANT_SEQ.NEXTVAL, :tenantName, :email, :subdomain, 'ACTIVE')
    //      RETURNING TENANT_ID INTO v_tenant_id;
    //      :tenantId := v_tenant_id;
    //    END;`,
    //   {
    //     tenantName,
    //     email,
    //     subdomain,
    //     tenantId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
    //   }
    // );

    // const tenantId = result.outBinds.tenantId;

    const tenantResult = await execute(`
      INSERT INTO TENANTS (TENANT_ID, TENANT_NAME, TENANT_EMAIL, SUBDOMAIN, STATUS)
      VALUES (TENANT_SEQ.NEXTVAL, :tenantName, :email, :subdomain, 'ACTIVE')
      RETURNING TENANT_ID INTO :tenantId
    `, { tenantName, email, subdomain, tenantId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } });
    
    const tenantId = tenantResult.outBinds.tenantId[0];


    
    // Hash tenant admin password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create tenant admin user
    await execute(
      `INSERT INTO TENANT_USERS (USER_ID, TENANT_ID, USERNAME, EMAIL, PASSWORD_HASH, FULL_NAME, ROLE)
        VALUES (USER_SEQ.NEXTVAL, :tenantId, :email, :email, :password, :fullName, 'ADMIN')`,
      {
        tenantId,
        email,
        password: hashedPassword,
        fullName
      }
    );

    // Respond with success and tenant info
    res.status(201).json({
      message: 'Tenant created successfully',
      tenantId: tenantId,
      subdomain
    });

  } catch (error) {
    console.error('Tenant signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

    //List all tenants
router.get('/list', async (req, res) => {
  try {
    const tenants = await execute('SELECT TENANT_ID, TENANT_NAME FROM TENANTS');
    res.json(tenants);
  } catch (error) {
    console.error('Failed to fetch tenants:', error);
    res.status(500).json({ message: 'Failed to fetch tenants' });
  }
});

// Additional test endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'Tenant test route is working' });
});


export default router;
