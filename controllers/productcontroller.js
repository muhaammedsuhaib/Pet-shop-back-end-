import Products from "../models/productsModel.js"
// import express from "express";
// const app = express();
// app.use(express.json());

export const allProducts = async (req, res, next) => {
    try {
            Products.find()
                .then((products) => {
                    return res.status(200).json({ products });
                })
                .catch((error) => {
                    return res.status(404).json({messsage:"Unable to get products",error});
                    next(error);
                });
        

    } catch (error) {
        return res.status(404).json({messsage:"Unable to get products",error});
        next(error);
    }
};

// show product by Id

export const productGetId = async (req, res, next) => {
    try {
        const { id } = req.params;
            try {
                // Find the product by ID
                const findProduct = await Products.findById(id);
                
                if (!findProduct) {
                    return res.status(404).json({ message: "Product not found" });
                }
                
                res.status(200).json({ product: findProduct });
            } catch (error) {
                return res.status(404).json({messsage:"Unable to get products",error});
                next(error);
            }
    } catch (error) {  
        return res.status(404).json({messsage:"Unable to get products",error});
       next(error);
    }
};


//  show products by category

export const userProductByCategory = async (req, res, next) => {                                                                                            

        try {
            const { search } = req.params;
            console.log(search);
                // Find products by category
                const products = await Products.find({
                    $or: [
                        { category: { $regex: new RegExp(search, 'i') } },
                        { title: { $regex: new RegExp(search, 'i') } },
                    ]
                }).select('title category price');
                
                if (products.length === 0) {
                    return res.status(404).json({ message: "No items found in the given category" });
                }
                
                res.status(200).json({ products });
            } catch (error) {
                return res.status(404).json({messsage:"Unable to get products",error});
                next(error);
            }
   
};