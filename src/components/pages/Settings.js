import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Store.css";
import {  signOut } from "firebase/auth";
import {auth, db, sendPasswordReset, } from '../UI/firebaseConfig';
import {Container, Nav, Navbar} from "react-bootstrap";
import {collection, doc, getDoc, onSnapshot} from "firebase/firestore";



const Store = () => {

    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [email, setEmail] = useState("");
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

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }


    const [username, setUsername] = useState('');
    useEffect(()=> {
        const getdata = async () => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            setUsername(docSnap.get("username"));
            return () => {
                getdata();
            }
        }
    })

    return (
        <>
            <div className="settingsform">
                <form>
                    <h2> Account settings </h2>
                    <hr/>
                    <h5 >Your username:{username} </h5>
                    <hr/>
                    <h5>Your email address: {user?.email} </h5>
                    <hr/>
                    <p>Want to change your password? </p>
                    <input type="text"
                           placeholder="Enter email..." value={email} onChange={(e) => setEmail(e.target.value)}
                           className="form-control" />
                    <hr/>
                    <button className="resetbutton" onClick={() => sendPasswordReset(email)}>Reset password</button>
                </form>
            </div>
            <Navbar fixed="top" expand="md" bg="black" variant="dark">
                <Container>
                    <Navbar.Brand href="/store">
                        <div className="typewriter-logo">
                            <h1>Payit</h1>
                        </div>
                    </Navbar.Brand>
                    <Nav>
                        <ul className="hList">
                            <li>
                                <a className="menu">
                                    <h1 className="menu-title">Account</h1>
                                    <ul className="menu-dropdown">
                                        <li onClick={storepage}>Store</li>
                                        <li onClick={addProducts}>Add product</li>
                                        <li onClick={settings}>Settings</li>
                                        <li onClick={handleLogout}>Logout</li>
                                    </ul>
                                </a>
                            </li>
                        </ul>
                    </Nav>
                </Container>
            </Navbar>


        </>


    );
}

export default Store;


