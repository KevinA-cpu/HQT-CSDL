import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql";

const getDonDatHang = async(req,res) =>{
    try {
        // handle 
        let pool = await sql.connect(config);
        let transaction = new sql.Transaction(pool);
        try {
            await transaction.begin();
            let data = await transaction.request().query(queries.getDonDatHang);
            await transaction.commit();
            res.status(200).send(data.recordsets);
        } catch (error) {
            await transaction.rollback()
        }
    } catch (error) {
        throw error;
    }
}

const T1 = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let transaction = new sql.Transaction(pool);
        let isolationlevel = sql.ISOLATION_LEVEL.REPEATABLE_READ
        try {
            await transaction.begin(isolationlevel);
            await transaction.request().query(queries.getDonDatHang);
            await transaction.request().query(queries.delay);
            let data2 = await transaction.request().query(queries.getDonDatHang);
            res.status(200).send(data2.recordsets)
            await transaction.commit()
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

const T3 = async (req, res) => {
    let isolationlevel = req.params.isolationlevel;
    if(isolationlevel === 'REPEATABLE_READ')
    {
        isolationlevel = sql.ISOLATION_LEVEL.REPEATABLE_READ
        try {
            let pool = await sql.connect(config);
            let transaction = new sql.Transaction(pool);
            try {
            await transaction.begin(isolationlevel);
            await transaction.request().query(queries.getDonDatHang);
            await transaction.request().query(queries.delay);
            let data2 = await transaction.request().query(queries.getDonDatHang);
            res.status(200).send(data2.recordsets)
            await transaction.commit()
            } catch (error) {
            await transaction.rollback();
            throw error;
            } finally {
            await pool.close();
            }
        } 
        catch (error) {
            throw error;
        }
    }
}

const T2 = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let transaction = new sql.Transaction(pool);
        try {
        await transaction.begin();
        await transaction.request().query(queries.updateDongia);
        await transaction.request().query(queries.updateTongTien);
        res.status(200).send("Update succesfully")
        await transaction.commit()
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
    getDonDatHang,
    T1,
    T2,
    T3
};
