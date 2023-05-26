import styled from "styled-components"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"

export default function SuccessPage(props) {
    useEffect(()=> {
        console.log(props.obj)
        const promise = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", props.obj);
        promise.then(res => {
            console.log(res)
        });
        promise.catch(res => {console.log(res)});

        promise.finally('done')
    }, [])
        
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{props.filme}</p>
                <p>{props.sessaoDate} - {props.sessaoTime}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {props.seatName.map((e) => <p key={e}> Assento {e} </p>)}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {props.username}</p>
                <p>CPF: {props.cpf}</p>
            </TextContainer>

            <Link to='/' data-test="go-home-btn" onClick={props.onClick}><button>Voltar para Home</button></Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`