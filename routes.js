
import express from 'express';
import studentController from './studentController.js';
import authenticateToken from './authMiddleware.js';

const router = express.Router();

// Protected route: create a new student
router.post("/students", authenticateToken, studentController.createStudent);

// Protected route: get all students
router.get('/students', authenticateToken, studentController.getAllStudents);

export default router;
