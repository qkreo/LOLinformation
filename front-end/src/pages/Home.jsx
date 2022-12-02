// import './App.css';
import { Container, Navbar, Button, InputGroup, Form } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import Navibar from "./Navibar";


// require("dotenv").config();

// const headers = {
//     'User-Agent':
//         'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
//     'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
//     'Accept-Charset':
//         'application/x-www-form-urlencoded; charset=UTF-8',
//     'Origin': 'https://developer.riotgames.com',
//     'X-Riot-Token': process.env.APIKEY,
// };

function Home() {
    
    // //유저 이름으로 summoner data 가져옴. encrypted id라던가 이런거.
    // const getUser = axios ({
    //     methode : 'get',
    //     url : 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + e.target.value ,
    //     headers : headers,
    // })
    // .then((response) => {
    //     return response.data;
    // })
    // .catch((error) => {
    //     //여기에 해당 유저를 찾을 수없습니다 url로 보내는거 작성
    //     return error.message;
    // });
    //
    // //id로 user ingame data 가져오는 거
    // const inGameData = axios ({
    //     methode : 'get',
    //     url : 'https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/' + getUser.id ,
    //     headers : headers,
    // })
    // .then((response) => {
    //     return response.data;
    // })
    // .catch((error) => {
    //     //여기에 ~~~님은 현재 게임중이 아니라고 리스폰스 보내기
    //     return error.message;
    // });
    
    let navigate = useNavigate()
    
    return (
        <div>
            <Navibar/>
            {/*검색창*/}
            <InputGroup className="mb-3 searchbar-location">
                <Form.Control
                    placeholder="소환사 닉네임"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
                <Button variant="dark" id="button-addon2" onClick = {() => { navigate('/summoners/kr') }}>
                    검색
                </Button>
            </InputGroup>
        
        </div>
    );
}



export default Home;
