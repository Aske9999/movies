import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {API_BASE, API_KEY} from "../../constants/api";
import axios from "axios";
import FilmCard from "../../components/FilmCard/FilmCard";

const Search = () => {
  const {name} = useParams()
  const [find, setFind] = useState([])


  useEffect(() => {
    axios(`${API_BASE}/search/multi?${API_KEY}&query=${name}&language=ru,en`)
      .then(({data}) => {
        setFind(data.results)
      })
  }, [name])

  return (
    <div className="search-results">

      <div className="container">
        <div className="row">
          {
            find.length
              ? find.map(item => {
                return (
                  <FilmCard key={item.id} film={item}/>
                )
              }) : <>
                <h1 className="title-danger">
                  404 Page Not Found
                </h1>
                <div className="content-danger"> No results were found for your request "<span className="search-name">{name}</span>".

                  Recommendations:
                  Make sure all words are spelled correctly.
                  Try using other keywords.
                  Try using more popular keywords.
                  Try to reduce the number of words in your query.
                </div>
              </>

          }
        </div>
      </div>
    </div>
  );
};

export default Search;