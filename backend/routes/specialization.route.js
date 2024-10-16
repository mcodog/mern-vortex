import express from "express";
import { getSpec, createSpec, deleteSpec, updateSpec, getOneSpec } from "../controllers/specialization.controller.js";

const router = express.Router();

router.get('/', getSpec);
router.get('/:id', getOneSpec);
router.post('/', createSpec);
router.put('/:id', updateSpec)
router.delete("/:id", deleteSpec)

export default router;
