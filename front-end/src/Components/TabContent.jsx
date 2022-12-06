import React, { useEffect, useState } from "react";
import axios from 'axios'

function TabContent({ tab, myChapId, enemyId }) {
    
    let [fade, setFade] = useState("");
    
    //천천히 나타나는 애니메이션
    useEffect(() => {
        setTimeout(() => {
            setFade("end");
        }, 100);
        return () => {
            setFade("");
        };
    }, [tab]);
    
    
    useEffect (() => {
        
        const responseData = async () => {
            await axios.get(`http://localhost:5000/match/${myChapId}/${enemyId[tab].championId}`)
            let res = ''
            return res.data
        }
        responseData()
        
    },[myChapId, enemyId, tab])
    
    return (
        <div className={`start ${fade} nav-box-margin`}>
            <div> ㅁㄴㅇㄻㄴㄹ </div>
            
        </div>
    );
}

export default TabContent ;