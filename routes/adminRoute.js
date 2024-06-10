import express from "express";
import { adminBlockUserById,  adminFindUserName, adminLogin, adminUnBlockUserById, adminViewUserById, allUsers } from "../controllers/adminController.js";
import { adminToken } from "../middlewares/adminMiddleware.js";
import { adminDeleteProductById, adminProductByCategory, adminUpdateProducts, adminViewAllProducts, adminViewProductById, createProducts } from "../controllers/adminProductsAddController.js";
import uploadImage from "../middlewares/upload.js";
import { adminOrderDetails, status } from "../controllers/adminOrder.js";
const router=express.Router();

// Add products 
// route.post('/products',addProduct);

// login
router.post("/login", adminLogin);

// admin routes

// view all users
router.get("/viewAllUsers",allUsers); 
// view user by id
router.get("/user/:id", adminToken,  adminViewUserById); 
// search user name
router.get("/user/findName/:username", adminToken, adminFindUserName);
// block user
router.put("/user/block/:userId", adminBlockUserById);
// un block user
router.put("/user/unblock/:userId",adminUnBlockUserById);





// product creating
router.post("/createProducts",uploadImage, createProducts); 
// view all products
router.get("/products", adminViewAllProducts);
// view spesific product
router.get("/products/:productId", adminToken, adminViewProductById);
// view product category
router.get("/products/category/:categoryname", adminToken, adminProductByCategory);
// edit product by id
router.put("/products/edit/:productId", adminToken, adminUpdateProducts);
// delete product by id
router.delete("/products/delete/:productId", adminToken, adminDeleteProductById);

// orders routes

// view all orders
router.get('/orders', adminToken, adminOrderDetails);
// view all revenue status
router.get('/status', adminToken, status);

export default router;