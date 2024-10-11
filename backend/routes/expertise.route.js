import express from "express";
import { createExpertise, deleteExpertise, getExpertise, updatedExpertise } from "../controllers/expertise.controller.js";

const router = express.Router();

router.get('/', getExpertise);
router.post('/', createExpertise);
router.put('/:id', updatedExpertise)
router.delete("/:id", deleteExpertise)

export default router;
