import express from "express";
import { createUser, deleteUser, getUser, updateUser, getOneUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', getUser);
router.get('/:id', getOneUser);
router.post('/', createUser);
router.put('/:id', updateUser)
router.delete("/:id", deleteUser)

export default router;
