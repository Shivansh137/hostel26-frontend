import React from 'react'
import styled from 'styled-components'
import { StyledForm } from './Register'
import { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { useRef } from 'react'

const StyledTable = styled.table`
    background-color: ${props => props.theme.color.primary};
    th{
      padding: 1rem;
    background-color: ${props => props.theme.bgcolor.secondary[1]};
    color: ${props => props.theme.color.primary};
    }
    td{
      padding: 1rem;
      background-color: ${props => props.theme.bgcolor.primary};
      color: ${props => props.theme.color.primary};
    }
`
const Button = styled.button`
      background-color: ${props => props.theme.bgcolor.secondary};
      color: ${props => props.theme.color.secondary};
      background-image: linear-gradient(135deg,${props => props.theme.bgcolor.secondary[0]},${props => props.theme.bgcolor.secondary[1]});
`
const StyledProfile = styled.div`
  width: 50vmax;
  height: 60vh;
  text-align: center;
  @media (max-width:768px){
    &{
      width: 40vmax;
      flex-direction: column;
      align-items: center;
      &>div:nth-child(1){
        flex-direction: row;
        width: 100%;
        height: 40vh;
      }
    }
    #profilePic{
        width: 60vw !important;
        height: 120% !important;
       }
  }
`
const Profile = () => {
  const [studentData, setStudentData] = useState({});
  const [data, setData] = useState({name:"", branch:"", section:"", city:"", room:"", floor:""});
  const [visible, setVisible] = useState(false);
  const getData = () => {
    //FETCHING THE DATA
    fetch('https://hostel26-server.cyclic.app/profile', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token:localStorage.getItem('token')
      })
    }).then((data) => {
      if (data.status !== 200) {
        navigate('/login')
      }
      else {
        data.json().then((studentdata) => { //.json() returns a promise
          setStudentData(studentdata);//STORING STUDENTS DATA
          setData({ ...studentdata });
        }).catch((err) => { console.log(err); })
      }
    }).catch((err) => { });
  }
  useEffect(() => {
   getData()
  },[]);

  const uploadImg = useRef(null);
  const navigate = useNavigate();
  let name, value;
  const handleInput = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    if ((name === "name"|| name==="city") && value.charAt(value.length - 1) !== " " && value !== ""  &&  !isNaN(value.charAt(value.length - 1))) {
      alert("Name me numbers kahan se aa gye🤔\nEnter text only")
    }
    else {
      setData({ ...data, [name]: value });
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`https://hostel26-server.cyclic.app/profile/${studentData._id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data)

    }).then(() => { }).catch((err) => { console.log(err); });
    getData();
    setVisible(false);
 }

const imageUpload = async(e) => {
   const form = new FormData();
   form.append('updateprofile', e.target.files[0]);
  const res = await fetch(`https://hostel26-server.cyclic.app/profile/${studentData._id}/${studentData.profilePic}`, {
    method: "PATCH",
    headers: {
      'Accept': 'image/*'
    },
    body: form
  })
  const data = await res.json();
  setStudentData({ ...studentData, profilePic: data });
  }

  return (
    <>
    <StyledProfile className=" df jce aic round3 center">

        <div id='profilePic' style={{ width: "30%", height: "60%", backgroundImage: `url(${`https://hostel26-server.cyclic.app/images/img_avatar.png`})`, backgroundSize: "100% 100%", overflow: "hidden" }} className='bgblue posrel mgb2 round3'>
        <button style={{backgroundColor:"rgba(0,0,0,.5)", left:"0"}} className='cwhite nobdr p2 bold ls1 posabs fw b0' onClick={() => { uploadImg.current.click(); }} htmlFor="profile"><input ref={uploadImg} type="file" name="profile" className='invisible' onChange={imageUpload} />Update</button>

      </div>
      <div className='dfc '>
        <div className='mgb5'>
            <p style={{ fontSize: "6vmin", fontFamily: "Verdana"}} className='ls1 bold'>{ studentData.name}</p>
        <p className='mgx2' style={{ fontSize: "3vmin", fontFamily: "Verdana" }}>({studentData.branch})</p>
       </div>
          <StyledTable>
            <thead>
          <tr>
            <th>Room</th>
            <th>Floor</th>
            <th>Section</th>
            <th>City</th>
          </tr>
            </thead>
            <tbody>
          <tr align='center'>
              <td>{studentData.room }</td>
            <td>{studentData.floor }</td>
            <td>{studentData.section }</td>
            <td>{studentData.city}</td>

              </tr>
              </tbody>
          </StyledTable>
<Button className='btn mgt5 ht2 f3' onClick={()=>{setVisible(true)}}>Edit Profile</Button>
      </div>
    </StyledProfile>
      {
        visible &&  <div className='blur'>
        <span className='center'>
        <StyledForm style={{gridTemplateAreas:'"title title" "name city" "room floor" "branch section" "password submit"'}}>
          <p className='bold' style={{gridArea:"title",textAlign:"center"}}>Edit Profile</p>
          <input type="text" placeholder='Name' style={{ gridArea: "name" }} name='name' value={data.name} onChange={handleInput} />
       <select className='cdark' name="branch" id="branch" value={data.branch} onChange={handleInput}>
       <option value="branch" hidden>Branch</option>
        <option value="Computer Science and Engineering">CSE</option>
        <option value="Information Technology">IT</option>
        <option value="Electronics and Telecommunication">EC</option>
        <option value="Electronics and Instrumentation">EI</option>
        <option value="Mechanical Engineering">ME</option>
        <option value="Electrical Engineering">EE</option>
        <option value="Bio Medical Engineering">BME</option>
        <option value="Industrial Production">IP</option>
       </select>
       <select className='cdark' name="section" id="section" value={data.section} onChange={handleInput}>
        <option value="section" hidden>Section</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
        <option value="G">G</option>
        <option value="H">H</option>
        <option value="I">I</option>
        <option value="J">J</option>
       </select>
          <input type="text" placeholder='City' style={{gridArea:"city"}} name='city' value={data.city} onChange={handleInput}/>
        <input type="number" placeholder='Room' style={{ gridArea: "room" }} name='room' value={data.room} onChange={handleInput} />

        <select name="floor" id="floor" className='cdark' value={data.floor} onChange={handleInput}>
          <option hidden value="floor">Floor</option>
          <option value="Ground">Ground</option>
          <option value="First">First</option>
          <option value="Second">Second</option>
        </select>

            <button className='btn' style={{ gridArea: "submit" }} onClick={handleSubmit} >Update</button>
            <span className="badge bgred" onClick={()=>{setVisible(!visible)}}>X</span>
        </StyledForm>
        </span>
      </div>
     }
    </>
  )
}

export default Profile