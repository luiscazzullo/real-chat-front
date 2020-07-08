import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//Styles
import './Join.css';
const Join = () => {
  const [values, setValues] = useState({
    name: '',
    room: ''
  })
  const { name, room } = values;
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" name="name" className="joinInput" type="text" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
        </div>
        <div>
          <input placeholder="Room" name="room" className="joinInput mt-20" type="text" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
        </div>
        <Link onClick={e => !name && !room ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className="button mt-20" type="submit
          ">Ingresa</button>
        </Link>
      </div>
    </div>
  );
}

export default Join;