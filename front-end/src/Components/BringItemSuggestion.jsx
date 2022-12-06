import React, { useEffect, useState } from "react";
import axios from "axios";

const IMAGE_RESOURCE_URL = 'https://ddragon.leagueoflegends.com/cdn/12.22.1/img'
const PERK_IMAGE_RESOURCE_URL = 'https://ddragon.leagueoflegends.com/cdn/img'

function BringItemSuggestion({ mySummonerChampionId, EnemySummonerChampionId }) {
    if(!mySummonerChampionId || !EnemySummonerChampionId) {
        return null;
    }
    
    
    const [getItem, setGetItem] = useState([])
    
    
    useEffect(() => {
        async function getRelativeWinRateData() {
            try {
                const res = await axios.get(`localhost:5000/${mySummonerChampionId}/${EnemySummonerChampionId}`, {
                });
                if (res.data) {
                    setGetItem(res.data);
                }
            } catch ( e ) {
                 return e
            }
        }
        BringItemSuggestion();
    }, [mySummonerChampionId]);
    
    console.log(getItem)
    
    return (
        <div >
            {/*<div className="champ_Box">*/}
            {/*    <img src = {`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${가져온 아이템의 숫자}.png`}/>*/}
            {/*    <h5>승률 : 가져온 데이터를 출력</h5>*/}
            {/*    <h5>픽률 : 가져온 데이터를 출력 </h5>*/}
            {/*</div>*/}
        </div>
    );
}

export default BringItemSuggestion;