import { createGlobalStyle } from 'styled-components'

export const Theme = {
  light: {
    bgcolor: {
      primary: "white",
      secondary: [
        "royalblue", "blueviolet"
      ]
    },
    color: {
      primary: "#282c32",
      secondary: "#ffffff"
    }
  },
  dark: {
    bgcolor: {
      primary: "#282c32",
      secondary: [
        "blueviolet",
        "royalblue"
      ]
    },
    color: {
      primary: "white",
      secondary: "white"
    }
  }
}


const GlobalStyles = createGlobalStyle`
  body{
      background-color: ${props=> props.theme.bgcolor.primary};
      color: ${props => props.theme.color.primary};
      transition: all 0.3s linear;
  }
`

export default GlobalStyles