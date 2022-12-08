import { Button, InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navibar from "../Components/Navibar";
import { useState } from "react";
import ChampionList from '../Components/ChampionList'
import { RIOTGAMES_API, API_KEY } from "../Constants";


//Home (메인 페이지)
function Home() {
    const navigate = useNavigate();
    const [inputName, setInputName] = useState("");
    
    
    return (
        <div>
            <Navibar/>
            
            {/*검색창*/}
            <InputGroup className="mb-3 searchbar-location" onChange={(e) => {
                setInputName(e.target.value);
            }}>
                <Form.Control
                    placeholder="소환사 닉네임"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
                <Button variant="dark" id="button-addon2" onClick={() => {
                    navigate(`/summoners/kr/${inputName}`);
                }}>
                    검색
                </Button>
            </InputGroup>
            
            {/*챔프 전체 가져오는 components*/}
            <div className='title-location'>**챔피언별 아이템 추천**</div>
            <ChampionList/>
            
        </div>
    );
}


export default Home;


