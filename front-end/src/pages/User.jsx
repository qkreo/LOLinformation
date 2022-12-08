import { useState, useEffect, useMemo } from "react";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RIOTGAMES_API, API_KEY } from "../Constants";
import ChampionInfo from "../Components/ChampionInfo";
import Navibar from "../Components/Navibar";

import EnemyChampionNavBar from "../Components/EnemyChampionNavBar";
import MyBestChampions from '../Components/MyBestChampions'



function User() {
    const urlParams = useParams();
    const summonerName = urlParams.name
    const [summonerId, setSummonerId] = useState();
    const [ingameData, setIngameData] = useState();
    const [myChampionId, setMyChampionId] = useState('')
    const [enemyTeam, setEnemyTeam] = useState([])
    
    
    //가져온 summonername으로 summonerid 가져오는 거
    useEffect(() => {
        if ( !urlParams.name ) {
            return;
        }
        async function getRiotUserID() {
            try {
                const res = await axios.get(`${RIOTGAMES_API}/summoner/v4/summoners/by-name/${urlParams.name}`, {
                    params : { "api_key" : API_KEY }
                });
                
                if ( res?.data?.id ) {
                    
                    setSummonerId(res.data.id);
                }
            } catch ( e ) {
                console.log(e)
            }
        }
        
        getRiotUserID();
    }, [urlParams]);
    
   
    
    //위에서 가져온 summonerid로 ingamedata 가져오는 거
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
                console.log(e)
            }
        }
        getRiotIngameData();
        
    }, [summonerId]);
    
    
    const components = useMemo(() => {
        if ( !summonerId ) {
            return;
        }
        if (!ingameData) {
            return <MyBestChampions summonerName = {summonerName} />
        }

        let inGameDataTeamBlue = ingameData?.participants?.filter( function (a) {
            if ( a.teamId === 100 ) {
                return true ;
            }
        })
    
        let inGameDataTeamRed = ingameData?.participants?.filter( function (a) {
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
    
        inGameDataTeamRed.sort(function (a, b) {
            if ( a.summonerName === urlParams.name ) {
                return -1;
            } else {
                return 0;
            }
        })
        
        inGameDataTeamBlue.sort(function (a, b) {
            if ( a.summonerName === urlParams.name ) {
                return -1;
            } else {
                return 0;
            }
        })
        
        setMyChampionId(ingameData?.participants[0].championId)
        
        
        if (ingameData?.participants[0].teamId === 200) {
            setEnemyTeam(inGameDataTeamBlue)
            
            return (
                inGameDataTeamRed.map((participant, index) =>
                <ChampionInfo key={index} participant={participant}/>)
            )
        } else {
            setEnemyTeam(inGameDataTeamRed)
            return (
                inGameDataTeamBlue.map((participant, index) =>
                <ChampionInfo key={index} participant={participant}/>)
            )
        }
    }, [ingameData]);
    
    
    return (
        <div className="App float-left ">
            <Navibar/>
            <div className="display-flex-width">
                <MyBestChampions summonerName={summonerName}/>
                <div className="display-flex">
                    <div>
                        {components}
                    </div>
                    <div>
                        <EnemyChampionNavBar myChampionId={myChampionId} enemyTeam={enemyTeam}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;

