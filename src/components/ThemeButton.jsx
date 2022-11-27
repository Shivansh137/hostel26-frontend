import styled from "styled-components"
import {BsFillMoonFill, BsFillSunFill} from 'react-icons/bs'

const Styled = styled.button`
  background-color:transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0;
  font-size: 1rem;
  cursor: pointer;
`

const ThemeButton = (props) => {
  return (
    <>
      <Styled title="Theme" onClick={props.changeTheme}>
        {props.logo === 'Light' ? <BsFillSunFill className="f3"/> : <BsFillMoonFill className="f3"/>}
        Theme
</Styled>
    </>
  )
}

export default ThemeButton