import styled from "styled-components";

const PostForm = styled.form`
    background-color: ${props => props.theme.bgcolor.primary};
  color: ${props => props.theme.color.primary};
  box-shadow: .2rem .2rem 1rem rgba(100,100,100);
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width:67vmin;
   & :nth-child(n){
    margin: 1rem 0;
   }
  input,textarea,select{
    font-weight: bold;
    font-family: Verdana;
    font-size: 1.4rem;
    padding: 1rem;
    color: ${props => props.theme.color.primary};
    background-color: rgba(120,120,120,.2);
  }
  button, div:nth-child(1){
    background-color: ${props => props.theme.color.primary};
  color: ${props => props.theme.color.secondary};
  background-image: linear-gradient(135deg,${props => props.theme.bgcolor.secondary[0]},${props => props.theme.bgcolor.secondary[1]});
  padding: .1rem;
  }
`
export default PostForm