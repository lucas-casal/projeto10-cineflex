import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Seat from "./Seat";
axios.defaults.headers.common['Authorization'] = 'bv0Ks8i80MPdXuLLvCVzJc8f';

export default function SeatsPage(props) {
    const [sessao, setSessao] = useState([])
    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/showtimes/"+props.sessionID+"/seats");
        promise.then(res => {
            setSessao(res.data.seats)
        });
    }, []);




    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {sessao.map((x) => {
                    return <Seat handleSeatName={props.handleSeatName} handleSeat={props.handleSeat} id={x.id} name={x.name} isAvailable={x.isAvailable} />     
                    })}
            
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle selected = {true}/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle isAvailable = {true}/>
                    Disponível
                </CaptionItem>
                <CaptionItem >
                    <CaptionCircle isAvailable = {false}/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input data-test="client-name" placeholder="Digite seu nome..." onChange={(e) => props.handleUsername(e.target.value)} />

                CPF do Comprador:
                <input data-test="client-cpf" placeholder="Digite seu CPF..." onChange={(e) => props.handleCPF(e.target.value)} onInput={(e) => e.target.value.length > 11 ? alert('o CPF digitado possui mais do que 11 caracteres') : ''}/>
                
                <Link to={props.seats.length !== 0 ? (props.username !== '' ? (props.CPF > 0 && props.CPF.length < 12 ? '/sucesso':''):''):''} onClick={()=> props.CPF > 0 && props.CPF.length < 12 ? props.obj(props.seats, props.username, props.CPF) : alert('O CPF está inválido!!!')}>
                <button data-test="book-seat-btn" >Reservar Assento(s)</button>
                </Link>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={props.filmeImage} alt="poster" />
                </div>
                <div>
                    <p>{props.filmeTitle}</p>
                    <p>{props.sessaoWeekday} - {props.sessao}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${(x) => x.isAvailable === false ? '#F7C52B' : (x.selected ? '#0E7D71' : '#7B8B99')};        // Essa cor deve mudar
    background-color: ${(x) => x.isAvailable === false ? '#FBE192' : (x.selected ? '#1AAE9E' : 'lightblue')};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
    
    
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`