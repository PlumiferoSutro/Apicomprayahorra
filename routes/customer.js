const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

// Post para Cliente

router.post('/signupCustomer', (req, res) => {
    let user = req.body;
    query = "select EMAIL_CLI from cliente where EMAIL_CLI = ?;"
    connection.query(query, [user.EMAIL_CLI], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                console.log(results)
                query = "insert into cliente (RUN_CLI,DV_CLI, PNOMBRE_CLI, SNOMBRE_CLI, APPATERNO_CLI, APMATERNO_CLI, EMAIL_CLI, TELEFONO_CLI, DIRECCION_CLI, CIUDAD) VALUES (?,?,?,?,?,?,?,?,?,?)";
                connection.query(query, [
                    user.RUN_CLI,
                    user.DV_CLI,
                    user.PNOMBRE_CLI,
                    user.SNOMBRE_CLI,
                    user.APPATERNO_CLI,
                    user.APMATERNO_CLI,
                    user.EMAIL_CLI,
                    user.TELEFONO_CLI,
                    user.DIRECCION_CLI,
                    user.CIUDAD],
                    (err, results) => {
                        if (!err) {
                            return res.status(200).json({ message: "REGISTRO EXITOSO" });
                        }
                        else {
                            return res.status(500).json(err);
                        }
                    })

            } else {
                return res.status(400).json({ message: "CORREO EXISTE." });
            }
        } else {
            return res.status(500).json(err);
        }

    })


})

module.exports = router;
