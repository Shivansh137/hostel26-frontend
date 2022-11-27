import React from 'react'
import Floor from './Floor'
import RoomOut from './RoomOut'

const SecondFloor = () => {
  const rooms1 = [];
  for (let i = 35; i <= 45; i++){
    rooms1.push(i);
  }
  const rooms2 = [];
  for (let i = 46; i <= 57; i++){
    rooms2.push(i);
  }
  return (
    <>
      <Floor>
        <span>Second Floor</span>

        <div>

        <div className='invisible'>

        </div>

          <div>
          <span className="spin1 center" style={{zIndex:"-10"}}></span>

          <div className='room'>{rooms2.map((room) => { return (<RoomOut key={room} room={room} floor="S" />) })}</div>
          <div className='room'>{rooms1.map((room) => {return<RoomOut key={room} room={room} floor="S" />})}</div>
          </div>

        </div>
     </Floor>
    </>
  )
}

export default SecondFloor