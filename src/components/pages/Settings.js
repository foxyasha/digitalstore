import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Store.css";
import {createUserWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import {auth, db, sendPasswordReset } from '../UI/firebaseConfig';
import {Container, Nav, Navbar, Spinner} from "react-bootstrap";
import {collection, doc, getDoc, onSnapshot, query} from "firebase/firestore";
import Particle from "../styles/Particle";
import ValidData from "../ValidData";



const Store = () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState('');
    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
    }, [user, loading]);


    const settings = () =>{
        navigate("/settings")
    }
    const storepage = () =>{
        navigate("/store")
    }
    const addProducts = () =>{
        navigate("/add")
    }
    const cart = () =>{
        navigate("/cart")
    }
    const myproducts = () =>{
        navigate("/myproducts")
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }


    if(loading){
        return <Spinner style={{
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent:"center",
            display:"flex",
            marginTop:"300px"
        }}/>
    }

    return (
        <>
            <div className="bg-settingsimage ">
                <Particle/>
            <div className="settingsform">
                <form>
                    <h2> Account settings </h2>
                    <h5>Your username: {auth.currentUser.displayName} </h5>
                    <hr/>
                    <h5>Your email address: {user?.email} </h5>
                    <hr/>
                    <p>Want to change your password? </p>
                    <input type="text"
                           placeholder="Enter email..." value={email} onChange={(e) => setEmail(e.target.value)}
                           className="form-control" required/>
                    <hr/>
                    <button className="resetbutton" onClick={() => sendPasswordReset(email)}  >Reset password</button>
                </form>

            </div>
            <Navbar fixed="top"  variant="dark" className="navtitlebutton">
                <Container>
                    <Navbar.Brand href="/store">
                        <div className="typewriter-logo">
                            <h1>Payit</h1>
                        </div>
                    </Navbar.Brand>
                    <Nav className="navDropbutton">
                        <ul >
                            <li>
                                <a className="menu">
                                    <span className="menu-title">Account</span>
                                    <ul className="menu-dropdown">
                                        <li onClick={storepage}>Store</li>
                                        <li onClick={addProducts}>Add product</li>
                                        <li onClick={myproducts}>My products</li>
                                        <li onClick={cart}>Cart</li>
                                        <li onClick={settings}>Settings</li>
                                        <li onClick={handleLogout}>Logout</li>
                                    </ul>
                                </a>
                            </li>
                        </ul>
                    </Nav>
                </Container>
            </Navbar>
            </div>
        </>


    );
}

export default Store;


