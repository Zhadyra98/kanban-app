import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";
import BoardsPage from "./pages/BoardsPage";

function App() {
    return (
        <Router>
            {/*<Header {...props} />*/}
            <Routes>
                {/*<Route element={<PrivateRoutes />}>*/}
                {/*    <Route element={<AdminPanel {...props}/>} path="/" exact/>*/}
                {/*</Route>*/}
                <Route path="/" element={<BoardsPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegistrationPage/>} />
            </Routes>
        </Router>
    );
}

export default App;
