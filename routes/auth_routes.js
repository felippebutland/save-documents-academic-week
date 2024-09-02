import express from 'express';
import {registerUser, loginUser, protect, getUserProfile} from '../users/auth.controller.js';

const auth_routes = express.Router();

auth_routes.post('/register', registerUser);

auth_routes.post('/login', loginUser);

auth_routes.get('/profile', protect, getUserProfile);

export default auth_routes;