import React, {useState} from 'react'
import {StyledForm } from './Register'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [data, setData] = useState({ mobile: "", password: "" });
  const navigate = useNavigate();
  let name, value;
  const handleInput = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
   setData({ ...data, [name]: value });
  }
  const handleReset = (e) => {
    e.preventDefault();
    setData({mobile: "",password: ""})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://hostel26-server.onrender.com/login', {
      method: "POST",
      'Access-Control-Allow-Credentials':true,
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      res.json().then((res) => {
        if (res === "Login Successfull") {
          navigate('/');
        }
        else {
          alert(res);
        }
      })
    }).catch((e) => {
      console.log(e);
    })
    }

  return (
    <>
        <StyledForm style={{gridTemplateAreas:'"title title" "mobile mobile" "password password" "reset submit" "link link" '}}>
          <p style={{ gridArea: "title", textAlign: "center" }}>LOGIN</p>
          <input type="number" placeholder='Mobile' style={{gridArea:"mobile"}} name='mobile' value={data.mobile} onChange={handleInput}/>
          <input type="password" placeholder='Password' style={{gridArea:"password"}} name='password' value={data.password} onChange={handleInput}/>
          <button className='btn'  style={{ gridArea: "reset" }} onClick={handleReset}>Reset</button>
          <button className='btn'  style={{ gridArea: "submit" }} onClick={handleSubmit} >Submit</button>
          <Link to='/register' className='f2 tc mgy1' style={{ gridArea: "link" }}>Don't have an account?</Link>
        </StyledForm>
    </>
  )
}

export default Login