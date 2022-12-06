import React, { useState, useEffect, useMemo } from "react";
import champdata from "../data/champdata";
import spelldata from "../data/spelldata";
import {MAIN , SUB} from "../data/perkdata";
import { Nav } from "react-bootstrap";
import TabContent from "./TabContent";
import ChampionInfo from "./ChampionInfo";


const IMAGE_RESOURCE_URL = 'https://ddragon.leagueoflegends.com/cdn/12.22.1/img'
const PERK_IMAGE_RESOURCE_URL = 'https://ddragon.leagueoflegends.com/cdn/img'


function Enemychampioninfo() {
    
    const [tab, setTab] = useState(0)
    
    // const champData = champdata.find(champ => champ.id === participant.championId)?.engName;
    
    return (
        <Nav variant="tabs" defaultActiveKey="link0">
            <div className="nav-box-margin">
                <Nav.Item onClick={() => {setTab(0)}}>
                    <Nav.Link eventKey="link0">
                        <TabContent tab = {tab}/>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => { setTab(1)}}>
                    <Nav.Link eventKey="link1">
                        <TabContent tab = {tab}/>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => { setTab(2)}}>
                    <Nav.Link eventKey="link2">
                        <TabContent tab = {tab}/>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => { setTab(3)}}>
                    <Nav.Link eventKey="link2">
                        <TabContent tab = {tab}/>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => { setTab(4)}}>
                    <Nav.Link eventKey="link2">
                        <TabContent tab = {tab}/>
                    </Nav.Link>
                </Nav.Item>
            </div>
        </Nav>
    )
}


export default Enemychampioninfo;

//  상대편의 이미지 얼굴통
// function EnemyTeamChampions(props) {
//     return (
//         <div>
//             <img
//                 src={"https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/" + props.champImg + ".png"}
//                 width="60"
//                 className="img-enemy-rounded"
//             />
//         </div>
//     );
// }

