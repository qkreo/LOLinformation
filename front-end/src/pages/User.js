import { useState, useEffect } from "react";
import React from 'react'
import data from "../data/champdata";
import inGameData from "../ingamedata/ingamedata";
import { Nav } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import axios from 'axios'

function User(props) {
    
    let [champions, setChampions] = useState(data)
    let [gameData, setInGameData] = useState(inGameData[0].participants)
    let [teamColor, setTeamColor] = useState('blue')
    let [탭, 탭변경] = useState(0)
    
    
    
    
    //챔피언 영어 이름을 넣는 어레이, 이걸 setValue로 할 수 있을것 같은데 나중에 교체
    let champImgArray = [];
    gameData.map((gameDataId) => {
        champions.map((championsId, i) => {
            if ( gameDataId.championId == championsId.id ) {
                champImgArray.push(championsId.engName)
            }
        })
    })
    
    
    //서머너 스펠1 을 받아오는거
    let summonerSpell1 = [];
    gameData.map((summonerSpell) => {
        switch ( summonerSpell.spell1Id ) {
            case 1 :
                summonerSpell1.push("SummonerBoost");
                break;
            case 3 :
                summonerSpell1.push("SummonerExhaust");
                break;
            case 4 :
                summonerSpell1.push("SummonerFlash");
                break;
            case 6 :
                summonerSpell1.push("SummonerHaste");
                break;
            case 14 :
                summonerSpell1.push("SummonerDot");
                break;
            case 21 :
                summonerSpell1.push("SummonerBarrier");
                break;
            case 32 :
                summonerSpell1.push("SummonerSnowball");
                break;
        }
    })
    
    //서머너 스펠2 을 받아오는거
    let summonerSpell2 = [];
    gameData.map((summonerSpell) => {
        switch ( summonerSpell.spell2Id ) {
            case 1 :
                summonerSpell2.push("SummonerBoost");
                break;
            case 3 :
                summonerSpell2.push("SummonerExhaust");
                break;
            case 4 :
                summonerSpell2.push("SummonerFlash");
                break;
            case 6 :
                summonerSpell2.push("SummonerHaste");
                break;
            case 14 :
                summonerSpell2.push("SummonerDot");
                break;
            case 21 :
                summonerSpell2.push("SummonerBarrier");
                break;
            case 32 :
                summonerSpell2.push("SummonerSnowball");
                break;
        }
    })
    
    //룬특 해야함. 하 언제하냐....
    
    return (
        <div className="App2">
            <div className='container flex-container' >
                <MyTeamChampions GameData = {gameData[0]} champImg = {champImgArray[0]} spell1 = {summonerSpell1[0]} spell2 = {summonerSpell2[0]}></MyTeamChampions>
                <MyTeamChampions GameData = {gameData[1]} champImg = {champImgArray[1]} spell1 = {summonerSpell1[1]} spell2 = {summonerSpell2[1]}></MyTeamChampions>
                <MyTeamChampions GameData = {gameData[2]} champImg = {champImgArray[2]} spell1 = {summonerSpell1[2]} spell2 = {summonerSpell2[2]}></MyTeamChampions>
                <MyTeamChampions GameData = {gameData[3]} champImg = {champImgArray[3]} spell1 = {summonerSpell1[3]} spell2 = {summonerSpell2[3]}></MyTeamChampions>
                <MyTeamChampions GameData = {gameData[4]} champImg = {champImgArray[4]} spell1 = {summonerSpell1[4]} spell2 = {summonerSpell2[4]}></MyTeamChampions>
            </div>
            
            <div>
                <EnemyTeamChampions champImg = {champImgArray[5]}/>
                <EnemyTeamChampions champImg = {champImgArray[6]}/>
                <EnemyTeamChampions champImg = {champImgArray[7]}/>
                <EnemyTeamChampions champImg = {champImgArray[8]}/>
                <EnemyTeamChampions champImg = {champImgArray[9]}/>
            </div>
    
            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item onClick = {()=> { 탭변경 (0)}}>
                    <Nav.Link eventKey="link0">버튼0 </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick = {()=> { 탭변경 (1)}}>
                    <Nav.Link eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick = {()=> { 탭변경 (2)}}>
                    <Nav.Link eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>

           <TabContent 탭 = { 탭 } />

        </div>
    );
}

function TabContent({ 탭 }) {
    
    let [fade, setFade] = useState('')
    
    useEffect(() => {
        setTimeout(() => { setFade('end')},100)
        return () => {
            setFade('')
        }
    },[탭])
    
    return (
        <div className = {`start ${fade}`}>
            {[<div>내용0</div>, <div>내용1</div>,<div>내용2</div>][탭]}
        </div>
    )
}

// 우리편 챔피언 컴포넌트
function MyTeamChampions(props) {
    return (
        <div>
            <div className = { props.GameData.teamId === 100 ? 'team-color'  : 'team-color2'  } >
                <img
                    src = { 'https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/' + props.champImg + '.png' }
                    width = '40'
                    className = 'img-centered'
                />
                <h4 className = 'team-champ-nickname'>{props.GameData.summonerName}</h4>
                <img
                    src = { 'https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/' + props.spell1+'.png' }
                    width = '30'
                    height = '30'
                />
                <img
                    src = { 'https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/' + props.spell2 + '.png' }
                    width = '30'
                    height = '30'
                />
                <br/>
                <p>룬특1 : {props.GameData.perks.perkStyle}</p>
                <p>룬특2 : {props.GameData.perks.perkSubStyle}</p>
            </div>
        </div>
    );
}

//상대편의 이미지 얼굴통
function EnemyTeamChampions(props) {
    return (
        <div>
            <img
                src = { 'https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/' + props.champImg + '.png' }
                width = '60'
                className = 'img-enemy-rounded'
                onClick = {() => {
                    console.log(inGameData[0].participants)
                }}
            />
        </div>
    )
}




export default User ;

