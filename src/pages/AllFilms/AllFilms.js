import React, {useEffect, useState} from 'react';
import axios from "axios";
import FilmCard from "../../components/FilmCard/FilmCard";
import {API_BASE, API_KEY} from "../../constants/api";
import "./AllFilms.css"

const AllFilms = () => {
    const [films, setFilms] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        axios(`${API_BASE}/discover/movie?${API_KEY}&language=ru&page=${page}`)
            .then(({data}) => {
                setFilms(data.results)
            })
    }, [page])

  if (!films.length) {
    return (
      <div className="spinner-box">
        <div className="spinner-btn">
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Загрузка...
        </div>
      </div>
    )
  }

    return (
        <div className="container">
            <div className="my-4">
              {page < 1 }
                {/*{*/}
                {/*    [...Array(10).keys()].map(item => {*/}
                {/*        return <button onClick={() => setPage(item + 1)} type="button" className="btn btn-info me-2">{item + 1}</button>*/}
                {/*    })*/}
                {/*}*/}
            </div>
            <div className="row">
                {
                    films.map(item => {
                        return (
                           <FilmCard key={item.id} film={item}/>
                        )
                    })
                }
            </div>

        </div>
    );
};

export default AllFilms;