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

    const AuthorImage = mongoose.model('AuthorImage', imageSchema);
    export default AuthorImage;

    // images
	// id
	// filename