
// import { Router } from 'express';
// import { execute } from '../db.js';
// import { requireAuth } from '../middleware/auth.js';
// export const members = Router();
// members.get('/', requireAuth, async (req,res)=>{
//   const search = (req.query.search||'').trim();
//   const sql = search ? `SELECT * FROM MEMBERS WHERE LOWER(NAME) LIKE :q OR TO_CHAR(ID)=:id ORDER BY ID DESC`
//                      : `SELECT * FROM MEMBERS ORDER BY ID DESC`;
//   const binds = search ? { q:`%${search.toLowerCase()}%`, id: search } : {};
//   const r = await execute(sql, binds);
//   res.json(r.rows || []);
// });
// members.post('/', requireAuth, async (req,res)=>{
//   const m = req.body;
//   await execute(`INSERT INTO MEMBERS (ID, NAME, PLAN, PLAN_RATE, JOIN_DATE, EXPIRY_DATE, WHATSAPP, SECONDARY_CONTACT, EMAIL, ADDRESS, HEIGHT_CM, WEIGHT_KG, BIRTH_DATE)
//                  VALUES (MEMBERS_SEQ.NEXTVAL, :name, :plan, :plan_rate, TRUNC(SYSDATE), ADD_MONTHS(TRUNC(SYSDATE), :months), :whatsapp, :secondary_contact, :email, :address, :height_cm, :weight_kg, :birth_date)`,
//                  { name:m.name, plan:m.plan, plan_rate:m.plan_rate, months:m.plan_months, whatsapp:m.whatsapp, secondary_contact:m.secondary_contact, email:m.email, address:m.address||null, height_cm:m.height_cm||null, weight_kg:m.weight_kg||null, birth_date:m.birth_date||null });
//   res.json({ message:'Member added' });
// });
// members.post('/:id/renew', requireAuth, async (req,res)=>{
//   const { id } = req.params; const { months, amount } = req.body;
//   await execute(`UPDATE MEMBERS SET EXPIRY_DATE = ADD_MONTHS(CASE WHEN EXPIRY_DATE < TRUNC(SYSDATE) THEN TRUNC(SYSDATE) ELSE EXPIRY_DATE END, :months) WHERE ID=:id`, { months, id });
//   await execute(`INSERT INTO PAYMENTS (ID, MEMBER_ID, AMOUNT, PAID_ON) VALUES (PAYMENTS_SEQ.NEXTVAL, :id, :amount, TRUNC(SYSDATE))`, { id, amount });
//   res.json({ message:'Membership renewed' });
// });



import express from "express";
import { execute } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const search = (req.query.search || "").trim();
  const sql = search
    ? `SELECT * FROM MEMBERS WHERE LOWER(NAME) LIKE :q OR TO_CHAR(ID)=:id ORDER BY ID DESC`
    : `SELECT * FROM MEMBERS ORDER BY ID DESC`;
  const binds = search ? { q: `%${search.toLowerCase()}%`, id: search } : {};
  const r = await execute(sql, binds);
  res.json(r.rows || []);
});

router.post("/", requireAuth, async (req, res) => {
  const m = req.body;
  await execute(
    `INSERT INTO MEMBERS (ID, NAME, PLAN, PLAN_RATE, JOIN_DATE, EXPIRY_DATE, WHATSAPP, SECONDARY_CONTACT, EMAIL, ADDRESS, HEIGHT_CM, WEIGHT_KG, BIRTH_DATE)
     VALUES (MEMBERS_SEQ.NEXTVAL, :name, :plan, :plan_rate, TRUNC(SYSDATE), ADD_MONTHS(TRUNC(SYSDATE), :months), :whatsapp, :secondary_contact, :email, :address, :height_cm, :weight_kg, :birth_date)`,
    {
      name: m.name,
      plan: m.plan,
      plan_rate: m.plan_rate,
      months: m.plan_months,
      whatsapp: m.whatsapp,
      secondary_contact: m.secondary_contact,
      email: m.email,
      address: m.address || null,
      height_cm: m.height_cm || null,
      weight_kg: m.weight_kg || null,
      birth_date: m.birth_date || null
    }
  );
  res.json({ message: "Member added" });
});

router.post("/:id/renew", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { months, amount } = req.body;

  await execute(
    `UPDATE MEMBERS 
     SET EXPIRY_DATE = ADD_MONTHS(CASE WHEN EXPIRY_DATE < TRUNC(SYSDATE) THEN TRUNC(SYSDATE) ELSE EXPIRY_DATE END, :months) 
     WHERE ID=:id`,
    { months, id }
  );

  await execute(
    `INSERT INTO PAYMENTS (ID, MEMBER_ID, AMOUNT, PAID_ON) 
     VALUES (PAYMENTS_SEQ.NEXTVAL, :id, :amount, TRUNC(SYSDATE))`,
    { id, amount }
  );

  res.json({ message: "Membership renewed" });
});

export default router;
