import { Router } from "express";
import uploadsConfig from "../config/multer";
import multer from "multer";
import userController from "../controller/userController";
import transationController from "../controller/transationController";

export const router = Router();

const upload = multer(uploadsConfig);


router.post('/users', upload.single("images"), userController.registerUser);
router.post('/signIn', userController.signInUser);
router.post('/token', userController.tokenUser);


router.post('/transation', transationController.registerTransaction)



export default router;

