import express from "express";
import { createUser, deleteUser, getUser, updateUser, getOneUser, addToCart, processCheckout, updateCourseStatus } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', getUser);
router.get('/:id', getOneUser);
router.post('/', createUser);
router.put('/:id', updateUser)
router.delete("/:id", deleteUser)

router.post('/addToCart/:userId', addToCart)
router.post('/process/:userId', processCheckout)
router.post('/update/status', updateCourseStatus)

export default router;
