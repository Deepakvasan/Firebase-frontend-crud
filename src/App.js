import './App.css';
import {useEffect, useState} from 'react'
import { Button, TextField } from '@mui/material';
import Select, {SelectChangeEvent} from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add'
import { grey } from '@mui/material/colors'
import TextCard from './TextCard';

function App() {
  // State variables
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [clubid, setClubid] = useState("");
  const [dept, setDept] = useState("");
  const [showAddBar, setShowAddBar] = useState(false);

  // UseEffect Hook defenition
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:4000/").then(e => (e.json())).catch(error => {console.log(error.message)});
      if(res.status){
        setData(res.data);
      }
      console.log(data);
    }
    getData();
  }, [])

  // Add User function
  const showAddUserForm = () => {
    setShowAddBar((showAddBar) => (!showAddBar));
  }
  const addUser = async(e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4000/add?name=${name}&roll=${roll}&department=${dept}&clubid=${clubid}`, {method: "POST"}).then(e => (e.json()));
    if(res.status){
      console.log(res.msg);
      setClubid("");
      setDept("");
      setRoll("");
      setShowAddBar(false)
      alert("User " + name + " added successfully!!!")
      setName("");
      window.location.reload();
    }else{
      console.log("Error occured: " + res.msg)
      alert("Error occured !!" + res.msg);
    }
  }
  
  
  return (
    <div className="App">
      <div className="titleBar">
        <div className='titleDetails'>
          <img className='Logo' src="https://roboclubofceg.in/images/logged_out/logo.png" alt="Logo" />
          <h1>Robotics Club of CEG</h1>
        </div>
        <div className="addUser">
          <Button sx={{color: grey[600], borderRadius: "10px"}} startIcon={<AddIcon />} onClick={showAddUserForm}>
            ADD USER
          </Button>
        </div>
      </div>
      {
        showAddBar ? <div className='addUserForm'>
          <div className="addTitle">
            <h2>Enter user Details</h2>
          </div>
          <div className='userForm' >
          <TextField label="Name" variant='outlined' value={name} onChange={(e) => {setName(e.target.value)}}/>
          <TextField label="Roll Number" variant='outlined' value={roll} onChange = {(e) => {setRoll(e.target.value)}} />
          <TextField label="Club Id" variant='outlined' value={clubid} onChange = {(e) => {setClubid(e.target.value)}} />
          <TextField label="Department" variant='outlined' value={dept} onChange = {(e) => {setDept(e.target.value)}} />
          <Button sx={{ borderRadius: "10px", padding: "10px"}} variant='contained' startIcon={<AddIcon />} onClick={addUser}>
            ADD USER
          </Button>
        </div>
        </div>: <div></div>
      }
      <div className="Container">
        {
          data.map(doc => (
            <TextCard name = {doc.name} key = {doc.id} roll = {doc.roll} clubid = {doc.clubid} dept = {doc.department} /> 
          ))
        }
      </div>
    </div>
  );
}

export default App;
