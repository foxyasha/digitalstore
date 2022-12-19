import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate, useParams} from "react-router-dom";
import "../styles/Store.css";
import {  signOut } from "firebase/auth";
import {auth, storage, db, sendPasswordReset} from '../UI/firebaseConfig';
import {Card, CardGroup, Container, Form, Image, Nav, Navbar, Spinner} from "react-bootstrap";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import {collection, doc, onSnapshot, deleteDoc, addDoc, serverTimestamp} from "firebase/firestore"
import Particle from "../styles/Particle";
import {GridColumn} from "semantic-ui-react";
import button from "bootstrap/js/src/button";
import ValidData from "../ValidData";



const Cart = () => {

    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [mas] = useState([]);
    const [carts, setCarts] = useState([]);

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

    useEffect(()=>{
        const unsub = onSnapshot(collection(db,"carts"), (snapshot) =>{
            let list = [];
            snapshot.docs.forEach((doc) =>{
                list.push({id: doc.id, ...doc.data()})
                mas.push(doc.id);
            });
            setCarts(list);
        }, (error)=>{
            console.log(error);
        })
        return() =>{
            unsub();
        }
    }, []);


    const handleDeleteCart = async (index) =>{
        if(window.confirm("Are you sure to delete this product?")){
            try{
                await deleteDoc(doc(db,"carts", mas[index]));
                mas.splice(index, 1);
            } catch(err){

            }
        }
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
            <div className="bg-settingsimage">
                <Particle/>
                <div className="settingsform">
                    <div className="formsets">
                        <h1 style={{color: 'white'}}> Your cart </h1>
                            <CardGroup>
                                {carts && carts.map((item, index)=>(
                                    <div className="settingsCartForm">
                                        {user.uid === item.buyeruid ?
                                            <GridColumn>
                                                <Card style={{width:"320px"}}>
                                                    <Image
                                                        src={item.img.img}
                                                        style={{
                                                            height:"100px",
                                                            width:"100px",
                                                            objectFit:"contain",
                                                        }}
                                                    />
                                                    <Card.Header>
                                                        <h5>Product: <i>{item.title}</i></h5>
                                                        <label>Price: <i className="bold">{item.price} $</i></label>
                                                        <br/>
                                                        <label>Seller: <i className="bold">{item.username}</i></label>
                                                        <br/>
                                                        <label>Qty: <i className="bold">{item.count}</i></label>
                                                        <button onClick={()=> handleDeleteCart(index)}>Delete</button>
                                                    </Card.Header>
                                                </Card>
                                            </GridColumn>
                                            : null}
                                    </div>
                                ))}
                            </CardGroup>
                    </div>
                </div>
                <Navbar fixed="top" variant="dark" className="navtitlebutton">
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

export default Cart;


