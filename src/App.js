import React from 'react';
import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";
import {Navigate, Route, Routes} from "react-router-dom";
import FilmInfo from "./pages/FilmInfo/FilmInfo";
import AllFilms from "./pages/AllFilms/AllFilms";
import ActorProfile from "./pages/Actors/ActorProfile";
import Actors from "./pages/Actors/Actors";
import Search from "./pages/Main/Search";

const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/films" element={<AllFilms/>}/>
                <Route path="/films/:id" element={<FilmInfo/>}/>
                <Route path="/actors" element={<Actors/>}/>
                <Route path="/search/:name" element={<Search/>}/>
                <Route path="/actors/:id" element={<ActorProfile/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>


        </>
    );
};

export default App;