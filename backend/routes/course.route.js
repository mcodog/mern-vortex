import express from "express";
import { createCourse, deleteCourse, getCourse, updateCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.get('/', getCourse);
router.post('/', createCourse);
router.put('/:id', updateCourse)
router.delete("/:id", deleteCourse)

export default router;
