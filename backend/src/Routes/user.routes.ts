import express from "express";
import userController from "../Controllers/userController"


const router = express.Router()

router.post("/login",
  
    userController.login
);



export default router