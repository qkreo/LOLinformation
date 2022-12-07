import User from '../pages/User.jsx'
import Home from '../pages/Home.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Champions from "../pages/Champions";
import Practice from "../pages/Practice";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = '/' element={<Home/>}> </Route>
                <Route path = '/summoners/kr/:name' element={<User />}> </Route>
                <Route path = '/match/:championsEngName' element={<Champions />}> </Route>
                <Route path = '/test' element={<Practice/>}> </Route>
            </Routes>
        </BrowserRouter>
        )
        
}

export default Router