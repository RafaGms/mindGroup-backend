import { Router } from "express";
import uploadsConfig from "../config/multer";
import multer from "multer";
import userController from "../controller/userController";
import transactionController from "../controller/transactionController";

export const router = Router();

const upload = multer(uploadsConfig);

router.post('/users', upload.single("images"), userController.registerUser);
router.post('/signIn', userController.signInUser);
router.post('/token', userController.tokenUser);

router.post('/transaction', transactionController.registerTransaction);
router.get('/transactions/:id', transactionController.getAllTransactionById);
router.delete('/transactions/:id', transactionController.delete);
router.put('/transactions/:id', transactionController.update);



export default router;

