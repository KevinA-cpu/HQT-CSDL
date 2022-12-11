import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql";

const T1 = async (req, res) => {
  let isolationLevel = sql.ISOLATION_LEVEL.REPEATABLE_READ;
  try {
    let pool = await sql.connect(config);
    let transaction = new sql.Transaction(pool);
    try {
      await transaction.begin(isolationLevel);
      let like = await transaction.request().query(queries.setLuotLike);
      await transaction.request().query(queries.delay);
      let updatedLike = like.recordset[0].LuotLike + 300; // Tang luot like them 300

      await transaction
        .request()
        .query(
          `UPDATE MonAn SET LuotLike = ${updatedLike} WHERE TenMon = N'Cơm hến'`
        );

      let data = await transaction.request().query(queries.queryComHen);

      await transaction.commit();
      res.status(200).send(data.recordsets);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const T2 = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let transaction = new sql.Transaction(pool);
    try {
      await transaction.begin();
      let like = await transaction.request().query(queries.setLuotLike);
      let updatedLike = like.recordset[0].LuotLike - 100; // Giam luot like di 100

      await transaction
        .request()
        .query(
          `UPDATE MonAn SET LuotLike = ${updatedLike} WHERE TenMon = N'Cơm hến'`
        );

      let data = await transaction.request().query(queries.queryComHen);

      await transaction.commit();
      res.status(200).send(data.recordsets);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const T3 = async (req, res) => {
  let isolationLevel = req.params.isolationlevel;
  if (isolationLevel === "SERIALIZABLE")
    isolationLevel = sql.ISOLATION_LEVEL.SERIALIZABLE;

  try {
    let pool = await sql.connect(config);
    let transaction = new sql.Transaction(pool);
    try {
      await transaction.begin(isolationLevel);
      let like = await transaction.request().query(queries.setLuotLike_XLock);
      await transaction.request().query(queries.delay);
      like.recordset[0].LuotLike += 300; // Tang luot like them 300

      await transaction.request()
        .query`UPDATE MonAn with (xlock) SET LuotLike = ${like.recordset[0].LuotLike} WHERE TenMon = N'Cơm hến'`;

      let data = await transaction.request().query(queries.queryComHen);

      await transaction.commit();
      res.status(200).send(data.recordsets);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const T4 = async (req, res) => {
  let isolationLevel = req.params.isolationlevel;
  if (isolationLevel === "SERIALIZABLE")
    isolationLevel = sql.ISOLATION_LEVEL.SERIALIZABLE;

  try {
    let pool = await sql.connect(config);
    let transaction = new sql.Transaction(pool);
    try {
      await transaction.begin(isolationLevel);
      let like = await transaction.request().query(queries.setLuotLike_XLock);
      like.recordset[0].LuotLike -= 100; // Giam luot like di 100

      await transaction.request()
        .query`UPDATE MonAn with (xlock) SET LuotLike = ${like.recordset[0].LuotLike} WHERE TenMon = N'Cơm hến'`;

      let data = await transaction.request().query(queries.queryComHen);

      await transaction.commit();
      res.status(200).send(data.recordsets);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

export default {
  T1,
  T2,
  T3,
  T4,
};
