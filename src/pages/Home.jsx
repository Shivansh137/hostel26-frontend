import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Post from '../components/Post'
import PostForm from '../components/PostForm'
import { MdSend, MdPhoto , MdArrowDownward} from 'react-icons/md'
import { useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const PostButton = styled.button`
   width: 60px;
   height: 60px;
   bottom: 4vh;
   font-size: 5rem;
   opacity: .8;
   right: 8vw;
   background-image: linear-gradient(135deg,${props => props.theme.bgcolor.secondary[0]},${props => props.theme.bgcolor.secondary[1]});
   @media (min-width:768px){
     &{
       left: 50%;
       translate:-50%;
      }
      &:hover{
       scale: 1.5;
      }
   }
`
const Home = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ title: "", date: "", by: "" });
  const uploadImg = useRef(null);
  const [postImg, setPostImg] = useState(null);
  const [posts, setPosts] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    {
      const res1 = await fetch('https://hostel26-server.onrender.com/profile', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          token:localStorage.getItem('token')
        }
      })
      if (res1.status !== 200) {
        navigate('/login');
      }
      const data1 = await res1.json();
      setStudentData(data1);

      const res2 = await fetch('https://hostel26-server.onrender.com/posts', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data2 = await res2.json();
        setPosts(data2);
    }
  }
  useEffect(() => {
   getData()
  },[]);

  let name, value;
  const handleInput = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  }

  const imageUpload = async(e) => {
    e.preventDefault();
    setPostImg(e.target.files[0]);
  }

  const handleSubmit = async(e) => {
    if (!data.title) {
      e.preventDefault();
      alert("Enter Title");
    }
    else if (!data.date) {
      e.preventDefault();
      alert("Enter Date");
    }
    else if (!postImg) {
      e.preventDefault();
      alert("Select Image");
    }
    else {
      const form = new FormData();
      form.append('title', data.title);
      form.append('date', data.date);
      form.append('by', studentData.name);
      form.append('post',postImg);

      const res = fetch('https://hostel26-server.onrender.com/', {
        method: "POST",
        headers: {
          'Accept': 'image/*'
        },
        body: form
      });
      const data3 = await res.json();
      setPosts([...posts, data3]);
      setVisible(false);
    }
  }

  return (
    <>
      <p className='mg3'>Welcome to first year boys hostel of SGSITS Indore</p>
      <span className='spin1 center mgx6' style={{ zIndex: "-2" }}></span>
      <div className='grid' id='gallery'>
        {posts.map(post => <Post key={post.img} img={post.img} title={post.title} date={post.date} by={post.by} />)}
      </div>
      <br /><br /><br /><br id='bottom' />
      <PostButton onClick={() => { setVisible(true) }} className='circle btn df aic jcc cwhite posfix'>+</PostButton>
      <a href='#bottom'>
      <PostButton style={{left:"8vw"}} className='circle btn df aic jcc cwhite posfix'><MdArrowDownward/></PostButton>
      </a>
      {
        visible && <div className='blur df aic jcc'>
          <PostForm className='posrel' encType='multipart/form-data'>
            <p className='bold'>New Post</p>
            <input type="text" placeholder='Title' name='title' value={data.title} onChange={handleInput} />
            <input type="date" placeholder='Date' name='date' value={data.date} onChange={handleInput} />
            <span className='badge cwhite p1' onClick={() => { setVisible(false) }} style={{ backgroundImage: "linear-gradient(135deg,blueviolet,royalblue)" }}>X</span>

            <div className="df aic jce fw posrel">

              <div className='nobdr circle f3  df aic jcc' style={{ width: "50px", height: "50px" }} onClick={() => { uploadImg.current.click(); }} htmlFor="post"><input ref={uploadImg} type="file" name="post" className='invisible' onChange={imageUpload} /><MdPhoto /></div>
              <button className='nobdr btn circle f3  df aic jcc' onClick={handleSubmit} style={{ width: "50px", height: "50px" }}><MdSend /></button>
            </div>

          </PostForm>
        </div>
      }
    </>
  )
}

export default Home