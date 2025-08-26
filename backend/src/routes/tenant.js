// import express from 'express';
// import { execute } from '../db.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const router = express.Router();
// router.get('/', (req, res) => {
//   res.json({ message: 'Tenant routes mounted successfully' });
// });

// // Tenant registration
// router.post('/signup', async (req, res) => {
//   // try {
//   //   const { tenantName, email, password, fullName, subdomain } = req.body;
//     // For now, just send back the signup data for testing
//     // (Replace with actual DB insert logic as needed)
//     // return 
//     res.status(201).json({
//       message: 'Tenant registered successfully (mock)',
//       // tenant: { tenantName, email, fullName, subdomain }
//     });
//     // Check if tenant already exists
//     const existingTenant = await execute(
//       'SELECT TENANT_ID FROM TENANTS WHERE TENANT_EMAIL = :email',
//       { email }
//     );
    
//     if (existingTenant.length > 0) {
//       return res.status(400).json({ message: 'Tenant already exists' });
//     }
    
//     // Create tenant
//     const tenantResult = await execute(`
//       INSERT INTO TENANTS (TENANT_ID, TENANT_NAME, TENANT_EMAIL, SUBDOMAIN, STATUS)
//       VALUES (TENANT_SEQ.NEXTVAL, :tenantName, :email, :subdomain, 'ACTIVE')
//       RETURNING TENANT_ID INTO :tenantId
//     `, { tenantName, email, subdomain, tenantId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } });
    
//     const tenantId = tenantResult.outBinds.tenantId[0];
    
//     // Create tenant admin user
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await execute(`
//       INSERT INTO TENANT_USERS (USER_ID, TENANT_ID, USERNAME, EMAIL, PASSWORD_HASH, FULL_NAME, ROLE)
//       VALUES (USER_SEQ.NEXTVAL, :tenantId, :email, :email, :password, :fullName, 'ADMIN')
//     `, { tenantId, email, password: hashedPassword, fullName });
    
//     res.status(201).json({
//       message: 'Tenant created successfully',
//       tenantId,
//       subdomain
//     });
// //   } catch (error) {
// //     console.error('Tenant signup error:', error);
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // });

// // List all tenants
// router.get('/list', async (req, res) => {
//   try {
//     // Adjust the query based on your DB schema
//     const tenants = await execute('SELECT TENANT_ID, TENANT_NAME FROM TENANTS');
//     res.json(tenants);
//   } catch (error) {
//     console.error('Failed to fetch tenants:', error);
//     res.status(500).json({ message: 'Failed to fetch tenants' });
//   }
// });
// // Test GET endpoint to confirm route is mounted
// router.get('/test', (req, res) => {
//   res.json({ message: 'Tenant test route is working' });
// });
// });
// export default router;


import express from 'express';
import { execute } from '../db.js';
import bcrypt from 'bcryptjs';
import oracledb from 'oracledb';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Test route to ensure router is mounted
router.get('/', (req, res) => {
  res.json({ message: 'Tenant routes mounted successfully' });
});

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
