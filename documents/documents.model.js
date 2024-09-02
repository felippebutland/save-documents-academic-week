import mongoose from "mongoose";

const documentsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    documentBase64: { type: String, required: true},
    createdAt: { type: Date, default: Date.now }
})

const Document = mongoose.model('Document', documentsSchema);
export default Document