import Course from "../models/Course.model.js"
import mongoose from 'mongoose'

export const getCourse = async (request, response) => {
    try {
        const course = await Course.find({});
        response.status(200).json({ success: true, message: "Course Retrieved.", data: course });
    } catch (error) {
        console.log("Error in fetching Course: ", error.message);
        response.status(500).json({ success: false, message: "Server Error."});
    }
};

export const createCourse = async (request, response) => {
    const course = request.body;
    
    if(!course.title || !course.description || !course.price || !course.specialization || !course.instructor) {
        return response.status(400).json({ success:false, message:"Please provide all fields."});
    }

    const newCourse = new Course(course);

    try {
        await newCourse.save();
        response.status(201).json({ success:true, data: newCourse});
    } catch (error) {
        console.error("Error in Create Course:", error.message);
        response.status(500).json({ success: false, message: "Server Error: Error in Creating Course."});
    }
}

export const updateCourse = async (request, response) => {
    const { id } = request.params;

    const course = request.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ success:false, message: "Invalid Course ID" });
    }

    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, course, {new:true});
        response.status(200).json({ success:true, data:updatedCourse });
    } catch (error) {
        response.status(500).json({ success: false, message: "Server Error: Error in Updating Course."})
    }
}

export const deleteCourse = async (request, response) => {
    const { id } = request.params;
    try {
        const result = await Course.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Course not Found.'});
        }

        response.status(200).json({ success: true, message: "Course Deleted." })
    } catch (error) {
        response.status(500).json({ success: false, message: "Server Error: Error in Deleting Course." })
    }
}