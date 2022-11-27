import React from 'react'
import Floor from './Floor'
import RoomOut from './RoomOut'

const GroundFloor = () => {
  const rooms1 = [];
  for (let i = 1; i <= 8; i++){
    rooms1.push(i);
  }
  const rooms2 = [];
  for (let i = 9; i <= 17; i++){
    rooms2.push(i);
  }
  return (
    <>
      <Floor>
        <span>Ground Floor</span>

        <div>

        <div>
            mess <br />
            🍕🍔🍟🌭🍞🥪
            🙄👇 <br />
            -------- <br />
            🍱🥒🧅🍋🥔🍚
            😥🙃
        </div>

          <div>

          <div className='room'>{rooms2.map((room) => { return (<RoomOut key={room} room={room} floor="G" />) })}</div>
          <div className='room'>{rooms1.map((room) => {return<RoomOut key={room} room={room} floor="G" />})}</div>
          </div>

        </div>
     </Floor>
    </>
  )
}

export default GroundFloor