import Instructor from "../models/Instructor.model.js"
import mongoose from 'mongoose'

export const getInstructor = async (request, response) => {
    try {
        const instructor = await Instructor.find({});
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
        response.status(201).json({ success:true, data: newInstructor});
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
        response.status(200).json({ success:true, data:updatedInstructor });
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