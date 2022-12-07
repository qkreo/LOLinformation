import React from   'react'
import {Nav} from 'react-bootstrap'
import { useState } from "react";
import EnemyTeamChampions from "../Components/EnemyTeamChampionsFace";

function Practice(participant) {
    
    let [tab, setTab] = useState('0')
    let [somearry, setSomeArry] = useState(['일번','이번','삼번','사번','오번'])
    let myid = 266
    
    const answer = somearry.map((someone, i) => {
        return(
                <Nav.Item>
                    <Nav.Link eventKey={`link${i}`} onClick={() => (setTab(i))}>
                        {someone}
                    </Nav.Link>
                </Nav.Item>
            )
    })
    
    return (
        <>
            <Nav variant="tabs"  defaultActiveKey="link0">
                {answer}
            </Nav>
            <TabContent  tab ={tab} somearry = {somearry} myid={myid} />
        </>
    );
}


function TabContent({tab, myid}) {
    
    let [somearry2, setSomeArry2] = useState(["0번 상황","1번 상황","2번 상황","3번 상황","4번 상황"])
    

        switch (tab) {
            case 0:
                return (
                    <div>
                        {myid}, {somearry2[0]}, {tab}
                        <EneChampImg tab = {tab} myid = {myid}/>
                    </div>
                )
            case 1:
                return (
                    <div>
                        {myid}, {somearry2[1]}, {tab}
                        <EneChampImg tab = {tab} myid = {myid}/>
                    </div>
            )
            case 2:
            return (
                <div>
                    {myid}, {somearry2[2]}, {tab}
                    <EneChampImg tab = {tab} myid = {myid}/>
                </div>
            )
            case 3:
                return (
                    <div>
                        {myid}, {somearry2[3]}, {tab}
                        <EneChampImg tab = {tab} myid = {myid} />
                    </div>
            )
            case 4:
            return (
                <div>
                    {myid}, {somearry2[4]}, {tab}
                    <EneChampImg tab = {tab} myid = {myid}/>
                </div>
                )
        }
        
}

function EneChampImg ({tab, myid}) {

    
    return(
        <div>
            상대 아이템 {tab}
        </div>
    )
    
    
}

export default Practice;


