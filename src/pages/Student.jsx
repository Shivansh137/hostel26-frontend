//IMPORTS
import StudentCard from "../components/StudentCard";
import styled from "styled-components";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
//STYLED_COMPONENTS
const Styled = styled.div`
  display: grid;
  justify-content: center;
  @media (min-width:768px){
    grid-template-columns: auto auto auto;
  }
`
const SortandFilter = styled.div`
background-color: ${props=>props.theme.bgcolor.primary};
color: ${props => props.theme.color.primary};
box-shadow: .1rem .1rem 1rem rgba(100,100,100);
padding: 1rem;
   display: flex;
   width: fit-content;
   border-radius: 8px;
   justify-content: space-evenly;
   margin-bottom: 1rem;
   input,textarea,select{
    font-weight: bold;
    font-family: Verdana;
    font-size: 1.4rem;
    padding: 1rem;
    color: #8d8d8d;
    background-color: rgba(120,120,120,.2);
  }
   & :nth-child(n){
    margin: .2rem;
    text-align: center;
   }
   @media (min-width:768px){
    &{
      grid-template-areas:"branch floor search" ;
      justify-content: space-evenly;
    }
   }
`
//STUDENT
const Student = () => {
  //STATES
  const [students, setStudents] = useState("Loading...");
  const [studentsData, setStudentsData] = useState([{}]);
  const [branch, setBranch] = useState("All");
  const [floor, setFloor] = useState("All");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //EFFECTS
  useEffect(() => {
    //FETCHING THE DATA
    fetch('https://hostel26-server.onrender.com/students', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON(localStorage.getItem('token'))
    }).then((data) => {
      if (data.status !== 200) {
        navigate('/login')
}
      else {
        data.json().then((studentsdata) => { //.json() returns a promise
          setStudentsData(studentsdata)//STORING STUDENTS DATA
          setStudents(studentsdata.map((student) => {
            const { name, branch, section, city, mobile, room, floor, profilePic } = student;
            return (<StudentCard key={mobile} name={name} branch={branch} section={section} city={city} mobile={mobile} room={room} floor={floor} profilePic={`https://hostel26-server.onrender.com/images/${profilePic}`} />)
          }));

        }).catch((err) => {})
      }
    }).catch((err) => {})
  },[navigate]);

  //FILTERS
  const handleSelect = (e) => {
    //START LOADING
    setLoading(true)
    //FILTER BY BRANCH
    if (e.target.name === "branch") {
      setBranch(e.target.value);
      let sorted_data;
      if (e.target.value === "All") {
        sorted_data = studentsData;
      }
      else {
        sorted_data = studentsData.filter((value) => { return value.branch === e.target.value });
      }
      if (floor !== "All") {
        sorted_data = sorted_data.filter((value) => { return value.floor === floor });
      }
      let final_data = sorted_data.map((student) => {
        const { name, branch, city, mobile, room, floor, profilePic } = student;
        return (<StudentCard key={mobile} name={name} branch={branch} city={city} mobile={mobile} room={room} floor={floor} profilePic={`https://hostel26-server.onrender.com/images/${profilePic}`} />)
      })
      if (final_data.length === 0) {
        final_data = "No Matches Found🔍"
      }
      setStudents(final_data);
      setLoading(false)
    }
    //FILTER BY FLOOR
    if (e.target.name === "floor") {
      setFloor(e.target.value);
      let sorted_data
      if (e.target.value === "All") {
        sorted_data = studentsData;
      }
      else {
        sorted_data = studentsData.filter((value) => { return value.floor === e.target.value });
      }
      if (branch !== "All") {
        sorted_data = sorted_data.filter((value) => { return value.branch === branch });
      }
      let final_data = sorted_data.map((student) => {
        const { name, branch,section, city, mobile, room, floor, profilePic } = student;
        return (<StudentCard key={mobile} name={name} branch={branch} section={section} city={city} mobile={mobile} room={room} floor={floor} profilePic={`https://hostel26-server.onrender.com/images/${profilePic}`} />)
      })
      if (final_data.length === 0) {
        final_data = "No Matches Found🔍"
      }
      setStudents(final_data);
      setLoading(false)
    }
  }
  const handleSearch = (e) => {
    setLoading(true)
    let search_data = studentsData.filter((student) => { return (student.name).toLowerCase().indexOf((e.target.value).toLowerCase()) !== -1 })
    let final_data = search_data.map((student) => {
      const { name, branch,section, city, mobile, room, floor, profilePic } = student;
      return (<StudentCard key={mobile} name={name} branch={branch} section={section} city={city} mobile={mobile} room={room} floor={floor} profilePic={`https://hostel26-server.onrender.com/images/${profilePic}`} />)
    })
    if (final_data.length === 0) {
      final_data = "No Matches Found🔍"
    }
    setStudents(final_data);
    setLoading(false)
  }
  return (
    <div className="dfc aic mgt2">
      <SortandFilter>
        <div style={{gridArea:"branch"}}>
          <label>Branch : </label>
          <select className="cdark round2" name="branch" id="" onChange={handleSelect} value={branch}>
          <option value="All">All</option>
        <option value="Computer Science and Engineering">CSE</option>
        <option value="Information Technology">IT</option>
        <option value="Electronics and Telecommunication">EC</option>
        <option value="Electronics and Instrumentation">EI</option>
        <option value="Mechanical Engineering">ME</option>
        <option value="Electrical Engineering">EE</option>
        <option value="Bio Medical Engineering">BME</option>
        <option value="Industrial Production">IP</option>
          </select>
        </div>

        <div  style={{gridArea:"floor"}}>
          <label>Floor : </label>
          <select className="cdark round2" name="floor" id="" onChange={handleSelect} value={floor} >
            <option value="All">All</option>
            <option value="Ground">Ground</option>
            <option value="First">First</option>
            <option value="Second">Second</option>
          </select>
        </div>
      </SortandFilter>
        <div className="df aic w8" style={{ gridArea: "search" }}>
          <input style={{color: "#8d8d8d",backgroundColor: "rgba(120,120,120,.2)"}} type="text" className="p2 px3 round4 mgt2 fw" placeholder="Search..." onChange={handleSearch} />
        </div>
      <Styled>
        {students}
      </Styled>
      <div className="fw fh blur" style={{ visibility: loading ? "visible" : "hidden" }}>
        <span className="spin1"></span>
      </div>
    </div>
  )
}

export default Student