import Instructor from "../models/Instructor.model.js"
import mongoose from 'mongoose'

export const getInstructor = async (request, response) => {
    try {
        const instructor = await Instructor.find({})
        .populate('user')
        .sort({ createdAt: -1 })
        .exec();
        response.status(200).json({ success: true, message: "Instructor Retrieved.", data: instructor });
    } catch (error) {
        console.log("Error in fetching Instructor: ", error.message);
        response.status(500).json({ success: false, message: "Server Error."});
    }
};

export const getOneInstructor = async (request, response) => {
    try {
        const { id } = request.params;
        const instructor = await Instructor.findById(id);
        response.status(200).json({ success: true, message: "Instructor Retrieved.", data: instructor });
    } catch (error) {
        console.log("Error in fetching Instructor: ", error.message);
        response.status(500).json({ success: false, message: "Server Error."});
    }
};

export const createInstructor = async (request, response) => {
    const instructor = request.body;
    
    if(!instructor.first_name || !instructor.last_name || !instructor.user) {
        return response.status(400).json({ success:false, message:"Please provide all fields."});
    }

    const newInstructor = new Instructor(instructor);

    try {
        await newInstructor.save();
        await newInstructor.populate('user');
        response.status(201).json({ success:true, data: newInstructor, message:"Successful: User Successfully Created"});
    } catch (error) {
        console.error("Error in Create Instructor:", error.message);
        response.status(500).json({ success: false, message: "Server Error: Error in Creating Instructor."});
    }
}

export const updateInstructor = async (request, response) => {
    const { id } = request.params;

    const instructor = request.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ success:false, message: "Invalid Instructor ID" });
    }

    try {
        const updatedInstructor = await Instructor.findByIdAndUpdate(id, instructor, {new:true});
        await updatedInstructor.populate('user');
        response.status(200).json({ success:true, data:updatedInstructor, message:"Successful: Instructor Successfully Updated" });
    } catch (error) {
        response.status(500).json({ success: false, message: "Server Error: Error in Updating Instructor."})
    }
}

export const deleteInstructor = async (request, response) => {
    const { id } = request.params;
    try {
        const result = await Instructor.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Instructor not Found.'});
        }

        response.status(200).json({ success: true, message: "Instructor Deleted." })
    } catch (error) {
        response.status(500).json({ success: false, message: "Server Error: Error in Deleting Instructor." })
    }
}