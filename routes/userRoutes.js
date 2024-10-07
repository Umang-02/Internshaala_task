import express from 'express';
import {signUpUser,loginUser,updateUser} from '../controllers/userController.js';

const userRoutes=express.Router();

userRoutes.post("/signup",signUpUser);
userRoutes.post("/login",loginUser);
userRoutes.put("/update/:id",updateUser);

export default userRoutes;