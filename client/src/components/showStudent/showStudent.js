import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

export default function ShowStudent() {

  const [studentsList, setStudentList] = useState([])
  const deleteStudent = (id) => {
    axios.delete(`https://w-server.onrender.com/students/${id}`).then(()=> {
      window.location.reload(false);
    })
  }

  useEffect(() => {
    axios.get('https://w-server.onrender.com/students').then((allStudents) => {
      setStudentList(allStudents.data);
      
    })

  }, [])

  return (
      <>
  
    <h3 style={{ fontFamily: "'Teko', sans-serif",color:"black",margin:'10px 10px 0px 10px' }}>Student grades:</h3>  
    <TableContainer component={Paper} style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontFamily: "'Teko', sans-serif", fontSize: '20px'}}>Student's Name</TableCell>
            <TableCell align="left" sx={{ fontFamily: "'Teko', sans-serif", fontSize: '20px' }}>Course Name</TableCell>
            <TableCell align="left" sx={{ fontFamily: "'Teko', sans-serif", fontSize: '20px' }}>Number of credits</TableCell>
            <TableCell align="left" sx={{ fontFamily: "'Teko', sans-serif", fontSize: '20px' }}>Grade</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentsList.map((student, key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ fontFamily: "'Teko', sans-serif", fontSize: '20px' }}>
                {student.studentName}
              </TableCell>
              <TableCell align="left" sx={{ fontFamily: "'Teko', sans-serif", fontSize: '20px' }}>{student.course}</TableCell>
              <TableCell align="left" sx={{ fontFamily: "'Teko', sans-serif", fontSize: '20px' }}>{student.credits}</TableCell>
              <TableCell align="left" sx={{ fontFamily: "'Teko', sans-serif", fontSize: '20px' }}>{student.grade}</TableCell>
              <TableCell align="left">
              <Button 
                  variant="contained" 
                  startIcon={<DeleteIcon/>} 
                  style={{backgroundColor: 'rgb(164, 19, 18)', color: 'white', fontFamily: "Teko", fontSize: '20px'}} 
                  onClick= {() => deleteStudent(student._id)}
              >
                  Delete
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
    </>
  );
}