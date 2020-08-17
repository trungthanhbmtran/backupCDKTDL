const express = require('express')
const router = express.Router()
const { poolPromise } = require('../Connection/db')

router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .query('select * from Admin', function (err, profileset) {
                if (err) {
                    console.log(err)
                }
                else {
                    var send_data = profileset.recordset;
                    res.json(send_data);
                }
            })
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
})

router.post('/', async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input("name", sql.VarChar(50), req.body.name)
            .input("lastname", sql.VarChar(50), req.body.lastname)
            .input("email", sql.VarChar(50), req.body.email)
            .input("password", sql.VarChar(50), req.body.password)
            .execute("InsertProfile").then(function (recordSet) {
                res.status(200).json({ status: "Success" })
            })
    } catch (err) {
        res.status(400).json({ message: "invalid" })
        res.send(err.message)
    }
})

router.delete('/', async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input("id", sql.Int, req.body.id)
            .execute("DeleteProfile").then(function (err, recordSet) {
                res.status(200).json({ status: "Success" })
            })
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
}) 
module.exports = router;