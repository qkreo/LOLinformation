import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import champdata from "../data/champdata";
import axios from "axios";

function ChampionItemByTier() {
    
    const urlParams = useParams();
    const [championItems, setChampionsItems] = useState([])
    const [load, setLoad] = useState(false)
    
    let challengerData = [];
    let grandMasterData = [];
    let masterData = [];
    let diamondData = [];
    let platinumData = [];
    let goldData = [];
    let silverData = [];
    let bronzeData = [];

    
    const urlParamsChampion = champdata.find((champion) => {
        if ( champion.engName === urlParams.championsEngName ) {
            return true;
        }
    })
    

    //서버로 부터 챌,그마,마스터, 다이야, 플레, 골드 데이터 가져오기
    useEffect(() => {
        if ( !urlParams ) {
            return;
        }
        
        async function getChampion() {
            try {
                const res = await axios.get(`http://localhost:5000/match/${urlParamsChampion.id}`)
                if ( res?.data ) {
                    setChampionsItems(res.data)
                }
            } catch ( e ) {
                setLoad(true)
            }
        }
        
        getChampion()
        
    }, [urlParams])
    
    
    
    for ( let i = 0 ; i < championItems.length ; i++)
        if (championItems[i].tier === "CHALLENGER" ) {  //티어가 챌린저 일때
            challengerData.push(championItems[i])
            challengerData.sort((a, b) => b.winRate - a.winRate);
        }else if (championItems[i].tier === "GRANDMASTER" ) {
            grandMasterData.push(championItems[i])
            grandMasterData.sort((a, b) => b.winRate - a.winRate);
        }else if (championItems[i].tier === "MASTER" ) {
            masterData.push(championItems[i])
            masterData.sort((a, b) => b.winRate - a.winRate);
        }else if (championItems[i].tier === "DIAMOND" ) {
            diamondData.push(championItems[i])
            diamondData.sort((a, b) => b.winRate - a.winRate);
        }else if (championItems[i].tier === "PLATINUM" ) {
            platinumData.push(championItems[i])
            platinumData.sort((a, b) => b.winRate - a.winRate);
        }else if (championItems[i].tier === "GOLD" ) {
            goldData.push(championItems[i])
            goldData.sort((a, b) => b.winRate - a.winRate);
        }else if (championItems[i].tier === "SILVER" ) {
            silverData.push(championItems[i])
            silverData.sort((a, b) => b.winRate - a.winRate);
        }else if (championItems[i].tier === "BRONZE" ) {
            bronzeData.push(championItems[i])
            bronzeData.sort((a, b) => b.winRate - a.winRate);
    }
    
    const challengerItemImg = challengerData.map((value, i) => {
        return (
                <div>
                    <div className="champ_Box">
                        <img
                            src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${challengerData[i].itemId}.png`}
                        />
                        <h5>승률 : {`${challengerData[i].winRate}`} </h5>
                        <h5>픽률 : {`${challengerData[i].pickRate}`} </h5>
                    </div>
                </div>
            )
    })
    
    const gramdmasterItemImg = grandMasterData.map((value, i) => {
        return (
            <div>
                <div className="champ_Box">
                    <img
                        src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${grandMasterData[i].itemId}.png`}
                    />
                    <h5>승률 : {`${grandMasterData[i].winRate}`} </h5>
                    <h5>픽률 : {`${grandMasterData[i].pickRate}`} </h5>
                </div>
            </div>
        )
    })
    
    const masterItemImg = masterData.map((value, i) => {
        return (
            <div>
                <div className="champ_Box">
                    <img
                        src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${masterData[i].itemId}.png`}
                    />
                    <h5>승률 : {`${masterData[i].winRate}`} </h5>
                    <h5>픽률 : {`${masterData[i].pickRate}`} </h5>
                </div>
            </div>
        )
    })

    const diamondItemImg = diamondData.map((value, i) => {
        return (
            <div>
                <div className="champ_Box">
                    <img
                        src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${diamondData[i].itemId}.png`}
                    />
                    <h5>승률 : {`${diamondData[i].winRate}`} </h5>
                    <h5>픽률 : {`${diamondData[i].pickRate}`} </h5>
                </div>
            </div>
        )
    })

    const platinumItemImg = platinumData.map((value, i) => {
        return (
            <div>
                <div className="champ_Box">
                    <img
                        src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${platinumData[i].itemId}.png`}
                    />
                    <h5>승률 : {`${platinumData[i].winRate}`} </h5>
                    <h5>픽률 : {`${platinumData[i].pickRate}`} </h5>
                </div>
            </div>
        )
    })

    const goldItemImg = goldData.map((value, i) => {
        return (
            <div>
                <div className="champ_Box">
                    <img
                        src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${goldData[i].itemId}.png`}
                    />
                    <h5>승률 : {`${goldData[i].winRate}`} </h5>
                    <h5>픽률 : {`${goldData[i].pickRate}`} </h5>
                </div>
            </div>
        )
    })

    const silverItemImg = silverData.map((value, i) => {
        return (
            <div>
                <div className="champ_Box">
                    <img
                        src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${silverData[i].itemId}.png`}
                    />
                    <h5>승률 : {`${silverData[i].winRate}`} </h5>
                    <h5>픽률 : {`${silverData[i].pickRate}`} </h5>
                </div>
            </div>
        )
    })

    const bronzeItemImg =bronzeData.map((value, i) => {
        return (
            <div>
                <div className="champ_Box">
                    <img
                        src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${bronzeData[i].itemId}.png`}
                    />
                    <h5>승률 : {`${bronzeData[i].winRate}`} </h5>
                    <h5>픽률 : {`${bronzeData[i].pickRate}`} </h5>
                </div>
            </div>
        )
    })

    
    return (
        <>
            <div>
                <h4>Challenger / $$판수 적어주면 좋을듯 근데 하려면 백에서 줘야 하는구나$$</h4>
                {challengerItemImg}
            </div>
            
            <div className='clear margin-top'>
                <h4>GrandMaster / $$판수 적어주면 좋을듯$$ </h4>
                {gramdmasterItemImg}
            </div>
    
            <div className='clear'>
                <h4>Master / $$판수 적어주면 좋을듯$$ </h4>
                {masterItemImg}
            </div>
    
            <div className='clear'>
                <h4>Diamond / $$판수 적어주면 좋을듯$$ </h4>
                {diamondItemImg}
            </div>
            
            <div className='clear'>
                <h4>Platinum / $$판수 적어주면 좋을듯$$ </h4>
                {platinumItemImg}
            </div>
            
            <div className='clear'>
                <h4>Gold / $$판수 적어주면 좋을듯$$ </h4>
                {goldItemImg}
            </div>
            
            <div className='clear'>
                <h4>Silver / $$판수 적어주면 좋을듯$$ </h4>
                {silverItemImg}
            </div>
            
            <div className='clear'>
                <h4>Bronze / $$판수 적어주면 좋을듯$$ </h4>
                {bronzeItemImg}
            </div>
        </>
    
    
    );
    
}

export default ChampionItemByTier;