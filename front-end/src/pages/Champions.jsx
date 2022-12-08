import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import ChampionItemByTier from "../Components/ChampionItemByTier";
import { RIOTGAMES_API, API_KEY, SERVER_URL } from "../Constants";

function Champions() {
    
    const urlParams = useParams();
    
    return (
        <>
            <br/>
            <img
                src={`https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${urlParams.championsEngName}.png`}
                width="100"/>
            <br/>
            <div>
                <ChampionItemByTier />
            </div>
            
            
        </>
    );
}

export default Champions;