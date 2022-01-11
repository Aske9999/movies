import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_BASE, API_IMAGE, API_KEY} from "../../constants/api";
import {Link, useNavigate, useParams} from "react-router-dom";
import './Actor.css'
import Slider from "react-slick";

const ActorProfile = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [coordinates, setCoordinates] = useState(0)
  const [actorsProf, setActorsProf] = useState({})
  const [popFilms, setPopFilms] = useState([])
  const carouselSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5
  };
  const goToFilm = (e, id) => {
    if (e.clientX === coordinates) {
      navigate(`/films/${id}`)
    }
  }

  useEffect(() => {
    axios(`${API_BASE}/person/${id}?${API_KEY}`)
      .then(({data}) => {
        setActorsProf(data)
      })

    axios(`${API_BASE}/person/${id}/combined_credits?${API_KEY}`)
      .then(({data}) => {
        setPopFilms(data.cast)
      })
  }, [id])
  return (
    <>
      <section>
        <div className="container">
          <div className="profile">
            <div className="row">
              <div className="profile-pic col-4">
                <img className="actor-profile-pic" src={`${API_IMAGE}/w200${actorsProf.profile_path}`}
                     alt={actorsProf.name}/>
              </div>
              <div className="profile-content col-8">
                <h2 className="profile-actor-name">{actorsProf.name}</h2>
                <h5 className="profile-title">Биография:</h5>
                <div>{actorsProf.biography}</div>
                <h5 className="profile-title">Известность за:</h5>
                <div className="row">
                  <Slider {...carouselSettings}>
                    {
                      popFilms.map(film => {
                        return (

                          <div className="col-2">
                            <div className="popular-films">
                              <Link className="movie-card-link" to={`/films/${film.id}`} onMouseDown={(e) => setCoordinates(e.clientX)}
                                    onClick={(e) => goToFilm(e, film.id)}>
                                <img className="profile-movie-poster mb-4" src={`${API_IMAGE}/w300${film.poster_path}`}
                                     alt=""/>
                                <span>{film.title}</span> <br/>
                                <span>{film.popularity}</span>
                              </Link>
                            </div>
                          </div>
                        )
                      })
                    }
                  </Slider>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default ActorProfile;