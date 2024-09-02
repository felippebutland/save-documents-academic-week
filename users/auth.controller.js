import jwt from 'jsonwebtoken';
import User from './user.model.js';

const JWT_SECRET = 'verysecretkey';

export async function registerUser(req, res) {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ id: user._id }, JWT_SECRET, {
                expiresIn: '1h'
            });

            res.json({
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export function protect(req, res, next) {
    const token = req?.headers?.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
}

export async function getUserProfile(req, res) {
    const user = await User.findById(req.user);

    return res.status(200).json({
        email: user.email,
        name: user.name,
        createdAt: user.createdAt
    })
}