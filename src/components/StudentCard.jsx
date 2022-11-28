import React from 'react'
import styled from 'styled-components'
import {BsFillPersonFill} from 'react-icons/bs'
import {MdLocationOn,MdPhone,MdDoorFront,MdEngineering,MdGroup} from 'react-icons/md'
const Styled = styled.div`
  background-color: ${props => props.theme.bgcolor.secondary};
  color: ${props => props.theme.color.secondary};
  background-image: linear-gradient(135deg,${props => props.theme.bgcolor.secondary[0]},${props => props.theme.bgcolor.secondary[1]});
  margin: 2rem;
  max-width:calc(300px + 15vmin);
  box-shadow:0rem 0rem .8rem;
  p{
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: .4px;
    font-family: Verdana, sans-serif;
    & :nth-child(n){
      margin-left:1rem;
      margin-bottom:1rem;
    }
  }
  img{
  height:calc(100px + 6vmin);
  }
`

const StudentCard = (props) => {
  return (
    <>
      <Styled className='round3 df p2'>
        <img className='bgdark w5 round3' src={props.profilePic} alt="" />
        <div className='dfc p2'>
          <p><BsFillPersonFill /><span>{props.name}</span></p>
          <p><MdEngineering /><span>{props.branch}</span></p>
          <p><MdLocationOn /> <span>{props.city}</span></p>
          <p><MdGroup /> <span>Section : {props.section}</span></p>
          <p><MdDoorFront /> <span>{props.room} ({props.floor})</span></p>
        </div>
     </Styled>
  </>
  )
}

export default StudentCard