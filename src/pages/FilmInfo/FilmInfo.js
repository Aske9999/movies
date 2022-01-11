import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {API_BASE, API_KEY, API_IMAGE} from "../../constants/api";

import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Slider from "react-slick";
import "./FilmInfo.css"

const FilmInfo = () => {
  const jobs = ["Director", "Screenplay", "Producer", "Original Music Composer"]
  const [film, setFilm] = useState({})
  const {id} = useParams()
  const [actors, setActors] = useState([])
  const [actorsNum, setActorsNum] = useState(10)
  const [coordinates, setCoordinates] = useState(0)
  const navigate = useNavigate()
  const [staff, setStaff] = useState([])
  const [videos, setVideos] = useState([])
  const carouselSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5
  };
  const goToActor = (e, id) => {
    if (e.clientX === coordinates) {
      navigate(`/actors/${id}`)
    }
  }

  useEffect(() => {
    axios(`${API_BASE}/movie/${id}?${API_KEY}&language=ru`)
      .then(({data}) => {
        setFilm(data)
      })

    axios(`${API_BASE}/movie/${id}/credits?${API_KEY}`)
      .then(({data}) => {
        setActors(data.cast)
        setStaff(data.crew.filter(item => jobs.includes(item.job)))
      })

    axios(`${API_BASE}/movie/${id}/videos?${API_KEY}&language=ru`)
      .then(({data}) => {
        setVideos(data.results)
      })
  }, [id])

  return (
    <>

      <section className="film-info" style={{
        background: `rgba(0,0,0,0.7) url(${API_IMAGE}/original/${film.backdrop_path}) center/cover`,
        backgroundBlendMode: 'darken'
      }}>

        <div className="container">
          <div className="flex-container">
            <div className="box-info">
              <img className="box-info-poster" src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
                   alt=""/>
            </div>
            <div className="box-info">
              <div className="box-info-content">
                <h2> {film.title} ({film.release_date?.slice(0, 4)})</h2>
                <div className="genres">
                  {
                    film.genres?.map(item => <span>{item.name}, </span>)
                  }
                  <span>* {Math.floor(film.runtime / 60)}h {Math.floor(film.runtime % 60)}m</span>
                </div>
                <div style={{width: 100, height: 100}}>
                  <CircularProgressbar value={film.vote_average * 10} text={`${film.vote_average * 10}%`}/>
                </div>
                <h5>Обзор:</h5>
                <p className="box-info-content-text">{film.overview}</p>
              </div>

              <div className="staff col-8">
                <div className="staff-title">Авторы:</div>
                <div className="staff-content">
                  {
                    staff.map(item => {
                      return (
                        <div>{item.job}: {item.name}</div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <h4 className="mt-4">Актерский состав:</h4>
          <div className="row">
            <Slider {...carouselSettings}>
              {
                actors?.slice(0, actorsNum).map(actor => {
                  return (
                    <div className="col-2">
                      <div className="actor-card">
                        <button className="actor-card-btn" type="button" onMouseDown={(e) => setCoordinates(e.clientX)}
                                onClick={(e) => goToActor(e, actor.id)}>
                          <img className="actor-pic w-100" src={`${API_IMAGE}/w200${actor.profile_path}`}
                               alt={actor.name}/>
                          <h6>{actor.name}</h6>
                        </button>
                      </div>
                    </div>
                  )
                })
              }
              {
                actorsNum < actors.length && <div className="show-more">
                  <button className="show-more-btn" onClick={() => setActorsNum(actorsNum + 10)} type="button">Show
                    more...
                  </button>
                </div>
              }
            </Slider>
          </div>
        </div>
      </section>
      <section>
        <div>Трейлеры:</div>
<div>
  {
    videos.map(video => {
      return (
<div>
  <img src="" alt=""/>
</div>
      )
    })
  }
</div>
      </section>
    </>
  )
}

export default FilmInfo;