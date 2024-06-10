import express from "express";
import { login,signup } from "../controllers/authenticationController.js";
import uploadImage from "../middlewares/upload.js"
const route=express.Router();

route.post("/register",uploadImage,signup);
route.post("/login",login);

export default route;

