import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./Main.css"

const Main = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const changeName = (e) => {
    setName(e.target.value.trim())
  }
  const search = () => {
    navigate(`/search/${name}`)
    setName("")
  }
  const enter = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search/${name}`)
    }
  }

  return (
    <div className="container">
      <div className="greeting-box">
        <h1 className="main-greeting">
          N E T F L I X
        </h1>
      </div>
      <div className="search">
        <input value={name} onKeyDown={enter} className="name-input" onChange={changeName} type="text"
               placeholder="Movie's name"/>
        <button disabled={!name} onClick={search} className="link" type="button">Search</button>
      </div>
    </div>
  );
};

export default Main;