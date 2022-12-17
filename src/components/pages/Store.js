import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";
import "../styles/Store.css";
import {  signOut } from "firebase/auth";
import {auth, db} from '../UI/firebaseConfig';
import {Card, CardGroup, Container, Image, Modal, Nav, Navbar} from "react-bootstrap";
import {collection, onSnapshot} from "firebase/firestore";
import CardHeader from "react-bootstrap/CardHeader";


const Store =  () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
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

    const [products, setProducts] = useState([]);
    const [loadings, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
        const unsub = onSnapshot(collection(db,"products"), (snapshot) =>{
            let list = [];
            snapshot.docs.forEach((doc) =>{
                list.push({id: doc.id, ...doc.data()})
            });
            setProducts(list);
            setLoading(false);
        }, (error)=>{
            console.log(error);
        })
        return() =>{
            unsub();
        }
    }, []);



    return (
        <>
            <Container style={{
                height:"auto",
                width:"auto",
                marginTop:"100px",
            }}>
                <CardGroup>
                    {products && products.map((item)=>(
                        <Card key={item.id}>
                                <Image
                                    src={item.img.img}
                                    size="medium"
                                    style={{
                                        height:"200px",
                                        width:"200px",
                                        marginLeft: "auto",
                                        marginRight: "auto"
                                    }}
                                />
                            <Card.Header style={{marginTop: "10px"}}>
                                <h5>Product: {item.title}</h5>
                                <label>Price: {item.price} $</label>
                                <br/>
                                <br/>
                                <label>For more information: <button className="btn btn-dark btn-sm">
                                    View
                                </button>

                                </label>


                            </Card.Header>

                        </Card>
                    ))}
                </CardGroup>
            </Container>
            <Navbar fixed="top" expand="md" bg="black" variant="dark">
                <Container>
                    <Navbar.Brand href="/store">
                        <div className="typewriter-logo">
                            <h1>Payit</h1>
                        </div>
                    </Navbar.Brand>
                    <Nav>
                        <ul>
                            <li>
                                <a className="menu">
                                    <span className="menu-title">Account</span>
                                    <ul className="menu-dropdown">
                                        <li onClick={storepage}>Store</li>
                                        <li onClick={addProducts}>Add product</li>
                                        <li onClick={settings}>Settings</li>
                                        <li  onClick={handleLogout}>Logout</li>
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
