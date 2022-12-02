import User from './pages/User.jsx'
import Cart from './pages/Carts.jsx'
import Home from './pages/Home.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = '/' element={<Home/>}> </Route>
                <Route path = '/summoners/kr' element={<User/>}> </Route>
                <Route path = '/' element={<Cart/>}> </Route>
            </Routes>
        </BrowserRouter>
        )
        
}

export default Router