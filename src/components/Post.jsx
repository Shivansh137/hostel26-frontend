import React from 'react'
import styled from 'styled-components'

const StyledPost = styled.div`
  width: 45vmax;
  height: 30vmax;
  border-radius: 10px;
  margin: 1.5vmin auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  span{
    padding: .3rem 0rem;
    color: white;
    display: flex;
    align-items: center;
    p{
      padding: .8rem;
    }
  }
`
const Post = (props) => {
  const ChangeDate = () => {
    let arr = props.date.split("-");
    return `${arr[2]}/${arr[1]}/${arr[0]}`
  }

  const img = `url(${props.img})`
  return (
    <>
      <StyledPost style={{backgroundImage:img, backgroundSize:"100% 100%"}}>
        <span className='fw' style={{backgroundColor:"rgba(0,0,0,.4"}}>
          <p>{props.title}</p>
          <p className='right'>{ChangeDate()}</p>
         </span>
        <span className='fw' style={{backgroundColor:"transparent"}}>
          <p className='f2'>by : {props.by}</p>
         </span>
      </StyledPost>
      </>
  )
}

export default Post