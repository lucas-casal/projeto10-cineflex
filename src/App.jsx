import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { useState, useEffect } from "react";

export default function App() {
    const [clickedID, setClickedID] = useState(0);
    const [sessionID, setSessionID] = useState(0);

    function selectMovie(movie=0){
        console.log("clicou em " + movie.title + " ID: " + movie.id);
        
        setClickedID(movie.id? movie.id : 0);
    }

    function selectSession(session=0){
        console.log("clicou em " + session.name + " ID: " + session.id);
        
        setSessionID(session.id? session.id : 0);
    }

    console.log(sessionID)
    console.log(clickedID)

    return (
        <BrowserRouter >
           <NavContainer>
           <Link to='/' onClick={()=> setClickedID(0)}><BackButton> Homepage </BackButton></Link>
            CINEFLEX
           </NavContainer>

            <Routes>
                <Route path='/' element={<HomePage selectMovie={selectMovie}/>} />
                <Route path={'/sessoes/' + clickedID} element={<SessionsPage onClick={selectSession} clickedID={clickedID}/>} />
                <Route path={'/assentos/'+ sessionID} element={<SeatsPage />} />
                <Route path='/sucesso' element={<SuccessPage />} />
            </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
const BackButton = styled.button`
    width: auto;
    height: auto;
    margin-right: 20px;

    color: green;
`