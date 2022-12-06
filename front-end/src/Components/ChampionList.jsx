// import React from 'react'
// import axios from 'axios'
// import champdata from "../data/champdata";
//
//
// function ChampionList() {
//     async function BringImages() {
//         await axios.get(`https://ddragon.leagueoflegends.com/cdn/12.21.1/data/ko_KR/champion.json`);
//         console.log(res.data)
//     }
//
//     let champ_name = res?.data?.id
//     console.log(champ_name)
//
//     return (
//         <>
//             <a className="champBox">
//                 <p id="champList">
//                     <img src={`https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${champ_name}.png`}                    />
//                         <span>{`${champ_name}`}</span>
//                     </p>
//             </a>
//         </>
//         )
// }
//
// export default ChampionList;
