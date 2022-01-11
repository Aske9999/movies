import React, {useEffect, useState} from 'react';
import {API_BASE, API_IMAGE, API_KEY} from "../../constants/api";
import axios from "axios";
import {Link} from "react-router-dom";
import no_pic from "../../images/profile_no_photo.jpg"

const Actors = () => {
  const [actors, setActors] = useState([])
  const [name, setName] = useState("")
  const changeName = (e) => {
    setName(e.target.value.trim())
  }
const findActor = () => {
  axios(`${API_BASE}/search/person?${API_KEY}&query=${name}&language=ru,en`)
    .then(({data}) => setActors(data.results))

}
  useEffect(() => {
    axios(`${API_BASE}/movie/550/credits?${API_KEY}`)
      .then(({data}) => {
        setActors(data.cast)
      })
  }, [name])
  return (
    <>
      <div className="container">
        <div className="search">
          <input value={name} className="name-input" onChange={changeName} type="text" placeholder="Actor's name"/>
          <button disabled={!name} onClick={findActor} className="link" type="button">Search</button>
        </div>
        <div className="row">
            {
              actors?.slice(0, 24).map(actor => {
                return (
                  <div className="col-sm-6 col-md-4 col-lg-2">
                    <div className="actors-card">
                        <Link to={`/actors/${actor.id}`}>
                          <img className="actors-pic" src={actor.profile_path ? `${API_IMAGE}/w200${actor.profile_path}` : no_pic}
                               alt={actor.name}/>
                          <h6>{actor.name}</h6>
                        </Link>
                    </div>
                  </div>
                )
              })
            }
        </div>
      </div>
    </>
  );
};

export default Actors;