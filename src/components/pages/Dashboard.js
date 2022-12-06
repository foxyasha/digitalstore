import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import {  signOut } from "firebase/auth";
import { auth } from '../UI/firebaseConfig';
import Header from "../header";



const Dashboard = () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
    }, [user, loading]);

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });


    }
    return (
        <>
            <Header/>
            <div className="dashboard">
                <button className="dashboard__btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </>

    );
}
export default Dashboard;

