import React, { useEffect, useState } from "react";
import axios from "axios";
import { RIOTGAMES_API, API_KEY, SERVER_URL } from "../Constants";

function EnemyChampionItem ({ tab, myChampionId, enemy}) {
    
    const [getItem, setGetItem] =useState([])
    
    const enemyChampionId = enemy.championId

    
    useEffect(() => {
        async function getRelativeWinRateData() {
            try {
                const res = await axios.get(`${SERVER_URL}/match/${myChampionId}/${enemyChampionId}`);
                if (res?.data) {
                    setGetItem(res.data);
                }
            } catch ( e ) {
                console.log(e)
                return e
            }
        }
        
        getRelativeWinRateData();
        
    }, [myChampionId, tab]);
    
    
    return (
        getItem.slice(0,12).map( (value, i) => (
            <div >
                <div className="champ_Box ">
                    <img
                        src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${getItem[i].itemId}.png`}
                    />
                    <h5>픽률 : {`${getItem[i].pickRate}`} </h5>
                    <h5>승률 : {`${getItem[i].winRate}`} </h5>
                </div>
            </div>
        ))
    )
}


export default EnemyChampionItem;