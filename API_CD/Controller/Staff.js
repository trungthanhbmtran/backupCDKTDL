const express = require('express')
const router = express.Router()
const { poolPromise } = require('../Connection/db')

router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .query(`select * from HMR_NHANVIEN `, function (err, profileset) {
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

router.post('/detailstaff', async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
        .query(`select * from HMR_Users where UserName='${req.body.username}' `, function (err, profileset) {
            if (err) {
                console.log(err)
            }
            else {
                const send_data = profileset.recordset;
                res.json(send_data);
            }
        })  
    } catch (err) {
        res.status(400).json({ message: "invalid" })
        res.send(err.message)
    }
})



router.post('/add', async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
        .input("HOTEN",sql.nvarchar(60),req.body.HOTEN)
        .input("BIDANH",sql.nvarchar(60),req.body.BIDANH)
        .input("NGAYSINH",sql.datetime,req.body.NGAYSINH)
        .input("GIOITINH",sql.nvarchar(20),req.body.GIOITINH)
        .input("VANHOA",sql.nvarchar(60),req.body.VANHOA)
        .input("NGOAINGU",sql.nvarchar(60),req.body.NGOAINGU)
        .input("SOTRUONG",sql.nvarchar(60),req.body.SOTRUONG)
        .input("CHUYENMON",sql.nvarchar(60),req.body.CHUYENMON)
        .input("TRINHDO",sql.nvarchar(60),req.body.TRINHDO)
        .input("NGAYLUUHS",sql.nvarchar(50),req.body.NGAYLUUHS)
        .input("LYDOLUUHS",sql.nvarchar(50),req.body.LYDOLUUHS)
        .input("TRANGTHAI",sql.int,req.body.TRANGTHAI)
        .input("DANTOC",sql.nvarchar(60),req.body.DANTOC)
        .input("TONGIAO",sql.nvarchar(60),req.body.TONGIAO)
        .input("SOBHXH",sql.nvarchar(60),req.body.SOBHXH)
        .input("NOI_DKKCB",sql.nvarchar(60),req.body.NOI_DKKCB)
        .input("NHANVIEN_ID",sql.char(20),req.body.NHANVIEN_ID)
        .input("ngaynhap",sql.char(30),req.body.ngaynhap)
        .input("nguoinhap",sql.int,req.body.nguoinhap)
        .input("ngaysua",sql.char(30),req.body.ngaysua)
        .input("nguoisua",sql.int,req.body.ngaysua)
        .input("SOCMND",sql.nvarchar(200),req.body.SOCMND)
        .input("NGAYCAP",sql.datetime,req.body.NGAYCAP)
        .input("NOICAP",sql.nvarchar(200),req.body.NOICAP)
        .input("DIDONG",sql.nvarchar(200),req.body.DIDONG)
        .input("DIENTHOAIBAN",sql.nvarchar(200),req.body.DIENTHOAIBAN)
        .input("DIACHIEMAIL",sql.nvarchar(200),req.body.DIACHIEMAIL)
        .input("MASOTHUE",sql.nvarchar(200),req.body.MASOTHUE)
        .input("Diachi",sql.nvarchar(250),req.body.Diachi)
        .input("Quequan",sql.nvarchar(250),req.body.Quequan)
        .input("Website",sql.nvarchar(250),req.body.Website)
        .input("bangcapkhac",sql.nvarchar(250),req.body.bangcapkhac)
        .input("chungchikhac",sql.nvarchar(250),req.body.chungchikhac)
        .input("uudiem",sql.nvarchar(250),req.body.uudiem)
        .input("khuyetdiem",sql.nvarchar(250),req.body.khuyetdiem)
        .input("diachilienhe",sql.nvarchar(250),req.body.diachilienhe)
        .input("kinhnghiem",sql.nvarchar(250),req.body.kinhnghiem)
            .execute("INSERT_HRM_NHANVIEN").then(function (recordSet) {
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