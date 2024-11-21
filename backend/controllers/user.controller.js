import User from "../models/User.model.js"
import mongoose from 'mongoose'
import cloudinary from 'cloudinary'
import Course from "../models/Course.model.js";

export const getUser = async (request, response) => {
    try {
        const user = await User.find({}).populate({
            path: 'cart.course_id',
            model: 'Course'
        }).exec();
        response.status(200).json({ success: true, message: "Users Retrieved.", data: user });
    } catch (error) {
        console.log("Error in fetching Users: ", error.message);
        response.status(500).json({ success: false, message: "Server Error." });
    }
};

export const getOneUser = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findById(id).populate({
            path: 'cart.course_id',
            model: 'Course'
        }).exec();
        response.status(200).json({ success: true, message: "Users Retrieved.", data: user });
    } catch (error) {
        console.log("Error in fetching Users: ", error.message);
        response.status(500).json({ success: false, message: "Server Error." });
    }
};

export const createUser = async (request, response) => {
    const user = request.body;

    if (!user.email || !user.password) {
        return response.status(400).json({ success: false, message: "Please provide all fields." });
    }

    const newUser = new User(user);

    try {
        await newUser.save();
        response.status(201).json({ success: true, data: newUser, message: "User created Successfully!" });
    } catch (error) {
        console.error("Error in Create User:", error.message);
        response.status(500).json({ success: false, message: "Server Error: Error in Creating User." });
    }
}

export const updateUser = async (request, response) => {
    const { id } = request.params;

    let images = []
    // console.log('before', request.body.avatar)
    if (Array.isArray(request.body.avatar)) {
        if (typeof request.body.avatar[0] === 'string') {
            const userImage = await User.findById(id);

            if (userImage && userImage.avatar.length > 0) {

                try {
                    await cloudinary.v2.uploader.destroy(userImage.avatar[0].public_id);
                } catch (error) {
                    console.log("Can't delete previous image:", error);
                }
            }

            images = request.body.avatar;
            let imagesLinks = [];
            for (let i = 0; i < images.length; i++) {
                try {
                    const result = await cloudinary.v2.uploader.upload(images[i], {
                        folder: 'users',
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
            request.body.avatar = imagesLinks
        } else if (typeof request.body.avatar[0] === 'object') {

        }
    } else if (typeof request.body.avatar === 'string') {
        images.push(request.body.avatar);
    }

    let interests = []

    if (request.body.interests && request.body.interests.length > 0) {
        for (let i = 0; i < request.body.interests.length; i++) {
            interests.push({
                title: request.body.interests[i].title
            });
        }
    }

    request.body.interests = interests
    // console.log("interests", interests)

    const user = request.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ success: false, message: "Invalid User ID" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
        response.status(200).json({ success: true, data: updatedUser, message: "User Successfully Updated!" });
    } catch (error) {
        response.status(500).json({ success: false, message: "Server Error: Error in Updating User.", error })
    }
}

export const deleteUser = async (request, response) => {
    const { id } = request.params;
    try {
        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'User not Found.' });
        }

        response.status(200).json({ success: true, message: "User Deleted." })
    } catch (error) {
        response.status(500).json({ success: false, message: "Server Error: Error in Deleting User." })
    }
}

export const addToCart = async (req, res) => {
    try {
        const { userId } = req.params
        const { course_id } = req.body

        const user = await User.findById(userId)
        const course = await Course.findById(course_id)

        if (!user) {
            return res.status(404).send({ message: 'User not Found.' });
        }

        if (!course) {
            return res.status(404).send({ message: 'Course not Found.' });
        }

        const existingCartItem = user.cart.find(item => item.course_id.toString() === course_id);

        if (existingCartItem) {
            return res.status(200).send({ success: false, message: "This Item is already added to cart." })
        } else {
            user.cart.push({ course_id })
        }

        await user.save()
        return res.status(200).send({ success: true, message: "Successful: Course has been added to Cart." })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error })
    }
}

export const processCheckout = async (req, res) => {
    try {
        const { userId } = req.params;
        const checkoutItems = req.body; // Array of items with course id and price
        // console.log(checkoutItems)

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not Found.' });
        }

        // Calculate the total cost
        const totalCost = checkoutItems.reduce((acc, item) => acc + item.price, 0);

        // Filter out the items in the user's cart that were purchased
        user.cart = user.cart.filter(
            cartItem => !checkoutItems.some(item => item.id === String(cartItem.course_id))
        );

        // Create the order object
        const order = {
            course: checkoutItems.map(item => ({
                course_id: item.id
            })),
            total_cost: totalCost
        };

        // Add the order to the user's checkout
        user.checkout.push({ order });

        // Save the user with updated cart and checkout data
        await user.save();

        res.status(200).json({ success: true, message: 'Checkout processed successfully', order });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error: Process Checkout", error });
    }
};

export const updateCourseStatus = async (req, res) => {
    const { userId, orderId, courseId, newStatus } = req.body; // Expecting userId, orderId, courseId, and newStatus to be passed
    console.log(req.body)
    try {
        // Find user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the order that matches the provided orderId
        const order = user.checkout.find(order => order._id.toString() === orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Find the specific course in the order by courseId
        console.log(courseId)
        console.log(order.order.course)
        const course = user.checkout
            .find(order => order.order.course.some(course => course._id.toString() == courseId))
            ?.order.course.find(course => course._id.toString() == courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found in this order' });
        }

        // Update the status of the course
        course.status = newStatus;

        // Save the updated user document
        await user.save();

        return res.status(200).json({ message: 'Course status updated successfully', course });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};