
// import { Router } from 'express';
// import { execute } from '../db.js';
// import { requireAuth } from '../middleware/auth.js';
// export const dashboard = Router();
// dashboard.get('/metrics', requireAuth, async (req,res)=>{
//   const a = await execute(`SELECT COUNT(*) CNT FROM MEMBERS WHERE EXPIRY_DATE >= TRUNC(SYSDATE)`);
//   const e = await execute(`SELECT COUNT(*) CNT FROM MEMBERS WHERE EXPIRY_DATE = TRUNC(SYSDATE)`);
//   const c = await execute(`SELECT NVL(SUM(AMOUNT),0) AMT FROM PAYMENTS WHERE PAID_ON = TRUNC(SYSDATE)`);
//   const ch = await execute(`SELECT COUNT(DISTINCT MEMBER_ID) CNT FROM ATTENDANCE WHERE CHECKIN_DATE = TRUNC(SYSDATE)`);
//   res.json({ active_members:a.rows[0].CNT, plans_expiring_today:e.rows[0].CNT, todays_collection:c.rows[0].AMT, todays_checkins:ch.rows[0].CNT });
// });
// dashboard.get('/detail', requireAuth, async (req,res)=>{
//   const { type } = req.query;
//   if(type==='active'){ const r=await execute(`SELECT ID, NAME, EXPIRY_DATE FROM MEMBERS WHERE EXPIRY_DATE >= TRUNC(SYSDATE) ORDER BY EXPIRY_DATE`); return res.json(r.rows||[]); }
//   if(type==='expiring'){ const r=await execute(`SELECT ID, NAME FROM MEMBERS WHERE EXPIRY_DATE = TRUNC(SYSDATE)`); return res.json(r.rows||[]); }
//   if(type==='collection'){ const r=await execute(`SELECT m.NAME, p.AMOUNT, m.EXPIRY_DATE FROM PAYMENTS p JOIN MEMBERS m ON m.ID=p.MEMBER_ID WHERE p.PAID_ON = TRUNC(SYSDATE)`); return res.json(r.rows||[]); }
//   res.json([]);
// });
// dashboard.get('/birthdays', requireAuth, async (req,res)=>{
//   const r = await execute(`SELECT ID, NAME, BIRTH_DATE FROM MEMBERS WHERE TO_CHAR(BIRTH_DATE,'MM-DD') = TO_CHAR(SYSDATE,'MM-DD')`);
//   res.json(r.rows || []);
// });
// dashboard.post('/checkins/mark', requireAuth, async (req,res)=>{
//   const { member_ids } = req.body;
//   if(!Array.isArray(member_ids) || !member_ids.length) return res.json({ message:'Nothing to mark' });
//   for(const id of member_ids){ await execute(`INSERT INTO ATTENDANCE (ID, MEMBER_ID, CHECKIN_DATE) VALUES (ATTENDANCE_SEQ.NEXTVAL, :id, TRUNC(SYSDATE))`, { id }); }
//   res.json({ message:'Attendance marked' });
// });


// import express from "express";

// const router = express.Router();

// // Example route
// router.get("/", (req, res) => {
//   res.json({ message: "Dashboard working" });
// });

// export default router;



import express from "express";
import { execute } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/metrics", requireAuth, async (req, res) => {
  const a = await execute(`SELECT COUNT(*) CNT FROM MEMBERS WHERE EXPIRY_DATE >= TRUNC(SYSDATE)`);
  const e = await execute(`SELECT COUNT(*) CNT FROM MEMBERS WHERE EXPIRY_DATE = TRUNC(SYSDATE)`);
  const c = await execute(`SELECT NVL(SUM(AMOUNT),0) AMT FROM PAYMENTS WHERE PAID_ON = TRUNC(SYSDATE)`);
  const ch = await execute(`SELECT COUNT(DISTINCT MEMBER_ID) CNT FROM ATTENDANCE WHERE CHECKIN_DATE = TRUNC(SYSDATE)`);
  res.json({
    active_members: a.rows[0].CNT,
    plans_expiring_today: e.rows[0].CNT,
    todays_collection: c.rows[0].AMT,
    todays_checkins: ch.rows[0].CNT
  });
});

router.get("/detail", requireAuth, async (req, res) => {
  const { type } = req.query;
  if (type === "active") {
    const r = await execute(`SELECT ID, NAME, EXPIRY_DATE FROM MEMBERS WHERE EXPIRY_DATE >= TRUNC(SYSDATE) ORDER BY EXPIRY_DATE`);
    return res.json(r.rows || []);
  }
  if (type === "expiring") {
    const r = await execute(`SELECT ID, NAME FROM MEMBERS WHERE EXPIRY_DATE = TRUNC(SYSDATE)`);
    return res.json(r.rows || []);
  }
  if (type === "collection") {
    const r = await execute(`SELECT m.NAME, p.AMOUNT, m.EXPIRY_DATE 
                             FROM PAYMENTS p JOIN MEMBERS m ON m.ID=p.MEMBER_ID 
                             WHERE p.PAID_ON = TRUNC(SYSDATE)`);
    return res.json(r.rows || []);
  }
  res.json([]);
});

router.get("/birthdays", requireAuth, async (req, res) => {
  const r = await execute(`SELECT ID, NAME, BIRTH_DATE FROM MEMBERS WHERE TO_CHAR(BIRTH_DATE,'MM-DD') = TO_CHAR(SYSDATE,'MM-DD')`);
  res.json(r.rows || []);
});

router.post("/checkins/mark", requireAuth, async (req, res) => {
  const { member_ids } = req.body;
  if (!Array.isArray(member_ids) || !member_ids.length) return res.json({ message: "Nothing to mark" });

  for (const id of member_ids) {
    await execute(
      `INSERT INTO ATTENDANCE (ID, MEMBER_ID, CHECKIN_DATE) VALUES (ATTENDANCE_SEQ.NEXTVAL, :id, TRUNC(SYSDATE))`,
      { id }
    );
  }
  res.json({ message: "Attendance marked" });
});

export default router;
