import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql";

const T1 = async (req, res) => {
  let isolationLevel = sql.ISOLATION_LEVEL.SERIALIZABLE;

  try {
    let pool = await sql.connect(config);
    let transaction = new sql.Transaction(pool);
    try {
      await transaction.begin(isolationLevel);

      await transaction.request().query(queries.insertDoiTac);
      await transaction.request().query(queries.delay);
      await transaction.request().query(queries.insertHopDong);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const T2 = async (req, res) => {
  let isolationLevel = sql.ISOLATION_LEVEL.SERIALIZABLE;

  try {
    let pool = await sql.connect(config);
    let transaction = new sql.Transaction(pool);
    try {
      await transaction.begin(isolationLevel);
      let data = await transaction.request().query(queries.selectHopDong);
      res.status(200).send(data.recordsets);

      await transaction.request().query(queries.delay);

      let data1 = await transaction.request().query(queries.selectDoiTac);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const T1_Fixed = async (req, res) => {
  let isolationLevel = sql.ISOLATION_LEVEL.READ_UNCOMMITTED;

  try {
    let pool = await sql.connect(config);
    let transaction = new sql.Transaction(pool);
    try {
      await transaction.begin(isolationLevel);

      await transaction.request().query(queries.insertDoiTac);
      await transaction.request().query(queries.delay);
      await transaction.request().query(queries.insertHopDong);

      await transaction.commit();
      res.status(200).send("T1 fixed");
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const T2_Fixed = async (req, res) => {
  let isolationLevel = sql.ISOLATION_LEVEL.READ_UNCOMMITTED;

  try {
    let pool = await sql.connect(config);
    let transaction = new sql.Transaction(pool);
    try {
      await transaction.begin(isolationLevel);
      let data = await transaction.request().query(queries.selectHopDong);
      // res.status(200).send(data.recordsets);

      await transaction.request().query(queries.delay);

      let data1 = await transaction.request().query(queries.selectDoiTac);

      await transaction.commit();
      res.status(200).send("T2 fixed");
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
  T1_Fixed,
  T2_Fixed,
};
