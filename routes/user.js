const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

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

router.post('/signupUser', (req, res) => {
    let user = req.body;
    query = "select EMAIL_USUARIO from USUARIO where EMAIL_USUARIO = ?;"
    connection.query(query, [user.EMAIL_USUARIO], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                console.log(results)
                query = "insert into USUARIO (NOMBRE_USUARIO, CONTRASENA_USUARIO, EMAIL_USUARIO, ROL_USUARIO) VALUES (?,?,?,?)";
                connection.query(query, [
                    user.NOMBRE_USUARIO,
                    user.CONTRASENA_USUARIO,
                    user.EMAIL_USUARIO,
                    user.ROL_USUARIO
                ],
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


router.get('/usuarios', (req, res) => {
    query = "call sp_listar_clientes(?)"
    connection.query(query, true, (err, results, fields) => {
        console.log('prueba')
        if (err) {
            console.log('entre al if')
            return res.status(500).json(err);
        } else {
            console.log('entre al else')
            return res.json(results);
        }
    })
})


router.post('/loginUser', (req, res) => {
    const user = req.body;
    query = "SELECT CONTRASENA_USUARIO, EMAIL_USUARIO FROM USUARIO WHERE EMAIL_USUARIO = ?";
    connection.query(query, [user.EMAIL_USUARIO], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].CONTRASENA_USUARIO != user.CONTRASENA_USUARIO) {
                return res.status(401).json({ message: "Usuario o Contrtasena invalida." });
            }
            else if (results[0].status === 'false') {
                return res.status(401).json({ message: "Espere por la aprobacion del Administrador" })
            }
            else if (results[0].CONTRASENA_USUARIO == user.CONTRASENA_USUARIO) {
                const response = {
                    EMAIL_USUARIO: results[0].EMAIL_USUARIO,
                    CONTRASENA_USUARIO: results[0].CONTRASENA_USUARIO
                }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
                res.status(200).json({ token: accessToken });

            }
            else {
                return res.status(400).json({ message: "Algo salio mal, intente mas tarde." });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

router.post('/forgotPassword', (req, res) => {
    const user = req.body;
    query = "SELECT EMAIL_USUARIO, CONTRASENA_USUARIO FROM USUARIO WHERE EMAIL_USUARIO =?";
    connection.query(query, [user.EMAIL_USUARIO], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(200).json({ message: "Contrasena enviada con exito al correo" });
            }
            else {

                var mailOption = {
                    from: process.env.EMAIL,
                    to: results[0].EMAIL_USUARIO,
                    subject: 'Administrador de Credenciales Compra y Ahorra.',
                    html: '<p><b>Sus detalles de inicio de sesion</b><br><b>Email:</b>' + results[0].EMAIL_USUARIO + '</br><b>Password:' + results[0].CONTRASENA_USUARIO + '</b><a href="http://localhost:4200/">Click Here to Login</a></p>'
                };
                transporter.sendMail(mailOption, function (err, info) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log('Email sent: ' + info.response);
                    }

                });
                return res.status(200).json({ message: "Contrasena enviada con exito al correo" });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })

})

router.get('/getUser',auth.authenticateToken, (req, res) => {
    var query = "select ID_USUARIO, NOMBRE_USUARIO, EMAIL_USUARIO, ROL_USUARIO FROM USUARIO WHERE ROL_USUARIO ='admin'";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/updateUser', (req, res) => {
    let user = req.body;
    var query = "UPDATE USUARIO SET NOMBRE_USUARIO = ? WHERE ID=?";
    connection.query(query, [user.NOMBRE_USUARIO, user.ID_USUARIO], (err, rsults) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "id usuario no existe" });
            }
            return res.status(200).json({ message: "usuario actualizado." });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/checkToken', (req,res)=> {
    return res.status(200).json({message: "true"});
})


module.exports = router;
