import express from "express";
import deleteReview, { createCourse, deleteCourse, getCourse, updateCourse, getOneCourse, addCourseContent, createReview, updateReview } from "../controllers/course.controller.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.get('/', getCourse);
router.get('/:id', getOneCourse);
router.post('/', upload.array('images', 10), createCourse);
router.put('/:id', upload.array('images', 10), updateCourse)
router.delete("/:id", deleteCourse)

router.put('/addContent/:id', addCourseContent)
router.post('/review', createReview)
router.put('/review/:id', updateReview)
router.delete('/review/:id/:cid', deleteReview)

export default router;
