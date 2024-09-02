import express from 'express';
import {registerUser, loginUser, protect, getUserProfile} from '../users/auth.controller.js';
import {listDocumentsByUser, sendDocument} from "../documents/documents.controller.js";

const documents_routes = express.Router();

documents_routes.post('/create', protect, sendDocument);

documents_routes.get('/find', protect, listDocumentsByUser)

export default documents_routes;