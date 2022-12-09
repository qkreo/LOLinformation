import { Container, Navbar } from 'react-bootstrap';
import Ahri14 from '../img/img/champion/tiles/Ahri_14.jpg'
import {  useNavigate } from 'react-router-dom'
import { RIOTGAMES_API, API_KEY, SERVER_URL } from "../Constants";

function Navibar() {
    
    let navigate = useNavigate()
    return (
        <div className="App">
            {/*Nav bar*/}
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand
                        onClick={ ()=> {navigate('/')}}
                    >
                        <img
                            alt=""
                            src= { Ahri14 }
                            width="40"
                            height="40"
                            className="d-inline-block align-top Navbar"
                        />
                        LoLinfo
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navibar;
