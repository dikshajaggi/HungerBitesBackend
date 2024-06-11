import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://diksha2000may:xYWyZm7v4ylD8FKe@cluster0.4zjougz.mongodb.net/');
        console.log('MongoDB connected');
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            process.exit(1);
        }
        
    }
};

export default connectDB;
