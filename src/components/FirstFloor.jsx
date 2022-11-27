import React from 'react'
import Floor from './Floor'
import RoomOut from './RoomOut'

const FirstFloor = () => {
  const rooms1 = [];
  for (let i = 18; i <= 26; i++) {
    rooms1.push(i);
  }
  const rooms2 = [];
  for (let i = 27; i <= 34; i++) {
    rooms2.push(i);
  }
  return (
    <>
      <Floor>
        <span>First Floor</span>

        <div>

          <div>
            Hall <br />
            🏏🥎🏓♟️
            🙄👇 <br />
            -------- <br />
            💡
          </div>

          <div>

            <div className='room'>{rooms2.map((room) => { return (<RoomOut key={room} room={room} floor="F" />) })}</div>
            <div className='room'>{rooms1.map((room) => { return <RoomOut key={room} room={room} floor="F" /> })}</div>
          </div>

        </div>
      </Floor>
    </>
  )
}

export default FirstFloor