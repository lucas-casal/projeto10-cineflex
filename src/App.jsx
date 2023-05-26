import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { useState, useEffect } from "react";

export default function App() {
    const [clickedID, setClickedID] = useState(0);
    const [filme, setFilme] = useState(true);
    const [sessionID, setSessionID] = useState(0);
    const [sessao, setSessao] = useState(0);
    const [sessaoDate, setSessaoDate] = useState(0);
    const [username, setUsername] = useState("");
    const [CPF, setCPF] = useState(0);
    const [seats, setSeats] = useState([]);
    const [obj, setOBJ] = useState({ids: seats, name: username, cpf: CPF});
    const [seatName, setSeatName] = useState([])
    const [sessaoSemana, setSessaoSemana] = useState('')


    function defineLugar(x){
        let novoArray;
        if (seats.includes(x)){
            seats.splice(seats.indexOf(x), 1)
            novoArray = seats;
            console.log(seats.indexOf(x))

        } else{
        
            novoArray = [...seats, x]
        }
        setSeats(novoArray);
    }

    function defineUsuario(x){
        setUsername(x);
        setOBJ({ids: seats, name: x, cpf: CPF})
    }

    function defineCPF(x){
        setCPF(x);
        setOBJ({ids: seats, name: username, cpf: x})
    }

    function selectMovie(movie=0){
        console.log("clicou em " + movie.title + " ID: " + movie.id);
        
        setClickedID(movie.id? movie.id : 0);
        setFilme(movie);
    }

    function selectSession(session=0, options=0){
        console.log("clicou em " + session.name + " ID: " + session.id);
        setSessaoDate(options.date);
        setSessaoSemana(options.weekday)
        setSessionID(session.id? session.id : 0);
        setSessao(session);
    }

    function reservaIngressos(a, b){
        console.log()
    }

    function handleObj(seats, username, CPF){
        if (seats.length === 0){
            alert("Você não selecionou nenhum assento!!")
            return false
        } else if (username === ''){
            alert("Você não digitou o seu nome!!")
            return false
        } else if (CPF === 0){
            alert("Você não digitou o seu CPF!!")
            return false
        } else{
        setOBJ({ids: seats, name: username, cpf: CPF})
            return true
    }
        
    }

    function handleSeatName(x){
        let novoArray;
        if (seatName.includes(x)){
            seatName.splice(seatName.indexOf(x), 1)
            novoArray = seatName;

        } else{
        
            novoArray = [...seatName, x]
        }
        setSeatName(novoArray);
    }
    
    function homepageBtn(){
        setClickedID(0);
        setFilme(true);
        setSessionID(0);
        setSessao(0);
        setUsername("");
        setCPF(0);
        setSeatName([]);
        setOBJ({ids: [], name: "", cpf: ""})
    }

    console.log(sessao)
    console.log(filme)
    console.log(username)
    console.log(seatName)
    console.log(obj)
    let arrayCPF;
    if (CPF.length === 11){
        let CPFPrinted= CPF;
        arrayCPF = CPFPrinted.split('');
        arrayCPF.splice(9, 0, '-');
        arrayCPF.splice(6, 0, '.');
        arrayCPF.splice(3, 0, '.');
    }

    console.log(arrayCPF)
    return (
        <BrowserRouter >
           <NavContainer>
           <Link data-test="go-home-header-btn" to='/' onClick={homepageBtn}><IonContainer filme={filme}><ion-icon name="arrow-back-outline" border='3px solid black'></ion-icon></IonContainer></Link>
            CINEFLEX
           </NavContainer>

            <Routes>
                <Route path='/' element={<HomePage selectMovie={selectMovie}/>} />
                <Route path={'/sessoes/' + clickedID} element={<SessionsPage onClick={selectSession} clickedID={clickedID}/>} />
                <Route path={'/assentos/'+ sessionID} element={<SeatsPage seats={seats} username={username} CPF={CPF} obj={handleObj} handleSeatName={handleSeatName} handleSeat={defineLugar} handleUsername={defineUsuario} handleCPF={defineCPF} filmeTitle={filme.title} filmeImage={filme.posterURL} sessaoWeekday={sessaoSemana} sessao={sessao.name} sessionID={sessionID}/>} />
                <Route path='/sucesso' element={<SuccessPage onClick={homepageBtn} obj={obj} username={username} cpf={arrayCPF} seatName={seatName} seats={seats} filme={filme.title} sessaoTime={sessao.name} sessaoDate={sessaoDate} />} />
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

const IonContainer=styled.div`
    font-size: 30px;
    display: ${props => props.filme === true ? 'none' : 'auto'};
    color: black;
    position: fixed;
    top: 20px;
    left: 6px;
`