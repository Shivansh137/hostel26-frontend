import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
const Styled = styled.div`
position: relative;
#room{
  width: 250px;
}
`
const RoomIn = styled.div`
      color: ${props => props.theme.color.secondary};
      @media (max-width:768px){
        &{
          flex-direction: column;
          span:nth-child(2){
            top: -5%;
            left: 37%;
          }
          div{
            width: 60vw;
            img{
              width: 80% !important;
              height: 30vh !important;
            }
          }
        }
      }
`

const RoomOut = (props) => {
  const [studentsData, setStudentsData] = useState([{}]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    fetch(`https://hostel26-server.onrender.com/students/${props.room}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      data.json().then((studentsdata) => {
        setStudentsData(studentsdata)
      })
    }).catch((err) => {
      console.log(err);
    })
  });
  const open = () => {
    if (studentsData.length !== 0) {
      setShow(true);
      }
  }
  const close = () => {
    setShow(false);
  }
  return (
    <div>
      <Styled className='dfc aic' onClick={open} >
        <p className='bgred f2 p1 round1 cwhite'>{props.floor+props.room}</p>
        <img className='w3' src="images/door2.jpg" alt="" />
      </Styled>
      {show
        &&
        <div className='blur'>
        <RoomIn className="df jcc round3 front center ft2 bold" style={{fontSize:"2rem",fontFamily:"Verdana", backgroundColor:"rgba(0,0,0,.5)" }}>
          <span onClick={close} className="badge bgred">X</span>
          <span className='circle bgblue10 p3 posabs f6'>{props.room}</span>
          {
            studentsData.map((student) => {
        return (
          <>
          <div className="dfc aic round3 animin">
          <img className='round3 ht10' style={{width:"40vmin"}} src={`https://hostel26-server.onrender.com/images/${student.profilePic}`} alt="profile" />
          <p className='ls1'>{student.name}</p>
          </div>
          </>
        )
            }
            )
          }
      </RoomIn>
       </div> }
    </div>
  )
}

export default RoomOut