import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    studentName:{
        type: String,
        required: true
    },
    course:{
        type: String,
        required: true
    },
    credits:{
        type: Number,
        required: true
    },
    grade:{
        type: Number,
        required: true
    }
});

const student = mongoose.model('student', studentSchema);


export default student;
