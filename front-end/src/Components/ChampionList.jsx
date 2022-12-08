import React from "react";
import champdata from "../data/champdata";
import { useNavigate } from "react-router-dom";
import { RIOTGAMES_API, API_KEY, SERVER_URL } from "../Constants";

function ChampionList() {
    
    const navigate = useNavigate();
    
    //한글 순서대로 맞추기
    const champdata_ko_ordered =
        champdata.sort(function (a, b) {
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();
            if ( x < y ) {
                return -1;
            }
            if ( x > y ) {
                return 1;
            }
            return 0;
        });
    
    return (
        champdata_ko_ordered.map((champions, index) => (
                <div>
                    <a className="champBox" onClick={() => {navigate(`/match/${champions.engName}`)}}>
                        <p id="champList">
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${champions.engName}.png`}
                            width= '80'/>
                            <div className='text-align-center' >
                                <p>{`${champions.name}`}</p>
                            </div>
                        </p>
                    </a>
                </div>
            )
        ))
};

export default ChampionList;
