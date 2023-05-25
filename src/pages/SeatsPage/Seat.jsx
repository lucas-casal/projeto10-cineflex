import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
axios.defaults.headers.common['Authorization'] = 'bv0Ks8i80MPdXuLLvCVzJc8f';

export default function Seat(props){
    const [selected, setSelected] = useState(false);
    function selectSeat(a){
                       
        if (a.isAvailable){
            selected ? setSelected(false) : setSelected(true);
            props.handleSeat(a.id)
            props.handleSeatName(a.name)
        }
        console.log(a);
        console.log("clicou")
        return selected;
    }


return (
<SeatItem isAvailable={props.isAvailable} selected={selected} onClick={()=> selectSeat(props)} key={props.id}>{props.name}</SeatItem>)


}


const SeatItem = styled.div`
    border: 1px solid ${(x) => x.isAvailable === false ? '#F7C52B' : (x.selected ? '#0E7D71' : '#7B8B99')};        // Essa cor deve mudar
    background-color: ${(x) => x.isAvailable === false ? '#FBE192' : (x.selected ? '#1AAE9E' : 'lightblue')};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`