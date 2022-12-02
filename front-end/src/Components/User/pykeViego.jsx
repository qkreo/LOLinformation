import React from "react";

function PykeViego(props) {
    return (
        <div className="champ_Box">
            <img src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${props.pykeViego}.png`} width= '50'/>
            <p>픽률 : {props.pickRate}</p>
            <p>승률 : {props.winRate}</p>
        </div>
    )
}

export default PykeViego