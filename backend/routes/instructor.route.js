import express from "express";
import { createInstructor, deleteInstructor, getInstructor, getOneInstructor, updateInstructor } from "../controllers/instructor.controller.js";

const router = express.Router();

router.get('/', getInstructor);
router.get('/:id', getOneInstructor);
router.post('/', createInstructor);
router.put('/:id', updateInstructor)
router.delete("/:id", deleteInstructor)

export default router;
