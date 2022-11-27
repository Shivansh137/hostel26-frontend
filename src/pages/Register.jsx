import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'

export const StyledForm = styled.form`
  background-color: ${props => props.theme.bgcolor.primary};
  color: ${props => props.theme.color.primary};
  box-shadow: .2rem .2rem 1rem rgba(100,100,100);
  padding: 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: max-content;
  grid-template-columns: 35vmin 35vmin;
  grid-template-areas:"title title" "name city" "branch branch" "mobile room" "floor floor" "password cpassword" "reset submit" "link link";

  input,textarea,select{
    font-weight: bold;
    font-family: Verdana;
    font-size: 1.4rem;
    padding: 1rem;
    color: ${props => props.theme.color.primary};
    background-color: rgba(120,120,120,.2);
  }
  button{
    background-color: ${props => props.theme.color.primary};
  color: ${props => props.theme.color.secondary};
  background-image: linear-gradient(135deg,${props => props.theme.bgcolor.secondary[0]},${props => props.theme.bgcolor.secondary[1]});
  padding: 1rem;
  }
  a:hover{
    color: dodgerblue;
  }
`

const Register = () => {
  const [data, setData] = useState({ name: "", branch: "",section:"", city: "", mobile: "", room: "", floor: "", password: "", cpassword: ""});
  const [profileImg, setprofileImg] = useState(new Blob());
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
  const handleReset = (e) => {
    e.preventDefault();
    setData({  name: "", branch: "",section:"", city: "", mobile: "", room: "",floor:"", password:"", cpassword: ""})
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profile',profileImg);
    formData.append('name', data.name);
    formData.append('branch', data.branch);
    formData.append('section', data.section);
    formData.append('city', data.city);
    formData.append('mobile', data.mobile);
    formData.append('room', data.room);
    formData.append('floor', data.floor);
    formData.append('password', data.password);
    formData.append('cpassword', data.cpassword);
    const res = await fetch('/register',{
      method: "POST",
      headers: {
        'Accept':'image/*'
      },
      body:formData
    })
    const response = await res.json();
    if (!response) {
      alert("Something went wrong :(")
    }
    if (response === "Registered Successfully") {
      navigate('/login');
    }
    else {
      alert(response);
    }
  }
  const imageUpload = (e) => {
    e.preventDefault();
    setprofileImg(e.target.files[0]);
  }

  return (
    <>
        <StyledForm encType='multipart/form-data' onSubmit={(e)=>{e.preventDefault()}}>
          <p className='bold' style={{gridArea:"title",textAlign:"center"}}>REGISTER</p>
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
          <input type="number" placeholder='Mobile' style={{gridArea:"mobile"}} name='mobile' value={data.mobile} onChange={handleInput}/>

        <select name="floor" id="floor" className='cdark' value={data.floor} onChange={handleInput}>
          <option hidden value="floor">Floor</option>
          <option value="Ground">Ground</option>
          <option value="First">First</option>
          <option value="Second">Second</option>
        </select>

          <input type="password" placeholder='Password' style={{gridArea:"password"}} name='password' value={data.password} onChange={handleInput}/>
        <input type="password" placeholder='Confirm Password' style={{ gridArea: "cpassword" }} name='cpassword' value={data.cpassword} onChange={handleInput} />
        <button className='btn' onClick={(e) => { uploadImg.current.click(); }} htmlFor="profile"><input ref={uploadImg} type="file" name="profile" className='invisible' onChange={imageUpload} />Upload Profile</button>

          <button className='btn'  style={{ gridArea: "reset" }} onClick={handleReset}>Reset</button>
          <button className='btn'  style={{ gridArea: "submit" }} onClick={handleSubmit} >Submit</button>
          <Link to='/login' className='f2 mgt1 tc' style={{ gridArea: "link" }}>Already have an account?</Link>
        </StyledForm>
    </>
  )
}

export default Register