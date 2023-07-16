import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function Create() {
    const [student, setStudent] = useState({
        studentName: '',
        course: '',
        credits: '',
        grade: ''
    });

    const createStudent = () => {
        axios.post('https://w-server.onrender.com/students', student).then( () => {
          window.location.reload(false);
        })
    }

  return (
      <>
    <h3 style={{ fontFamily: "'Teko', sans-serif",color:"black",margin:'30px 10px 0px 10px'  }}>Add Grade:</h3>  
    <Box
    
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '20ch' },
        bgcolor: 'rgba(255, 255, 255, 0.5)', //0.5 is the opacity
        width: '110ch',
        boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)', 
      }}
      noValidate
      autoComplete="off">
    
      <TextField id="outlined-basic" label="Student Name" variant="outlined" value={student.studentName} onChange={(event) => {
          setStudent({...student, studentName: event.target.value})
      }}
          InputProps={{ 
            style: { fontFamily: "Teko" }
          }}
          InputLabelProps={{
              style: { fontFamily: "Teko" },
            }}
      />
      <TextField id="outlined-basic" label="Course Name" variant="outlined" value={student.course} onChange={(event) => {
          setStudent({...student, course: event.target.value})
      }}
      InputProps={{ 
        style: { fontFamily: "Teko" }
      }}
      InputLabelProps={{
          style: { fontFamily: "Teko" },
        }}
      />
      <TextField id="outlined-basic" label="course credits" variant="outlined" value={student.credits} onChange={(event) => {
          setStudent({...student, credits: event.target.value})
      }}
      InputProps={{ 
        style: { fontFamily: "Teko" }
      }}
      InputLabelProps={{
          style: { fontFamily: "Teko" },
        }}
     />
      <TextField id="outlined-basic" label="student Grade" variant="outlined" value={student.grade} onChange={(event) => {
          setStudent({...student, grade: event.target.value})        
      }}
      InputProps={{ 
        style: { fontFamily: "Teko" }
      }}
      InputLabelProps={{
          style: { fontFamily: "Teko" },
        }}
     />

      <Button 
      variant="contained" 
      startIcon={<AddOutlinedIcon/>} 
      onClick={createStudent}  
      style={{ fontFamily: "Teko", fontSize: '18px',  width: '150px', height: '50px',backgroundColor:'rgb(229, 215, 170)' }}>Add Grade </Button>
      </Box>
      <br /><br />
    
    </>
  );
}