import express from 'express';
import { getStudents , createStudent , deleteStudent, getCurrStudent} from '../controllers/student.js';
import student from '../models/student.js';




const router = express.Router();







//lecturer crud
router.get('/:studentName', getCurrStudent);
router.get('/', getStudents);
router.post('/', createStudent);
router.delete('/:id', deleteStudent);

export default router;