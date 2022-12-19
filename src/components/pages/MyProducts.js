import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";
import "../styles/Store.css";
import {  signOut } from "firebase/auth";
import {auth, db} from '../UI/firebaseConfig';
import {Button, Card, CardGroup, Container, Image, Nav, Navbar, Spinner} from "react-bootstrap";
import {collection, doc, onSnapshot, deleteDoc, addDoc, serverTimestamp} from "firebase/firestore";
import {GridColumn} from "semantic-ui-react";
import Modal from "../ModalComp";
import Particle from "../styles/Particle";
import button from "bootstrap/js/src/button";


const Store =  () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [products, setProducts] = useState([]);
    const [loadings, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [product, setProduct] = useState({})
    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
    }, [user, loading]);

    const settings = () =>{
        navigate("/settings")
    }
    const cart = () =>{
        navigate("/cart")
    }
    const storepage = () =>{
        navigate("/store")
    }
    const addProducts = () =>{
        navigate("/add")
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



    const handleClick = (item) =>{
        setOpenModal(true)
        setProduct(item)

    }

    const handleDelete = async (id) =>{
        if(window.confirm("Are you sure to delete this product?")){
            try{
                await deleteDoc(doc(db, "products", id));
                setProducts(products.filter((product) => product.id !== id))
                setOpenModal(false)
            } catch(err){
                console.log(err);
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
            <div className="bg-storeimage" >
                <Particle/>

                <Container className="HomeDesc" style={{
                    height:"auto",
                    width:"auto",
                    marginTop:"100px",
                }}>
                    <CardGroup>
                        {products && products.map((item)=>(
                            <div>
                                <GridColumn key={item.id}>
                                    {item.userUid === user.uid ?<Card>
                                        <Image
                                            src={item.img.img}
                                            style={{
                                                height:"250px",
                                                width:"250px",
                                                objectFit:"contain",
                                                marginLeft: "auto",
                                                marginRight: "auto",

                                            }}
                                        />
                                        <Card.Header style={{marginTop: "10px"}}>
                                            <h5>Product: <i>{item.title}</i></h5>
                                            <label>Price: <i className="bold">{item.price} $</i></label>
                                            <br/>
                                            <label>Seller: <i className="bold">{item.username}</i></label>
                                            <br/>
                                            <br/>
                                            <span className="bold">For more information:</span>
                                            <button  className="btn btn-dark btn-sm btnSize" onClick={() => handleClick(item)}>
                                                View
                                            </button>
                                        </Card.Header>
                                    </Card>: ''}

                                </GridColumn>
                            </div>

                        ))}
                    </CardGroup>
                </Container>
                <Navbar fixed="top" variant="dark" className="navtitlebutton " >
                    <Container>
                        <Navbar.Brand href="/store" >
                            <div className="typewriter-logo">
                                <h1 >Payit</h1>
                            </div>
                        </Navbar.Brand>
                        <Nav className="navDropbutton">
                            <ul >
                                <li >
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
                    {(
                        <Modal open={openModal} close={() => {
                            setOpenModal(false)}} {...product} handleDelete= {handleDelete} />
                    )}
                </Navbar>


            </div>
        </>

    );
}


export default Store;
