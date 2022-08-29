import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { pink, grey } from '@mui/material/colors'
import React from 'react'
import './TextCard.css'

function TextCard({name, clubid, roll, dept}) {
    const deleteUser = async(e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:4000/delete?clubid=${clubid}`, {method: "POST"}).then((k) => (k.json())).catch(err => {console.log(err.message)});
        if(res.status){
            console.log(res.msg);
            alert("User "+ name +" deleted successfully!!!");
            window.location.reload();
        }else{
            console.log(res.msg);
            alert("Error Occured while deleting user!!");
        }
    }
  return (
    <div className='container'>
        <div className="topBar">
            <div className="nameDetails">
                <h2>{name}</h2>
                <h3>Club Id: {clubid}</h3>
                <div className='editButton'>
                    <EditIcon color="grey" />
                </div>
            </div>
            <div className="deleteIcon">
                <Button variant="contained" sx={{ backgroundColor: grey[400]}} startIcon={<DeleteIcon />} onClick={deleteUser}>
                    REMOVE USER
                </Button>
            </div>
        </div>
        <div className="bottomBar">
            <div className="department">
                <p>Department: {dept}</p>
            </div>
            <div className="divider">
                <p> | </p>
            </div>
            <div className="rollnumber">
                <p>Roll Number: {roll}</p>
            </div>
        </div>
    </div>
  )
}

export default TextCard