
import oracledb from 'oracledb';
const { ORACLE_USER, ORACLE_PASSWORD, ORACLE_CONNECT_STRING } = process.env;
let pool;
export async function initPool() {
  if (pool) return pool;
  pool = await oracledb.createPool({ user: ORACLE_USER, password: ORACLE_PASSWORD, connectString: ORACLE_CONNECT_STRING, poolMin:1, poolMax:5, poolIncrement:1 });
  return pool;
}
export async function closePool(){ if(pool){ await pool.close(0); pool=null; } }
export async function execute(sql, binds = {}, options = {}) {
  if(!pool) await initPool();
  const conn = await pool.getConnection();
  try { const res = await conn.execute(sql, binds, { autoCommit:true, outFormat: oracledb.OUT_FORMAT_OBJECT, ...options }); return res; }
  finally { await conn.close(); }
}
