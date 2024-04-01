import jwt from "jsonwebtoken";
import Practise from "./practiseModel.js";
import { JWT_SECRET } from './jwtUtils.js'

const practiseController = {
    // Create practise with JWT authentication
    createPractise: async (req, res) => {
        try {
            // Check if user is authenticated
            const token = req.headers.authorization;

            if (!token) {
                return res.status(401).json({ error: "Unauthorized: No token provided" });
            }

            // Verify JWT token
            jwt.verify(token, JWT_SECRET, async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ error: "Unauthorized: Invalid token" });
                }

                // Assuming you're getting data from request body
                const { name, subject, details } = req.body;

                // Creating a new instance of the Practise model
                const newPractise = new Practise({ name, subject, details });

                // Saving the newPractise to the database
                const savedPractise = await newPractise.save();

                // Sending back the savedPractise as response
                res.status(201).json(savedPractise);
            });
        } catch (error) {
            // Handling errors
            console.error("Error creating practise:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // Get all practises with JWT authentication
    getAllPractise: async (req, res) => {
        try {
            // Check if user is authenticated
            const token = req.headers.authorization;

            if (!token) {
                return res.status(401).json({ error: "Unauthorized: No token provided" });
            }

            // Verify JWT token
            jwt.verify(token, JWT_SECRET, async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ error: "Unauthorized: Invalid token" });
                }

                // Fetching all practises from the database
                const practises = await Practise.find();

                // Sending back the practises as response
                res.json(practises);
            });
        } catch (error) {
            // Handling errors
            console.error("Error getting all practises:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

export default practiseController;
