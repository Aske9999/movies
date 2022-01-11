import React from 'react';
import {Link} from "react-router-dom";
import {API_IMAGE} from "../../constants/api";
import "./FilmCard.css"

const FilmCard = ({film}) => {
    return (
            <div className="col-sm-6 col-md-3 col-lg-3 mb-4">
                <div className="movie-card">
                    <Link className="movie-card-link" to={`/films/${film.id}`}>
                        <img className="movie-card-poster mb-4" src={`${API_IMAGE}/w300${film.poster_path}`}
                             alt=""/>
                        <h6>{film.title}</h6>
                    </Link>
                </div>
                <div className="rating"> {film.vote_average}</div>
            </div>
    );
};

export default FilmCard;