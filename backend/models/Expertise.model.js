import mongoose, { Schema } from 'mongoose';

const expertiseSchema = mongoose.Schema({
    instructor: [{
        type: Schema.Types.ObjectId,
        ref: "Instructor",
        required: true,
    }],
    category: [{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    }],
    grade: {
        type: String,
        required: true,
        },
    },
    {
        timestamps: true,
    });

    const Expertise = mongoose.model('Expertise', expertiseSchema);
    export default Expertise;

// expertise
// 	id
// 	title
// 	description (optional)
// 	category --> new collection
// 	grade