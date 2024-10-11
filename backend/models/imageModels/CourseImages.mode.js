import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true,
        },
    },
    {
        timestamps: true,
    });

    const courseImage = mongoose.model('courseImage', imageSchema);
    export default courseImage;

    // images
	// id
	// filename