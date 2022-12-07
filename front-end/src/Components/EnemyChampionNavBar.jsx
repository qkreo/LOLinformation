import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import EnemyTeamChampionsFace from "./EnemyTeamChampionsFace";
import TapContent from './TabContent'

function EnemyChampionNavBar ({ myChampionId, enemyTeam }) {
    
    let [tab, setTab] = useState ('0')
    
    const navMainBar = enemyTeam.map((enemy, i) => {
        return(
            <Nav.Item>
                <Nav.Link eventKey={`link${i}`} onClick={() => (setTab(i))}>
                    <EnemyTeamChampionsFace enemy = {enemy}/>
                </Nav.Link>
            </Nav.Item>
        )
    })
    
    
    return (
        <>
            <Nav variant="tabs"  defaultActiveKey="link0">
                {navMainBar}
            </Nav>
            <TapContent myChampionId={myChampionId} tab={tab} enemyTeam={enemyTeam}/>
        </>
    );
}

export default EnemyChampionNavBar;