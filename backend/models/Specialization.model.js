import mongoose, { Schema } from 'mongoose';

const specSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        },
    description: {
        type: String,
        required: true,
        },
    category: {
            type: Schema.Types.ObjectId, 
            ref: 'Category', 
            required:true
        }
    },
    {
        timestamps: true,
    });

    const Spec = mongoose.model('Specialization', specSchema);
    export default Spec;