import React, { useEffect, useState, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { UserContext } from '../../UserContext';

export default function ShowCurrStudent() {

  const [gradesList, setGradesList] = useState([])

  const {value, setValue} = useContext(UserContext);
  let sum1=0;
  let sum2=0;
  let avg=0

  useEffect(() => {
    let currUser= value; //holds the name of the current online user
    console.log(currUser);
    const getCurrStudent = (studentName) => {
    axios.get(`https://w-server.onrender.com/students/${studentName}`).then((userGrades) => {
      setGradesList(userGrades.data);
    })}
   
    getCurrStudent(currUser);
    
    for (var i=0; i<gradesList.length;i++) {
     
    }
   }, [])

   const myFunc = (() => {
    if (gradesList.length!=0) {
      gradesList.map((grade, key) => (
        sum1=sum1+grade.grade*grade.credits,
        sum2=sum2+grade.credits,
        avg=(Math.round((sum1/sum2) * 100) / 100).toFixed(2)
      )); }
      else {
        avg=0;
      }
   });

  return (
      <>
      <h3 style={{ fontFamily: "'Teko', sans-serif",color:"black",margin:'10px 10px 0px 10px' }}>Student grades:</h3>  
      <TableContainer component={Paper} style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
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
          {gradesList.map((student, key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{ fontFamily: 'Teko',fontSize:'20px' }}>
                {student.studentName}
              </TableCell>
              <TableCell style={{ fontFamily: 'Teko',fontSize:'20px' }}>{student.course}</TableCell>
              <TableCell style={{ fontFamily: 'Teko',fontSize:'20px' }}>{student.credits}</TableCell>
              <TableCell style={{ fontFamily: 'Teko',fontSize:'20px' }}>{student.grade}</TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br></br>
    <br></br>
    <h2 style={{ fontFamily: 'Teko',fontSize:'20px',color:'rgb(184, 150, 76)' }}>
    GPA: {myFunc(), avg}
    </h2>
    </>
  );
}