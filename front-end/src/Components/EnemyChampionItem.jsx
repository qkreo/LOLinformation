import React, { useEffect, useState } from "react";
import axios from "axios";

function EnemyChampionItem ({ tab, myChampionId, enemy}) {
    
    const [getItem, setGetItem] =useState([])
    
    const enemyChampionId = enemy.championId
    
    
    useEffect(() => {
        async function getRelativeWinRateData() {
            try {
                const res = await axios.get(`http://localhost:5000/match/${myChampionId}/${enemyChampionId}`);
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
        getItem.map( (value, i) => (
            <>
                <div className="champ_Box">
                    <img
                        src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${getItem[i].itemId}.png`}
                    />
                    <h5>승률 : {`${getItem[i].winRate}`} </h5>
                    <h5>픽률 : {`${getItem[i].pickRate}`} </h5>
                </div>
            </>
        ))
    )
}


export default EnemyChampionItem;