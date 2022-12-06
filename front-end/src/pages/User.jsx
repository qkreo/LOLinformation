import { useState, useEffect, useMemo } from "react";
import React from "react";
import data from "../data/champdata";
import { Nav } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RIOTGAMES_API } from "../Constants";
import ChampionInfo from "../Components/ChampionInfo";
import Navibar from "../Components/Navibar";
import Enemychampioninfo from "../Components/필요없는거 지울것";
import TabContent from "../Components/TabContent";
import EnemyTeamChampions from "../Components/EnemyTeamChampions";




const API_KEY = "RGAPI-a522ff7a-99fe-4a44-9986-dd8b63d327c8";

function User() {
    const urlParams = useParams();
    const [load, setLoad] = useState(false);
    const [summonerId, setSummonerId] = useState();
    const [ingameData, setIngameData] = useState();
    const [myChapId, setMyChapId] = useState('')
    const [enemyId, setEnemyId] = useState([])
    const [tab, setTab] = useState(0)
    
    useEffect(() => {
        if ( !urlParams.name ) {
            return;
        }
        async function getRiotUserID() {
            try {
                const res = await axios.get(RIOTGAMES_API + `/summoner/v4/summoners/by-name/${urlParams.name}`, {
                    params : { "api_key" : API_KEY }
                });
                
                if ( res?.data?.id ) {
                    setSummonerId(res.data.id);
                }
            } catch ( e ) {
                setLoad(true);
            }
        }
        
        getRiotUserID();
    }, [urlParams]);
    
    useEffect(() => {
        if ( !summonerId ) {
            return;
        }
        async function getRiotIngameData() {
            try {
                const res = await axios.get(RIOTGAMES_API + `/spectator/v4/active-games/by-summoner/${summonerId}`, {
                    params : { "api_key" : API_KEY }
                });
                if ( res?.data ) {
                    setIngameData(res?.data);
                }
            } catch ( e ) {
            
            } finally {
                setLoad(true);
            }
        }

        getRiotIngameData();
        
    }, [summonerId]);
    
    
    
    const components = useMemo(() => {
        if ( !load ) {
            return "정보를 가져오는 중입니다.";
        }
        if ( !summonerId ) {
            return "존재하지 않는 ID입니다.";
        }
        if ( !ingameData ) {
            return "현재 게임 중이 아닙니다.";
        }

        let ingamedata_teamBlue = ingameData?.participants?.filter( function (a) {
            if ( a.teamId === 100 ) {
                return true ;
            }
        })
    
        let ingamedata_teamRed = ingameData?.participants?.filter( function (a) {
            if ( a.teamId === 200) {
                return true ;
            }
        })
    
        ingameData?.participants.sort(function (a, b) {
            if ( a.summonerName === urlParams.name ) {
                return -1;
            } else {
                return 0;
            }
        })
    
        ingamedata_teamRed.sort(function (a, b) {
            if ( a.summonerName === urlParams.name ) {
                return -1;
            } else {
                return 0;
            }
        })
    
        ingamedata_teamBlue.sort(function (a, b) {
            if ( a.summonerName === urlParams.name ) {
                return -1;
            } else {
                return 0;
            }
        })
        
        setMyChapId(ingameData?.participants[0].championId)
        
        
        if (ingameData?.participants[0].teamId === 200) {
            setEnemyId(ingamedata_teamBlue)
            
            return (
                ingamedata_teamRed.map((participant, index) =>
                <ChampionInfo key={index} participant={participant}/>)
            )
        } else {
            setEnemyId(ingamedata_teamRed)
            return (
                ingamedata_teamBlue.map((participant, index) =>
                <ChampionInfo key={index} participant={participant}/>)
            )
        }
    }, [load, ingameData]);
    
    
    const components2 = useMemo(() => {

        let ingamedata_teamBlue = ingameData?.participants?.filter( function (a) {
            if ( a.teamId === 100 ) {
                return true ;
            }
        })
    
        let ingamedata_teamRed = ingameData?.participants?.filter( function (a) {
            if ( a.teamId === 200) {
                return true ;
            }
        })

        if (ingameData?.participants[0].teamId === 200) {
            return (
                ingamedata_teamBlue.map((participant, index) => (
                    <>
                        <Nav variant="tabs" defaultActiveKey="link0">
                            <div className="nav-box-margin">
                                <Nav.Item onClick={() => { setTab(0) }}>
                                    <Nav.Link eventKey="link0">
                                        <EnemyTeamChampions key ={index} participant={participant}/>
                                    </Nav.Link>
                                </Nav.Item>
                            </div>
                        </Nav>
                        {!!(myChapId && enemyId) && <TabContent myChapId = {myChapId} enemyId = {enemyId} tab = {tab}/>}
                    </>
                )))
        } else if (ingameData?.participants[0].teamId === 100) {
            return (
                ingamedata_teamRed.map((participant, index) => (
                    <>
                        <Nav variant="tabs" defaultActiveKey="link0">
                            <div className="nav-box-margin">
                                <Nav.Item onClick={() => {setTab(0)}}>
                                    <Nav.Link eventKey="link0">
                                        <EnemyTeamChampions key ={index} participant = {participant}/>
                                    </Nav.Link>
                                </Nav.Item>
                            </div>
                        </Nav>
                        {!!(myChapId && enemyId) && <TabContent myChapId = {myChapId} enemyId = {enemyId} tab = {tab}/>}
                    </>
                )))
        }
    }, [load, ingameData, myChapId, tab]);
    
    
    return (
        <div className="App float-left">
            <Navibar/>
            <div className="display-flex">
                <div>
                    {components}
                    {components2}
                </div>
            </div>
        </div>
    );
}

export default User;

