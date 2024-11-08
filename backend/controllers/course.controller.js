import Course from "../models/Course.model.js"
import mongoose from 'mongoose'
import cloudinary from 'cloudinary'

export const getCourse = async (request, response) => {
    try {
        const course = await Course.find({})
            .populate(['specialization', 'instructor'])
            .sort({ createdAt: -1 })
            .exec();
        response.status(200).json({ success: true, message: "Course Retrieved.", data: course });
    } catch (error) {
        console.log("Error in fetching Course: ", error.message);
        response.status(500).json({ success: false, message: "Server Error." });
    }
};

export const getOneCourse = async (request, response) => {
    try {
        const { id } = request.params;
        const course = await Course.findById(id);
        response.status(200).json({ success: true, message: "Course Retrieved.", data: course });
    } catch (error) {
        console.log("Error in fetching Course: ", error.message);
        response.status(500).json({ success: false, message: "Server Error." });
    }
};

export const createCourse = async (request, response) => {
    const course = request.body;

    let images = []
    if (typeof request.body.images === 'string') {
        images.push(request.body.images)
    } else {
        images = request.body.images
    }

    let imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
        try {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'courses',
                width: 500,
                height: 500,
                crop: "scale",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        } catch (error) {
            console.log("Cant Upload", error)
        }

    }

    request.body.images = imagesLinks

    if (!course.title || !course.description || !course.price || !course.specialization || !course.instructor) {
        return response.status(400).json({ success: false, message: "Please provide all fields." });
    }

    const newCourse = new Course(course);

    try {
        await newCourse.save();
        await newCourse.populate(['specialization', 'instructor']);
        response.status(201).json({ message: "Success. Course created successfully.", success: true, data: newCourse });
    } catch (error) {
        console.error("Error in Create Course:", error.message);
        response.status(500).json({ success: false, message: "Server Error: Error in Creating Course." });
    }
}

export const updateCourse = async (request, response) => {
    const { id } = request.params;
    let images = []
    if (Array.isArray(request.body.images)) {
        if (typeof request.body.images[0] === 'string') {
            images = request.body.images;
            let imagesLinks = [];
            for (let i = 0; i < images.length; i++) {
                try {
                    const result = await cloudinary.v2.uploader.upload(images[i], {
                        folder: 'courses',
                        width: 500,
                        height: 500,
                        crop: "scale",
                    });

                    imagesLinks.push({
                        public_id: result.public_id,
                        url: result.secure_url
                    })

                } catch (error) {
                    console.log("Cant Upload", error)
                }

            }
            request.body.images = imagesLinks
        } else if (typeof request.body.images[0] === 'object') {
            
        }
    } else if (typeof request.body.images === 'string') {
        images.push(request.body.images);
    }

    const course = request.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ success: false, message: "Invalid Course ID" });
    }

    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, course, { new: true });
        await updatedCourse.populate(['specialization', 'instructor']);
        response.status(200).json({ success: true, data: updatedCourse, message: "Successful: Course Successfully Updated" });
    } catch (error) {
        response.status(500).json({ success: false, message: "Server Error: Error in Updating Course." })
    }
}

export const deleteCourse = async (request, response) => {
    const { id } = request.params;
    try {
        const result = await Course.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Course not Found.' });
        }

        response.status(200).json({ success: true, message: "Course Deleted." })
    } catch (error) {
        response.status(500).json({ success: false, message: "Server Error: Error in Deleting Course." })
    }
}