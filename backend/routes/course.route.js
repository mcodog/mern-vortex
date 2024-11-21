import express from "express";
import { createCourse, deleteCourse, getCourse, updateCourse, getOneCourse, addCourseContent, createReview } from "../controllers/course.controller.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.get('/', getCourse);
router.get('/:id', getOneCourse);
router.post('/', upload.array('images', 10), createCourse);
router.put('/:id', upload.array('images', 10), updateCourse)
router.delete("/:id", deleteCourse)

router.put('/addContent/:id', addCourseContent)
router.post('/review', createReview)

export default router;
