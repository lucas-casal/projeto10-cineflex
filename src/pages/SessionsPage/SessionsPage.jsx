import styled from "styled-components"
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
axios.defaults.headers.common['Authorization'] = 'bv0Ks8i80MPdXuLLvCVzJc8f';

export default function SessionsPage(props) {
    const [dias, setDias] = useState([])
    const [filme, setFilme] = useState([])
    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies/"+props.clickedID+"/showtimes");
        promise.then(res => {
            setDias(res.data.days)
            setFilme(res.data)
        });
    }, []);

    return (
        <PageContainer>
            Selecione o horário
            <div>
                <SessionContainer data-test="movie-day">
                    {dias.map((x) => {
                      
                        return(<>
                            {x.weekday+" - "+x.date}
                            <ButtonsContainer key = {x.id}>
                       
                                {x.showtimes.map((d) => {
                                    return (
                                        <Link data-test="showtime" to={'/assentos/'+d.id}>
                                        <button key={d.id} onClick={() => {props.onClick(d, x)}}>{d.name}</button>
                                        </Link>
                                    )
                                
                                })}
                                
                            </ButtonsContainer>
                        
                        </>)
                        })}
                    
                </SessionContainer>
            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={filme.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{filme.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
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