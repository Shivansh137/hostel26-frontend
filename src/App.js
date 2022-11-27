import { ThemeProvider } from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import NavBar from "./components/NavBar";
import { Theme } from "./components/GlobalStyles";
import { useState } from "react";
import { Outlet } from 'react-router-dom'


function App() {
  const [current_theme, setCurrentTheme] = useState(Theme.light);
  const [themeLogo,setThemeLogo] = useState('Dark')
  const changeTheme = () => {
    if (current_theme === Theme.light) {
      setCurrentTheme(Theme.dark);
      setThemeLogo('Light')
    }
    else {
      setCurrentTheme(Theme.light);
      setThemeLogo('Dark')
    }
  }
  return (
    <>
      <ThemeProvider theme={current_theme}>
      <GlobalStyles />
        <NavBar changeTheme={changeTheme} themeLogo={themeLogo} />
        <Outlet/>
      </ThemeProvider>
    </>
  );
}


export default App;
