import React, {Component} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import MissingPage from "../pages/MissingPage";
import Dashboard from "../pages/Dashboard";
import Reset from "../pages/Reset";
import Hello from "../pages/Hello";

class AppRouter extends Component {
    render() {
        return (
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<SignIn/>}/>
                    <Route path="/reg" element={<SignUp/>}/>
                    <Route path="/reset" element={<Reset/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/hello" element={<Hello/>}/>
                    <Route path="/error" element={<MissingPage/>}/>
                    <Route path="*" element={<Navigate to="/error" replace/>}/>
                </Routes>
        );
    }
}

export default AppRouter;