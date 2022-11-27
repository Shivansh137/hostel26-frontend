import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import ThemeButton from './ThemeButton'
import {MdHomeFilled, MdApartment, MdGroup, MdAccountBox} from 'react-icons/md'

const StyledNav = styled.header`
 width: 100vw;
  background-color: ${props => props.theme.bgcolor.primary};
  color: ${props => props.theme.color.primary};
  p{
   font-size: 3rem;
   font-family: Verdana;
   margin: .6rem 0;
   width: fit-content;
      }
  span{
    padding:.7rem;
    font-family: Verdana;
    background-color: ${props => props.theme.bgcolor.secondary};
    color: ${props => props.theme.color.secondary};
    background-image: linear-gradient(135deg,${props => props.theme.bgcolor.secondary[0]},${props => props.theme.bgcolor.secondary[1]});
   }
`
const NavBar = (props) => {
  return (
    <>
      <StyledNav className='dfc aic'>
        <p className='bold df jce fw'>HOSTEL'26</p>
        <p style={{fontSize:"1.8rem"}}>🔥Ek Baat toh saaf hai Hostel waale Baap hain🔥</p>
        <span className='grp df aic jce fw'>
          <NavLink className='dfc aic f1' to='/'><MdHomeFilled className='f4'/>Home</NavLink>
          <NavLink className='dfc aic f1' to='/hostel'><MdApartment className='f4'/>Hostel</NavLink>
          <NavLink className='dfc aic f1' to='/students'><MdGroup className='f4'/>Students</NavLink>
          <NavLink className='dfc aic f1' to='/profile'><MdAccountBox className='f4'/>Profile</NavLink>
          <ThemeButton className='f1' logo={props.themeLogo} changeTheme={ props.changeTheme}/>
        </span>
      </StyledNav>
    </>
  )
}

export default NavBar