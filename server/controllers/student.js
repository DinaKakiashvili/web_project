




import StudentData from '../models/student.js';

export const getStudents = async (req, res)=> {
    try {
        const allStudents = await StudentData.find();

        res.status(200).json(allStudents);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createStudent = async (req, res)=> {
    const student = req.body;

    const newStudent = new StudentData(student); // module(variable)

    try {
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteStudent = async (req, res)=> {
    const id= req.params.id

    try {
        await StudentData.findByIdAndRemove(id).exec();
        res.send('Successfully Deleted!');
    } catch (error) {
        console.log(error);
    }
}

//Getting student grades

export const getCurrStudent= async (req, res) => {

    const name= req.params.studentName
    console.log(name);
    try {
        const grades= await StudentData.find({studentName: name}).exec();
        if (grades.length==0)
            res.status(404).json({ message: 'Cannot find student Name' });
        else
            res.status(200).json(grades);
    } catch (error) {
        console.log(error);
    }
  }