import User from "../models/User.model.js"
import mongoose from 'mongoose'
import cloudinary from 'cloudinary'

export const getUser = async (request, response) => {
    try {
        const user = await User.find({});
        response.status(200).json({ success: true, message: "Users Retrieved.", data: user });
    } catch (error) {
        console.log("Error in fetching Users: ", error.message);
        response.status(500).json({ success: false, message: "Server Error." });
    }
};

export const getOneUser = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findById(id);
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

    for(let i = 0; i < request.body.interests.length; i++) {
        interests.push({
            title: request.body.interests[i].title
        })
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