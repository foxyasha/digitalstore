import React, {Component} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import MissingPage from "../pages/MissingPage";
import HelloPage from "../pages/HelloPage";

class AppRouter extends Component {
    render() {
        return (
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<SignIn/>}/>
                    <Route path="/reg" element={<SignUp/>}/>
                    <Route path="/hello" element={<HelloPage/>}/>
                    <Route path="/error" element={<MissingPage/>}/>
                    <Route path="*" element={<Navigate to="/error" replace/>}/>
                </Routes>
        );
    }
}

export default AppRouter;