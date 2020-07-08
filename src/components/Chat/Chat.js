import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import Infobar from '../Infobar/Infobar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = ({ location }) => {
  const [values, setValues] = useState({ name: '', room: '' })
  const [ message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const ENDPOINT = 'https://real-chat-react-app.herokuapp.com/';
  const { name, room } = values; 
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setValues({ name, room });
    socket = io(ENDPOINT);

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    })
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })
  }, [messages])

  const sendMessage = e => {
    e.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }


  return (
    <div className="outerContainer">
      <div className="container">
        <Infobar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        <TextContainer users={users} />
      </div>
    </div>
  );
}

export default Chat;