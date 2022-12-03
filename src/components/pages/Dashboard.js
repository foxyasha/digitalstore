import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import {  signOut } from "firebase/auth";
import { auth } from '../UI/firebaseConfig';

const Dashboard = () => {
    const navigate = useNavigate();

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
        <div className="dashboard">
            <p>
                Welcome Home
            </p>
            <div className="dashboard__container">
                <button className="dashboard__btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}
export default Dashboard;