import express from "express";
import { createInstructor, deleteInstructor, getInstructor, updateInstructor } from "../controllers/instructor.controller.js";

const router = express.Router();

router.get('/', getInstructor);
router.post('/', createInstructor);
router.put('/:id', updateInstructor)
router.delete("/:id", deleteInstructor)

export default router;
