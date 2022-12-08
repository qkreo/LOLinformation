import React, { useEffect } from "react";
import champdata from "../data/champdata";
import spelldata from "../data/spelldata";
import {MAIN , SUB } from "../data/perkdata";
import { RIOTGAMES_API, API_KEY, SERVER_URL } from "../Constants";


const IMAGE_RESOURCE_URL = 'https://ddragon.leagueoflegends.com/cdn/12.22.1/img'
const PERK_IMAGE_RESOURCE_URL = 'https://ddragon.leagueoflegends.com/cdn/img'


// 상대편의 이미지 얼굴통
function enemyTeamChampionsFace({ enemy }) {
    if (!enemy) {
        return null;
    }
    
    const champData = champdata.find(champ => champ.id === enemy.championId)?.engName;
    const spell1 = spelldata.find(spell => spell.id === enemy.spell1Id)?.name;
    const spell2 = spelldata.find(spell => spell.id === enemy.spell2Id)?.name;
    const perkMain  = MAIN.find(perk=> perk.id === enemy.perks.perkIds[0])?.image;
    const perkSub = SUB.find(perk=> perk.id === enemy.perks.perkSubStyle)?.image;
    
    
    return (
        <div className="align-a-cross">
            <div className={enemy.teamId === 100 ? "team-color-small" : "team-color2-small"}>
            
                <img
                    src={`${IMAGE_RESOURCE_URL}/champion/${champData}.png`}
                    width="40"
                    className="img-centered"
                />
            
                <div className="id-margin">
                    <img
                        src={`${IMAGE_RESOURCE_URL}/spell/${spell1}.png`}
                        width="30"
                        height="30"
                    />
                    <img
                        src={`${IMAGE_RESOURCE_URL}/spell/${spell2}.png`}
                        width="30"
                        height="30"
                    />
                </div>
            
                <div className="id-margin">
                    <img
                        src={`${PERK_IMAGE_RESOURCE_URL}/perk-images/Styles/${perkMain}`}
                        width="30"
                        height="30"
                        className="perk-box"
                    />
                    <img
                        src={`${PERK_IMAGE_RESOURCE_URL}/perk-images/Styles/${perkSub}`}
                        width="28"
                        height="28"
                        className="perk-box"
                    />
                </div>
            </div>
        </div>
    );
}

export default enemyTeamChampionsFace;