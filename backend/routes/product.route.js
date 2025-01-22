import express from "express";
//funciones de controladores
import { createProduct,getProducts,deletProducto,updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/",getProducts);

router.post("/",createProduct);

router.put("/:id",updateProduct);

router.delete("/:id",deletProducto);

export default router;