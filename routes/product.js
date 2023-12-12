const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');


//Post para Producto

router.post("/agregarProducto",auth.authenticateToken,(req, res,next)=>{
    let producto = req.body;
    query = "insert into PRODUCTO (NOMBRE_PROD, DESCRIPCION_PROD, PRECIO_COMPRA_PROD, PRECIO_VENTA_PROD, STOCK_PROD, CATEGORIA_PROD, FECHA_RECEPCION_PROD) VALUES (?,?,?,?,?,?,?)";
    connection.query(query,[nombreprod.NOMBRE_PROD,
                            descripcion.DESCRIPCION_PROD,
                            preciocompra.PRECIO_COMPRA_PROD,
                            precioventa.PRECIO_VENTA_PROD,
                            stock.STOCK_PROD,
                            categoria.CATEGPRIA_PROD,
                            fecha.FECHA_RECEPCION_PROD],(err, results) => {
                                if(!err){
                                    return res.status(200).json({message: "Producto agregado"})
                                }else{
                                    return res.status(500).json(err);
        }
    })
})

router.post("/editarProductoNombre", auth.authenticateToken,(res, res, next)=>{
    let producto = req.body;
    var query = "update PRODUCTO set NOMBRE_PROD = ? where ID_PROD = ? ";
    connection.query(query,[producto.NOMBRE_PROD, id_prod.ID_PROD],(err, results) => {
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "El producto que desea no se encuentra."})
            }
            return res.status(200).json({message: "Producto actualizado"});
        }else{
            return res.status(500).json(err);
        }  
    })
})

router.post("/editarProductoDescripcion", auth.authenticateToken,(res, res, next)=>{
    let producto = req.body;
    var query = "update PRODUCTO set DESCRIPCION_PROD = ? where ID_PROD = ? ";
    connection.query(query,[descripcion.DESCRIPCION_PROD, id_prod.ID_PROD],(err, results) => {
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "El producto que desea no se encuentra."})
            }
            return res.status(200).json({message: "Producto actualizado"});
        }else{
            return res.status(500).json(err);
        }  
    })
})

router.post("/editarProductoPrecioCompra", auth.authenticateToken,(res, res, next)=>{
    let producto = req.body;
    var query = "update PRODUCTO set PRECIO_COMPRA_PROD = ? where ID_PROD = ? ";
    connection.query(query,[preciocompra.PRECIO_COMPRA_PROD, id_prod.ID_PROD],(err, results) => {
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "El producto que desea no se encuentra."})
            }
            return res.status(200).json({message: "Producto actualizado"});
        }else{
            return res.status(500).json(err);
        }  
    })
})

router.post("/editarProductoPrecioVenta", auth.authenticateToken,(res, res, next)=>{
    let producto = req.body;
    var query = "update PRODUCTO set PRECIO_VENTA_PROD = ? where ID_PROD = ? ";
    connection.query(query,[precioventa.PRECIO_VENTA_PROD, id_prod.ID_PROD],(err, results) => {
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "El producto que desea no se encuentra."})
            }
            return res.status(200).json({message: "Producto actualizado"});
        }else{
            return res.status(500).json(err);
        }  
    })
})

router.post("editarProductoStock", auth.authenticateToken,(res, res, next)=>{
    let producto = req.body;
    var query = "update PRODUCTO set STOCK_PROD = ? where ID_PROD = ? ";
    connection.query(query,[stock.STOCK_PROD, id_prod.ID_PROD],(err, results) => {
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "El producto que desea no se encuentra."})
            }
            return res.status(200).json({message: "Producto actualizado"});
        }else{
            return res.status(500).json(err);
        }  
    })
})

router.post("/editarProductoFechaRecepcion", auth.authenticateToken,(res, res, next)=>{
    let producto = req.body;
    var query = "update PRODUCTO set FECHA_RECEPCION_PROD = ? where ID_PROD = ? ";
    connection.query(query,[fecharecepcion.FECHA_RECEPCION_PROD, id_prod.ID_PROD],(err, results) => {
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "El producto que desea no se encuentra."})
            }
            return res.status(200).json({message: "Producto actualizado"});
        }else{
            return res.status(500).json(err);
        }  
    })
})

router.post("/ComentarioProducto", auth.authenticateToken,(req, res) =>{
    let comentario = req.body;
    query = "insert into COMENTARIO (CONTENIDO_COM, FECHA_CREACION_COM, CALIFICACION) values (?,?,?)";
    connection.query(query,[contenido.CONTENIDO_COM,
                            fechacomentario.FECHA_CREACION_COM,
                            calificacion.CALIFICACION], (err, results) => {
                                if(!err){
                                    return res.status(200).json({message:"Comentario posteado"})
                                }else{
                                    return res.status(500).json(err);
        }
    })
})

//Get para Producto

router.get("/getProductos", auth.authenticateToken,(req,res,next) => {
    var query = "select NOMBRE_PROD, STOCK_PROD, PRECIO_VENTA_PROD from PRODUCTO order by NOMBRE_PROD";
    connection.query(query,(err, results) => {
        if(!err){
            return res.status(200).json(results)
        }else{
            return res.status(500).json(err);
        }

    })
})


module.exports = router;

