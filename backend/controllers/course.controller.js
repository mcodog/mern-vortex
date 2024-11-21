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
        const course = await Course.findById(id).populate('specialization').exec();
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
            const productImage = await Course.findById(id);

            if (productImage && productImage.images.length > 0) {
                for (const img of productImage.images) {
                    try {
                        await cloudinary.v2.uploader.destroy(img.public_id);
                    } catch (error) {
                        console.log("Can't delete previous image:", error);
                    }
                }
            }

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
        const productImage = await Course.findById(id);

        if (productImage && productImage.images.length > 0) {
            for (const img of productImage.images) {
                try {
                    await cloudinary.v2.uploader.destroy(img.public_id);
                } catch (error) {
                    console.log("Can't delete previous image:", error);
                }
            }
        }

        const result = await Course.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Course not Found.' });
        }

        response.status(200).json({ success: true, message: "Course Deleted." })
    } catch (error) {
        response.status(500).json({ success: false, message: "Server Error: Error in Deleting Course." })
    }
}

export const addCourseContent = async (req, res) => {
    const { id } = req.params;
    const newContent = req.body;
  
    console.log(newContent);
  
    try {
      const updatedCourse = await Course.findByIdAndUpdate(
        id, // The ID of the course you want to update
        {
          $push: {
            courseContents: newContent, // The new content to add to the courseContents array
          },
        },
        { new: true } // Returns the updated document
      );
  
      if (!updatedCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
  
      res.status(200).json({
        success: true,
        data: updatedCourse,
        message: "Course content successfully added",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in adding course content",
        error: error.message,
      });
    }
  };

  export const createReview = async (req, res) => {
    try {
        const { courseId, userId, rating, review } = req.body;

        // Validate courseId and userId
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: 'Invalid course ID' });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        // Validate review data
        if (!rating || !review) {
            return res.status(400).json({ success: false, message: 'Rating and review are required' });
        }

        // Find the course by ID
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        const existingReview = course.reviews.find(
            (rev) => rev.userId.toString() === userId
        );

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'User has already reviewed this course',
            });
        }

        // Add the review to the course's reviews array
        const newReview = {
            userId,
            rating,
            review,
        };

        course.reviews.push(newReview);

        // Save the updated course document
        await course.save();

        return res.status(201).json({
            success: true,
            message: 'Review added successfully',
            data: newReview,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { userId, rating, review } = req.body;
        const { id } = req.params
        const courseId = id
        
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: 'Invalid course IDdsads' });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        // Validate review data
        if (!rating || !review) {
            return res.status(400).json({ success: false, message: 'Rating and review are required' });
        }

        // Find the course by ID
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Find the review by userId
        const existingReview = course.reviews.find(
            (rev) => rev.userId.toString() === userId
        );

        if (!existingReview) {
            return res.status(404).json({
                success: false,
                message: 'Review not found for this user',
            });
        }

        // Update the review
        existingReview.rating = rating;
        existingReview.review = review;

        // Save the updated course document
        await course.save();

        return res.status(200).json({
            success: true,
            message: 'Review updated successfully',
            data: existingReview,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        // const { userId } = req.body;
        const { id, cid } = req.params
        const courseId = id
        const userId = cid

        console.log(userId)

        // Validate courseId and userId
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ success: false, message: 'Invalid course ID' });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        // Find the course by ID
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Find the review by userId
        const reviewIndex = course.reviews.findIndex(
            (rev) => rev.userId.toString() === userId
        );

        if (reviewIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Review not found for this user',
            });
        }

        // Remove the review from the reviews array
        course.reviews.splice(reviewIndex, 1);

        // Save the updated course document
        await course.save();

        return res.status(200).json({
            success: true,
            message: 'Review deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default deleteReview;