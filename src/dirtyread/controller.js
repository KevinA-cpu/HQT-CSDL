import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql";

const T1 = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let transaction = new sql.Transaction(pool);
    try {
      await transaction.begin();
      await transaction.request().query(queries.insertDoiTac);
      await transaction.request().query(queries.delay);
      await transaction.rollback();
      res.status(200).send("executed successfully.");
    } catch (error) {
      await transaction.rollback();
      throw error;
    } finally {
      await pool.close();
    }
  } catch (error) {
    throw error;
  }
};

const T2 = async (req, res) => {
  let isolationLevel = req.params.isolationlevel;
  if (isolationLevel === "READ_UNCOMMITTED")
    isolationLevel = sql.ISOLATION_LEVEL.READ_UNCOMMITTED;
  else isolationLevel = sql.ISOLATION_LEVEL.READ_COMMITTED;
  try {
    let pool = await sql.connect(config);
    let transaction = new sql.Transaction(pool);
    try {
      await transaction.begin(isolationLevel);
      let data = await transaction.request().query(queries.getDoiTac);
      await transaction.commit();
      res.status(200).send(data.recordsets);
    } catch (error) {
      await transaction.rollback();
      throw error;
    } finally {
      await pool.close();
    }
  } catch (error) {
    throw error;
  }
};

export default {
  T1,
  T2,
};
