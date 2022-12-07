import React, { useEffect, useState } from "react";
import axios from 'axios'
import EnemyChampionItem from "./EnemyChampionItem";

function TabContent({ tab, myChampionId, enemyTeam, enemy }) {
    
    const [fade, setFade] = useState("");
    

    
    //천천히 나타나는 애니메이션
    useEffect(() => {
        setTimeout(() => {
            setFade("end");
        }, 100);
        return () => {
            setFade("");
        };
    }, [tab]);
    
    const enemyChampionItem = enemyTeam.map((enemy, i ) => {
        switch (tab) {
            case i:
                return (
                    <div className={`start ${fade} nav-box-margin`}>
                        <EnemyChampionItem tab={tab} myChampionId={myChampionId} enemyTeam={enemyTeam} enemy = {enemy}/>
                    </div>
                )
        }
    })
    
    return (
        <>
            {enemyChampionItem}
        </>
    )
    
}

export default TabContent ;