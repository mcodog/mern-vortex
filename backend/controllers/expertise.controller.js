import Expertise from "../models/Expertise.model.js"
import mongoose from 'mongoose'

export const getExpertise = async (request, response) => {
    try {
        const expertise = await Expertise.find({});
        response.status(200).json({ success: true, message: "Expertise Retrieved.", data: expertise });
    } catch (error) {
        console.log("Error in fetching Expertise: ", error.message);
        response.status(500).json({ success: false, message: "Server Error."});
    }
};

export const createExpertise = async (request, response) => {
    const expertise = request.body;
    
    if(!expertise.instructor || !expertise.category || !expertise.grade) {
        return response.status(400).json({ success:false, message:"Please provide all fields."});
    }

    const newExpertise = new Expertise(expertise);

    try {
        await newExpertise.save();
        response.status(201).json({ success:true, data: newExpertise});
    } catch (error) {
        console.error("Error in Create Expertise:", error.message);
        response.status(500).json({ success: false, message: "Server Error: Error in Creating Expertise."});
    }
}

export const updatedExpertise = async (request, response) => {
    const { id } = request.params;

    const expertise = request.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ success:false, message: "Invalid Expertise ID" });
    }

    try {
        const updatedExpertise = await Expertise.findByIdAndUpdate(id, expertise, {new:true});
        response.status(200).json({ success:true, data:updatedExpertise });
    } catch (error) {
        response.status(500).json({ success: false, message: "Server Error: Error in Updating Expertise."})
    }
}

export const deleteExpertise = async (request, response) => {
    const { id } = request.params;
    try {
        const result = await Expertise.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Expertise not Found.'});
        }

        response.status(200).json({ success: true, message: "Expertise Deleted." })
    } catch (error) {
        response.status(500).json({ success: false, message: "Server Error: Error in Deleting Expertise." })
    }
}