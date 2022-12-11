import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql";

const T1 = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let transaction = new sql.Transaction(pool);
    try {
      await transaction.begin(sql.ISOLATION_LEVEL.SERIALIZABLE);
      await transaction.request().query(queries.getSoNamHoatDong);
      await transaction.request().query(queries.delay);
      await transaction.request().query(queries.updateSoNamHoatDong);
      await transaction.commit()
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
    try {
        let pool = await sql.connect(config);
        let transaction = new sql.Transaction(pool);
        try {
          await transaction.begin(sql.ISOLATION_LEVEL.SERIALIZABLE);
          await transaction.request().query(queries.getSoNamHoatDong);
          await transaction.request().query(queries.delay);
          await transaction.request().query(queries.updateSoNamHoatDong);
          await transaction.commit()
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

const T1_Fixed = async (req, res) => {
    try {
      let pool = await sql.connect(config);
      let transaction = new sql.Transaction(pool);
      try {
        await transaction.begin(sql.ISOLATION_LEVEL.SERIALIZABLE);
        let data = await transaction.request().query(queries.getSoNamHoatDong1);
        await transaction.request().query(queries.delay);
        await transaction.request().query(queries.updateSoNamHoatDong);

        await transaction.commit()
        res.status(200).send("executed successfully.");
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    } catch (error) {
      throw error;
    }
};

const T2_Fixed = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let transaction = new sql.Transaction(pool);
        try {
          await transaction.begin(sql.ISOLATION_LEVEL.SERIALIZABLE);
          await transaction.request().query(queries.getSoNamHoatDong1);
          await transaction.request().query(queries.delay);
          await transaction.request().query(queries.updateSoNamHoatDong);
          await transaction.commit()
          res.status(200).send("executed successfully.");
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
  T2_Fixed
};
