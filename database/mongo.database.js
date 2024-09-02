import mongoose from 'mongoose';

export async function connectDB() {
    await mongoose.connect('mongodb://mongodb:27017/sendDocuments', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB connected');
}