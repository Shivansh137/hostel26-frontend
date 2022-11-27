import styled from "styled-components";

const Floor = styled.div`
overflow-x: scroll;
display: flex;
flex-direction: column;
margin: 2rem;
background-color: ${props => props.theme.bgcolor.primary};
border: 2px solid ${props => props.theme.color.primary};
 &>span{
  background-color: ${props => props.theme.color.primary};
  color: ${props => props.theme.bgcolor.primary};
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 2rem;
  text-align: center;
  position: sticky;
  padding: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
 }
 & > div{
  min-width: 120vw;
  display: flex;
  align-items: center;
  &>div:nth-child(1){
    background-color: dodgerblue;
    padding: 2rem;
    height: 25rem;
    width: 10rem;
    text-transform: uppercase;
    color: black;
  }
  &>div:nth-child(2) :nth-child(n){
       margin:.5rem 1.5rem;
       display: flex;
  }
  .room{
    background-image: url('images/wall.jpg');
    background-size: 100% 100%;
  }
}
`
export default Floor