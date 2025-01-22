import Producto from "../models/product.model.js";
import mongoose from 'mongoose';

export const getProducts = async(req,res) =>{
    try {
        const products = await Producto.find({});
        res.status(200).json({success:true, data: products})
    }catch(error){
        console.log("eeror en buscar los productos",error.message);
        res.status(500).jsojn({success:false, message: "Error de servidor"})
    }
}

export const createProduct = async(req, res) =>{
    const producto = req.body;

    if(!producto.name ||!producto.price ||!producto.image ){
        return res.status(400).json({success:false,message:"Ingresa todos los campos"});
    }

    const newProduct = new Producto(producto);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error al crear el producto",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }

};

export const updateProduct =  async(req,res) =>{
    const {id} = req.params;
    
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"No se encontro el producto con ese ID"});
    }

    try {
        const updatedProducto = await Producto.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true, data: updatedProducto});
    } catch (error) {
        res.status(500).json({succcess:false,message: "Server Error"});
    }
}

export const deletProducto = async(req,res) =>{
    const {id} = req.params

     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"No se encontro el producto con ese ID"});
    }

    try {
        await Producto.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"El prodcuto fue eliminado"});
    } catch (error) {
        console.log("error en borrar un producto", error.message)
        res.status(500).json({success:false,message:"Server Error"});
    }
}