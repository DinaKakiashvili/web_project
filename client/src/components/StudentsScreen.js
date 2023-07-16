import * as React from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@mui/material'
import CurrStudent from './showCurrStudent/showCurrStudent.js';
import useStyles from '../styles';
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { UserContext } from '../UserContext';
import LogoutIcon from '@mui/icons-material/Logout';

  
  const StudentsScreen = ({ history}) => {
    const classes = useStyles();
    let navigate=useNavigate();
    const [error, setError] = useState("");
    const [privateData, setPrivateData]= useState("");
    const {value, setValue} = useContext(UserContext);
    let currUser= value; //holds the name of the current online user

    useEffect(()=> {
        if(!localStorage.getItem("authToken")) {
            navigate("/login");
        }
        
        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

        try {
            const {data} = await axios.get("/api/private", config);
            setPrivateData(data.data);
        } catch (error) {
            localStorage.removeItem("authToken");
            setError("You are not authorized! please log in first");
        }
        }
        fetchPrivateData();
    }, [history])
    const logoutHandler=()=> {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

  return (
    <div className="App" >
       <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="transparent" >
        <Typography variant="h4" align="center" 
           style={{ fontFamily: "'Teko', sans-serif", color: 'rgb(110, 31, 16)',padding:'20px 10px 20px 10px',margin:'0px 10px 0px 10px' }}
          > {currUser}'s Grades </Typography>
        </AppBar>
        
        <Grow in>
          <Container>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={8}>
          <CurrStudent/>
        </Grid>
      </Grid>
          </Container>
        </Grow>
      </Container>
      <Box textAlign='center' margin='30px'>
      <Button 
      variant="contained"
      startIcon={<LogoutIcon/>} 
      onClick= {logoutHandler}
      style={{ fontFamily: "Teko", fontSize: '20px' ,backgroundColor: 'rgb(146,143,144)' }}>Logout  </Button>
      </Box>
    </div>
  );
}
export default StudentsScreen;