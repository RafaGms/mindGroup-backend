import { Router } from "express";
import userController from "../controller/userController";
import uploadsConfig from "../config/multer";
import multer from "multer";

export const router = Router();

const upload = multer(uploadsConfig);


router.post('/users', upload.single("images"), userController.registerUser);
router.post('/signIn', userController.signInUser);
router.post('/token', userController.tokenUser);



export default router;

