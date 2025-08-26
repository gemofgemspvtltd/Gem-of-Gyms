
// import oracledb from 'oracledb';
// import dotenv from 'dotenv';
// dotenv.config();
// const dbConfig = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   connectString: process.env.DB_CONNECT_STRING  // Must NOT be empty
// };

// // async function initPool() {
// //   try {
// //     await oracledb.createPool(dbConfig);
// //     console.log('Oracle DB pool created');
// //   } catch(err) {
// //     console.error('Failed to create Oracle DB pool', err);
// //   }
// // }

// // export { initPool, dbConfig };
// const { ORACLE_USER, ORACLE_PASSWORD, ORACLE_CONNECT_STRING } = process.env;
// let pool;
// export async function initPool() {
//   if (pool) return pool;
//   pool = await oracledb.createPool({ user: ORACLE_USER, password: ORACLE_PASSWORD, connectString: ORACLE_CONNECT_STRING, poolMin:1, poolMax:5, poolIncrement:1 });
//   return pool;
// }
// export async function closePool(){ if(pool){ await pool.close(0); pool=null; } }
// export async function execute(query, sql, binds = {}, options = {}) {
//   let connection;
//   try {
//     if (!pool) {
//       await initPool();
//     }
//     connection = await pool.getConnection();
//     const result = await connection.execute(sql, binds, options);
//     return result.rows;
//   } catch (err) {
//     console.error('DB execution error:', err);
//     throw err;
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//       } catch (err) {
//         console.error('Error closing connection:', err);
//       }
//     }
//   }
// }

// //   if(!pool) await initPool();
// //   const conn = await pool.getConnection();
// //   try { const res = await conn.execute(query, sql, binds, { autoCommit:true, outFormat: oracledb.OUT_FORMAT_OBJECT, ...options }); return res; }
// //   finally { await conn.close();
   
// //    }
// // }


// // export async function execute(query, binds = {}, options = {}) {
// //   let connection;

// //   try {
// //     connection = await oracledb.getConnection(dbConfig);
// //     const result = await connection.execute(query, binds, options);
// //     return result.rows;
// //   } catch (error) {
// //     console.error('Oracle DB error:', error);
// //     throw error;
// //   } finally {
// //     if (connection) {
// //       try {
// //         await connection.close();
// //       } catch (err) {
// //         console.error('Error closing connection:', err);
// //       }
// //     }
// //   }
// // }


import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

const {
  ORACLE_USER,
  ORACLE_PASSWORD,
  ORACLE_CONNECT_STRING
} = process.env;

if (!ORACLE_USER || !ORACLE_PASSWORD || !ORACLE_CONNECT_STRING) {
  throw new Error('Oracle DB credentials (ORACLE_USER, ORACLE_PASSWORD, ORACLE_CONNECT_STRING) must be set in environment variables');
}

let pool;

/**
 * Initialize Oracle DB connection pool (singleton)
 */
export async function initPool() {
  if (pool) {
    return pool;
  }
  
  try {
    pool = await oracledb.createPool({
      user: ORACLE_USER,
      password: ORACLE_PASSWORD,
      connectString: ORACLE_CONNECT_STRING,
      poolMin: 1,
      poolMax: 5,
      poolIncrement: 1
    });
    console.log('Oracle DB connection pool created successfully');
    return pool;
  } catch (err) {
    console.error('Failed to create Oracle DB pool:', err);
    throw err;
  }
}

/**
 * Close the Oracle DB connection pool
 */
export async function closePool() {
  if (pool) {
    try {
      await pool.close(0);  // 0 = no timeout, close immediately
      console.log('Oracle DB connection pool closed');
    } catch (err) {
      console.error('Error closing Oracle DB pool:', err);
      throw err;
    } finally {
      pool = null;
    }
  }
}

/**
 * Execute a SQL query using a pooled connection
 * @param {string} sql The SQL statement to execute, with bind variables placeholders
 * @param {object} binds Bind variables object (optional)
 * @param {object} options Execution options (optional)
 * @returns {Promise<Array>} Result rows
 */
export async function execute(sql, binds = {}, options = {}) {
  let connection;
  try {
    if (!pool) {
      await initPool();
    }
    connection = await pool.getConnection();

    // Add reasonable default options
    const execOptions = {
      autoCommit: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      ...options
    };

    const result = await connection.execute(sql, binds, execOptions);
    return result.rows;
  } catch (err) {
    console.error('Oracle DB execution error:', err);
    throw err;
  } finally {
    if (connection) { 
      try {
        await connection.close();
      } catch (closeErr) {
        console.error('Error closing Oracle DB connection:', closeErr);
      }
    }
  }
}
