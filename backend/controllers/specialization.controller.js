import Spec from "../models/Specialization.model.js"
import mongoose from 'mongoose'

export const getSpec = async (request, response) => {
    try {
        const spec = await Spec.find({})
            .populate('category')
            .exec();

        response.status(200).json({
            success: true,
            message: "Specializations Retrieved.",
            data: spec
        });
    } catch (error) {
        console.log("Error in fetching specializations: ", error.message);
        response.status(500).json({
            success: false,
            message: "Server Error."
        });
    }
};

export const getOneSpec = async (request, response) => {
    try {
        const { id } = request.params;
        const spec = await Spec.findById(id);
        response.status(200).json({ success: true, message: "Specs Retrieved.", data: spec });
    } catch (error) {
        console.log("Error in fetching Specs: ", error.message);
        response.status(500).json({ success: false, message: "Server Error."});
    }
};

export const createSpec = async (request, response) => {
    const spec = request.body;
    
    if(!spec.title || !spec.description || !spec.category) {
        return response.status(400).json({ success:false, message:"Please provide all fields."});
    }

    const newSpec = new Spec(spec);

    try {
        await newSpec.save(); // Save newSpec first
        const populatedSpec = await newSpec.populate('category'); // Populate the 'category' field
        
        response.status(201).json({
            success: true,
            data: populatedSpec,
            message: "Specialization successfully created."
        });
    } catch (error) {
        console.error("Error in Create Specialization:", error.message);
        response.status(500).json({ success: false, message: "Server Error: Error in Creating Specialization."});
    }
}

export const updateSpec = async (request, response) => {
    const { id } = request.params;

    const spec = request.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ success:false, message: "Invalid Speciailization ID" });
    }

    try {
        const updatedSpec = await Spec.findByIdAndUpdate(id, spec, {new:true});
        response.status(200).json({ success:true, data:updatedSpec, message:"Successful: Specialization Successfully Updated" });
    } catch (error) {
        response.status(500).json({ success: false, message: "Server Error: Error in Updating Specialization."})
    }
}

export const deleteSpec = async (request, response) => {
    const { id } = request.params;
    try {
        const result = await Spec.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Specialization not Found.'});
        }

        response.status(200).json({ success: true, message: "Specialization Deleted." })
    } catch (error) {
        response.status(500).json({ success: false, message: "Server Error: Error in Deleting Specialization." })
    }
}