import express from "express";
import { createCourse, deleteCourse, getCourse, updateCourse, getOneCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.get('/', getCourse);
router.get('/:id', getOneCourse);
router.post('/', createCourse);
router.put('/:id', updateCourse)
router.delete("/:id", deleteCourse)

export default router;
