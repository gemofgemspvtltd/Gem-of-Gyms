

// import express from "express";
// import { execute } from "../db.js";
// import { requireAuth } from "../middleware/auth.js";
// import { authenticateToken, tenantIsolation } from '../middleware/tenantAuth.js';

// const router = express.Router();

// router.get("/metrics", requireAuth, async (req, res) => {
//   const a = await execute(`SELECT COUNT(*) CNT FROM MEMBERS WHERE EXPIRY_DATE >= TRUNC(SYSDATE)`);
//   const e = await execute(`SELECT COUNT(*) CNT FROM MEMBERS WHERE EXPIRY_DATE = TRUNC(SYSDATE)`);
//   const c = await execute(`SELECT NVL(SUM(AMOUNT),0) AMT FROM PAYMENTS WHERE PAID_ON = TRUNC(SYSDATE)`);
//   const ch = await execute(`SELECT COUNT(DISTINCT MEMBER_ID) CNT FROM ATTENDANCE WHERE CHECKIN_DATE = TRUNC(SYSDATE)`);
//   res.json({
//     active_members: a.rows[0].CNT,
//     plans_expiring_today: e.rows[0].CNT,
//     todays_collection: c.rows[0].AMT,
//     todays_checkins: ch.rows[0].CNT
//   });
// });

// router.get("/detail", requireAuth, async (req, res) => {
//   const { type } = req.query;
//   if (type === "active") {
//     const r = await execute(`SELECT ID, NAME, EXPIRY_DATE FROM MEMBERS WHERE EXPIRY_DATE >= TRUNC(SYSDATE) ORDER BY EXPIRY_DATE`);
//     return res.json(r.rows || []);
//   }
//   if (type === "expiring") {
//     const r = await execute(`SELECT ID, NAME FROM MEMBERS WHERE EXPIRY_DATE = TRUNC(SYSDATE)`);
//     return res.json(r.rows || []);
//   }
//   if (type === "collection") {
//     const r = await execute(`SELECT m.NAME, p.AMOUNT, m.EXPIRY_DATE 
//                              FROM PAYMENTS p JOIN MEMBERS m ON m.ID=p.MEMBER_ID 
//                              WHERE p.PAID_ON = TRUNC(SYSDATE)`);
//     return res.json(r.rows || []);
//   }
//   res.json([]);
// });

// router.get("/birthdays", requireAuth, async (req, res) => {
//   const r = await execute(`SELECT ID, NAME, BIRTH_DATE FROM MEMBERS WHERE TO_CHAR(BIRTH_DATE,'MM-DD') = TO_CHAR(SYSDATE,'MM-DD')`);
//   res.json(r.rows || []);
// });

// router.post("/checkins/mark", requireAuth, async (req, res) => {
//   const { member_ids } = req.body;
//   if (!Array.isArray(member_ids) || !member_ids.length) return res.json({ message: "Nothing to mark" });

//   for (const id of member_ids) {
//     await execute(
//       `INSERT INTO ATTENDANCE (ID, MEMBER_ID, CHECKIN_DATE) VALUES (ATTENDANCE_SEQ.NEXTVAL, :id, TRUNC(SYSDATE))`,
//       { id }
//     );
//   }
//   res.json({ message: "Attendance marked" });
// });

// export default router;



// import express from 'express';
// import { execute } from '../db.js';
// import { authenticateToken, tenantIsolation } from '../middleware/tenantAuth.js';

// const router = express.Router();

// // Apply middleware to all dashboard routes
// router.use(authenticateToken);
// router.use(tenantIsolation);

// router.get('/metrics', async (req, res) => {
//   try {
//     const tenantId = req.tenantId;
    
    
//     // All queries now include tenant isolation
//     const metrics = await Promise.all([
//       // Member count for this tenant only
//       execute('SELECT COUNT(*) as count FROM MEMBERS WHERE TENANT_ID = :tenantId', { tenantId }),
      
//       // Today's birthdays for this tenant
//       execute(`
//         SELECT COUNT(*) as count 
//         FROM MEMBERS 
//         WHERE TENANT_ID = :tenantId 
//         AND TO_CHAR(DATE_OF_BIRTH, 'MM-DD') = TO_CHAR(SYSDATE, 'MM-DD')
//       `, { tenantId }),
      
//       // Recent payments for this tenant
//       execute(`
//         SELECT COUNT(*) as count 
//         FROM PAYMENTS 
//         WHERE TENANT_ID = :tenantId 
//         AND PAYMENT_DATE >= SYSDATE - 30
//       `, { tenantId }),
      
//       // Today's check-ins for this tenant
//       execute(`
//         SELECT COUNT(*) as count 
//         FROM CHECKINS 
//         WHERE TENANT_ID = :tenantId 
//         AND TRUNC(CHECK_IN_DATE) = TRUNC(SYSDATE)
//       `, { tenantId })
//     ]);
    
//     res.json({
//       memberCount: metrics[0][0]?.COUNT || 0,
//       todaysBirthdays: metrics[1][0]?.COUNT || 0,
//       recentPayments: metrics[2][0]?.COUNT || 0,
//       todaysCheckins: metrics[3][0]?.COUNT || 0
//     });
//   } catch (error) {
//     console.error('Dashboard metrics error:', error);
//     res.status(500).json({ message: 'Failed to fetch metrics' });
//   }
// });

// export default router;

//trying new one


// import express from 'express';
// import { execute } from '../db.js';
// import { authenticateToken, tenantIsolation } from '../middleware/tenantAuth.js';
// import { requireAuth } from "../middleware/auth.js";


// const router = express.Router();



// // Dashboard metrics endpoint
// router.get('/metrics', async (req, res) => {
//   try {
//     // Simple metrics that should work with basic database
//     const metrics = {
//       totalMembers: 0,
//       activeMembers: 0,
//       recentPayments: 0,
//       todayCheckins: 0
//     };

//     // Try to get member count (adjust table name to match your database)
//     try {
//       const memberCount = await execute('SELECT COUNT(*) as count FROM MEMBERS');
//       metrics.totalMembers = memberCount[0]?.COUNT || 0;
//     } catch (error) {
//       console.log('Members table not found, using mock data');
//     }

//     // Mock data for now
//     metrics.activeMembers = Math.floor(metrics.totalMembers * 0.8);
//     metrics.recentPayments = Math.floor(metrics.totalMembers * 0.3);
//     metrics.todayCheckins = Math.floor(metrics.totalMembers * 0.1);

//     res.json(metrics);
//   } catch (error) {
//     console.error('Dashboard metrics error:', error);
//     res.status(500).json({ 
//       message: 'Failed to fetch dashboard metrics',
//       error: error.message 
//     });
//   }
// });

// // Dashboard details endpoint
// router.get('/detail', async (req, res) => {
//   try {
//     const { type } = req.query;
    
//     // Mock data for different detail types
//     const mockData = {
//       members: [
//         { id: 1, name: 'John Doe', status: 'Active' },
//         { id: 2, name: 'Jane Smith', status: 'Active' }
//       ],
//       payments: [
//         { id: 1, member: 'John Doe', amount: 500, date: new Date() },
//         { id: 2, member: 'Jane Smith', amount: 750, date: new Date() }
//       ],
//       checkins: [
//         { id: 1, member: 'John Doe', time: new Date() },
//         { id: 2, member: 'Jane Smith', time: new Date() }
//       ]
//     };

//     res.json(mockData[type] || []);
//   } catch (error) {
//     console.error('Dashboard detail error:', error);
//     res.status(500).json({ 
//       message: 'Failed to fetch dashboard details',
//       error: error.message 
//     });
//   }
// });

// router.get('/birthdays', (req, res) => {
//   // Sample response or actual DB query result
//   res.json([
//     { memberId: 1, name: 'John Doe', birthday: '1990-08-31' },
//     { memberId: 2, name: 'Jane Smith', birthday: '1985-09-01' }
//   ]);
// });


import express from 'express';
import { execute } from '../db.js';
import { authenticateToken, tenantIsolation } from '../middleware/tenantAuth.js';
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Apply middleware to all dashboard routes
router.use(authenticateToken);
router.use(tenantIsolation);

router.get('/metrics', async (req, res) => {
  try {
    const tenantId = req.tenantId;
    
    // All queries now include tenant isolation
    const metrics = await Promise.all([
      // Member count for this tenant only
      execute('SELECT COUNT(*) as count FROM MEMBERS WHERE TENANT_ID = :tenantId', { tenantId }),
      
      // Today's birthdays for this tenant
      execute(`
        SELECT COUNT(*) as count 
        FROM MEMBERS 
        WHERE TENANT_ID = :tenantId 
        AND TO_CHAR(DATE_OF_BIRTH, 'MM-DD') = TO_CHAR(SYSDATE, 'MM-DD')
      `, { tenantId }),
      
      // Recent payments for this tenant
      execute(`
        SELECT COUNT(*) as count 
        FROM PAYMENTS 
        WHERE TENANT_ID = :tenantId 
        AND PAYMENT_DATE >= SYSDATE - 30
      `, { tenantId }),
      
      // Today's check-ins for this tenant
      execute(`
        SELECT COUNT(*) as count 
        FROM CHECKINS 
        WHERE TENANT_ID = :tenantId 
        AND TRUNC(CHECK_IN_DATE) = TRUNC(SYSDATE)
      `, { tenantId })
    ]);
    
    res.json({
      memberCount: metrics[0][0]?.COUNT || 0,
      todaysBirthdays: metrics[1][0]?.COUNT || 0,
      recentPayments: metrics[2][0]?.COUNT || 0,
      todaysCheckins: metrics[3][0]?.COUNT || 0
    });
  } catch (error) {
    console.error('Dashboard metrics error:', error);
    res.status(500).json({ message: 'Failed to fetch metrics' });
  }
});




export default router;
