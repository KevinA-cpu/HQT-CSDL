import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql";

const T1 = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let transaction = new sql.Transaction(pool);
    try {
      await transaction.begin();
      await transaction.request().query(queries.getFeedback);
      await transaction.request().query(queries.delay);
      let data1 = await transaction.request().query(queries.getFeedback);
      await transaction.commit();
      res.status(200).send(data1.recordsets);
      
    } catch (error) {
      await transaction.rollback()
      throw error;
    } 
  } catch (error) {
    throw error;
  }
};

const T1Fixed = async (req, res) => {
  
  let isolationLevel = sql.ISOLATION_LEVEL.SERIALIZABLE;
  try {
    let pool = await sql.connect(config);
    let transaction = new sql.Transaction(pool);
    try {
      await transaction.begin(isolationLevel);
      await transaction.request().query(queries.getFeedback);
      await transaction.request().query(queries.delay);
      let data2 = await transaction.request().query(queries.getFeedback);
      await transaction.commit();
      res.status(200).send(data2.recordsets);
      
    } catch (error) {
      await transaction.rollback()
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
      await transaction.request().query(queries.insertDoiTac);
      await transaction.commit();
      res.status(200).send('Insert thanh cong');
    } catch (error) {
      await transaction.rollback()
      throw error;
    } 
  } catch (error) {
    throw error;
  }
};

export default {
  T1,
  T1Fixed,
  T2,
};
