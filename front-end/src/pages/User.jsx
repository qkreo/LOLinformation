import { useState, useEffect } from "react";
import React from 'react'
import data from "../data/champdata";
import inGameData from "../dummydata/ingamedata";
import { Nav } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import axios from 'axios'
//dummy data 가져오는것 - axios로 나중에 실 데이터 가져오고 나서 삭제 할것
import pykeCaitlyn from "../dummydata/pyke-Caitlyn-555-51";
import pykeLux from "../dummydata/pyke-Lux-555-99";
import pykeSylas from "../dummydata/pyke-Sylas-555-517";
import pykeViego from "../dummydata/pyke-Viego-555-234";
import pykeAatox from "../dummydata/pyke-Aatrox-555-266";
// component따로 빼둔것 - 더미 데이터 때문에 많이 해놔서 나중에 삭제 할것
import PykeAatrox from "../Components/User/pykeAatrox";
import PykeViego from "../Components/User/pykeViego";
import PykeLux from "../Components/User/pykeLux";
import PykeSylas from "../Components/User/pykeSylas";
import PykeCaitlyn from "../Components/User/pykeCaitlyn";
import Navibar from "./Navibar";

function User(props) {
    
    let [champions, setChampions] = useState(data)
    let [gameData, setInGameData] = useState(inGameData[0].participants)
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
    
    //룬특1
    let perkStyle1 = [];
    gameData.map((perkStyle) => {
        switch (perkStyle.perks.perkIds[0]) {
            //지배 빨간거
            case 8112 :
                perkStyle1.push("Domination/Electrocute/Electrocute.png");
                break;
            case 8124 :
                perkStyle1.push("Domination/Predator/Predator.png");
                break;
            case 8128 :
                perkStyle1.push("Domination/DarkHarvest/DarkHarvest.png");
                break;
            case 9923 :
                perkStyle1.push("Domination/HailOfBlades/HailOfBlades.png");
                break;
                
            //영감 파란색
            case 8351 :
                perkStyle1.push("Inspiration/GlacialAugment/GlacialAugment.png");
                break;
            case 8360 :
                perkStyle1.push("Inspiration/UnsealedSpellbook/UnsealedSpellbook.png");
                break;
            case 8369 :
                perkStyle1.push("Inspiration/FirstStrike/FirstStrike.png");
                break;
                
            // 정밀 노란색
            case 8005 :
                perkStyle1.push("Precision/PressTheAttack/PressTheAttack.png");
                break;
            case 8008 :
                perkStyle1.push("Precision/LethalTempo/LethalTempoTemp.png");
                break;
            case 8021 :
                perkStyle1.push("Precision/FleetFootwork/FleetFootwork.png");
                break;
            case 8010 :
                perkStyle1.push("Precision/Conqueror/Conqueror.png");
                break;
                
            //결의 초록색
            case 8437 :
                perkStyle1.push("Resolve/GraspOfTheUndying/GraspOfTheUndying.png");
                break;
            case 8439 :
                perkStyle1.push("Resolve/VeteranAftershock/VeteranAftershock.png");
                break;
            case 8465 :
                perkStyle1.push("Resolve/Guardian/Guardian.png");
                break;
                
            //마법 파란색
            case 8214 :
                perkStyle1.push("Sorcery/SummonAery/SummonAery.png");
                break;
            case 8229 :
                perkStyle1.push("Sorcery/ArcaneComet/ArcaneComet.png");
                break;
            case 8230 :
                perkStyle1.push("Sorcery/PhaseRush/PhaseRush.png");
                break;
        }
    })
    
    //룬특2
    let perkStyle2 = [];
    gameData.map((perkStyle) => {
        switch (perkStyle.perks.perkSubStyle) {
            case 8000 :  //정밀
                perkStyle2.push("7201_Precision.png");
                break;
            case 8100 :  //지배
                perkStyle2.push("7200_Domination.png");
                break;
            case 8200 :  //마법
                perkStyle2.push("7202_Sorcery.png");
                break;
            case 8300 :  //영감
                perkStyle2.push("7203_Whimsy.png");
                break;
            case 8400 :  //결의
                perkStyle2.push("7204_Resolve.png");
                break;
        }
    })
    
    return (
        <div className="App float-left">
            <Navibar/>
            <div className= '디스플레이플랙스'>
                <div>
                    <MyTeamChampions GameData = {gameData[0]} champImg = {champImgArray[0]} spell1 = {summonerSpell1[0]} spell2 = {summonerSpell2[0]} perk1 = {perkStyle1[0]} perk2 = {perkStyle2[0]}></MyTeamChampions>
                    <MyTeamChampions GameData = {gameData[1]} champImg = {champImgArray[1]} spell1 = {summonerSpell1[1]} spell2 = {summonerSpell2[1]} perk1 = {perkStyle1[1]} perk2 = {perkStyle2[1]}></MyTeamChampions>
                    <MyTeamChampions GameData = {gameData[2]} champImg = {champImgArray[2]} spell1 = {summonerSpell1[2]} spell2 = {summonerSpell2[2]} perk1 = {perkStyle1[2]} perk2 = {perkStyle2[2]}></MyTeamChampions>
                    <MyTeamChampions GameData = {gameData[3]} champImg = {champImgArray[3]} spell1 = {summonerSpell1[3]} spell2 = {summonerSpell2[3]} perk1 = {perkStyle1[3]} perk2 = {perkStyle2[3]}></MyTeamChampions>
                    <MyTeamChampions GameData = {gameData[4]} champImg = {champImgArray[4]} spell1 = {summonerSpell1[4]} spell2 = {summonerSpell2[4]} perk1 = {perkStyle1[4]} perk2 = {perkStyle2[4]}></MyTeamChampions>
                </div>
    
                {/*상대편 아이템 보는 텝*/}
                <Nav variant="tabs"  defaultActiveKey="link0">
                    <div className='nav-box-margin'>
                        <Nav.Item  onClick = {()=> { 탭변경 (0)}}>
                            <Nav.Link eventKey="link0">
                                <EnemyTeamChampions champImg = {champImgArray[5]}/>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick = {()=> { 탭변경 (1)}}>
                            <Nav.Link eventKey="link1">
                                <EnemyTeamChampions champImg = {champImgArray[6]}/>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick = {()=> { 탭변경 (2)}}>
                            <Nav.Link eventKey="link2">
                                <EnemyTeamChampions champImg = {champImgArray[7]}/>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick = {()=> { 탭변경 (3)}}>
                            <Nav.Link eventKey="link3">
                                <EnemyTeamChampions champImg = {champImgArray[8]}/>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item onClick = {()=> { 탭변경 (4)}}>
                            <Nav.Link eventKey="link4">
                                <EnemyTeamChampions champImg = {champImgArray[9]}/>
                            </Nav.Link>
                        </Nav.Item>
                        
                    </div>
                    <TabContent 탭 = { 탭 } />
                   
                    
                </Nav>
            </div>
            
        </div>
        
    );
}

// nav로 만든 탭 컴포넌트
function TabContent({탭 , champImgArray}) {
    
    let [fade, setFade] = useState('')
    
    useEffect(() => {
        setTimeout(() => { setFade('end')},100)
        return () => {
            setFade('')
        }
    },[탭])
    
    const pyke_Aatrox_item = pykeAatox.map((pykeAatrox,i) => (
        <PykeAatrox key = {i} pykeAatrox = {pykeAatrox.itemId} pickRate = {pykeAatrox.pickRate} winRate = {pykeAatrox.winRate}/>
        ))
    const pyke_Caitlyn_item = pykeCaitlyn.map((pykeCaitlyn,i) => (
        <PykeCaitlyn key = {i} pykeCaitlyn = {pykeCaitlyn.itemId} pickRate = {pykeCaitlyn.pickRate} winRate = {pykeCaitlyn.winRate}/>
    ))
    const pyke_Lux_item = pykeLux.map((pykeLux,i) => (
        <PykeLux key = {i} pykeLux = {pykeLux.itemId} pickRate = {pykeLux.pickRate} winRate = {pykeLux.winRate}/>
    ))
    const pyke_Sylas_item = pykeSylas.map((pykeSylas,i) => (
        <PykeSylas key = {i} pykeSylas = {pykeSylas.itemId} pickRate = {pykeSylas.pickRate} winRate = {pykeSylas.winRate}/>
    ))
    const pyke_Viego_item = pykeViego.map((pykeViego,i) => (
        <PykeViego key = {i} pykeViego = {pykeViego.itemId} pickRate = {pykeViego.pickRate} winRate = {pykeViego.winRate}/>
    ))
    
    
    return (
        <div className = {`start ${fade} nav-box-margin`}>
            {[<div>{pyke_Aatrox_item} </div>,
                <div>{pyke_Lux_item}</div>,
                <div>{pyke_Caitlyn_item}</div>,
                <div>{pyke_Viego_item}</div>,
                <div>{pyke_Sylas_item}</div>]
                [탭]}
        </div>
    )
}

// 우리편 챔피언 컴포넌트
function MyTeamChampions(props) {
    return (
        <div className='옆으로줄세우기'>
            <div className = { props.GameData.teamId === 100 ? 'team-color'  : 'team-color2'  } >
                
                <img
                    src = { 'https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/' + props.champImg + '.png' }
                    width = '40'
                    className = 'img-centered'
                />
                
                <div className='id-margin'>
                    <img
                        src = { 'https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/' + props.spell1 + '.png' }
                        width = '30'
                        height = '30'
                    />
                    <img
                        src = { 'https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/' + props.spell2 + '.png' }
                        width = '30'
                        height = '30'
                    />
                </div>

                <div className='id-margin'>
                    <img
                        src = { 'https://ddragon.canisback.com/img/perk-images/Styles/' + props.perk1 }
                        width = '30'
                        height = '30'
                        className= 'perk-box'
                    />
                    <img
                        src = { 'https://ddragon.canisback.com/img/perk-images/Styles/' + props.perk2 }
                        width = '28'
                        height = '28'
                        className= 'perk-box'
                    />
                </div>
                
                
                
                <h4 className= 'id-margin'>{props.GameData.summonerName}</h4>
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
            />
        </div>
    )
}


export default User ;

