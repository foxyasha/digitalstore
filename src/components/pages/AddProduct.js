import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Store.css";
import {  signOut } from "firebase/auth";
import {auth, storage, db } from '../UI/firebaseConfig';
import {Container, Form, Nav, Navbar} from "react-bootstrap";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import {addDoc, serverTimestamp, collection} from "firebase/firestore"



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

    const [img, setImg] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(()=>{
        const uploadFile =() =>{
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) =>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                switch (snapshot.state){
                    case "paused":
                        console.log("Upload is Pause");
                        break;
                    case "running":
                        console.log("Upload is Running");
                        break;
                    default:
                        break;

                }
            }, (error) =>{
                console.log(error)
            },
                () =>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                    setImg((prev) => ({...prev, img: downloadURL}));
                });
                }
                );
        };
        file && uploadFile()
    }, [file]);


    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsSubmit(true);
        await addDoc(collection(db, "products"), {
            title,
            description,
            price,
            img,
            timestamp: serverTimestamp()
        })
        alert ("Your product successfully added!")
        navigate ("/store")
    }

    return (
        <>
            <div className="settingsform">
                <Form onSubmit={handleSubmit} >
                    <h2>Add your products</h2>
                    <hr/>
                    <label htmlFor="product-name">Product title</label>
                    <br/>
                    <input type="text" className="form-control" required
                    onChange={(e)=> setTitle(e.target.value)} value={title}
                    />
                    <br/>
                    <label htmlFor="product-desc">Product description</label>
                    <br/>
                    <input type="text" className="form-control" required
                    onChange={(e)=> setDescription(e.target.value)} value={description}
                    />
                    <br/>
                    <label htmlFor="product-price">Product price</label>
                    <br/>
                    <div className="currency-wrap">
                        <span className="currency-code">$</span>
                        <input type="number" className="form-control"
                               onChange={(e)=> setPrice(e.target.value)} value={price}/>
                    </div>

                    <br/>
                    <label htmlFor="product-name">Product image(png/jpg only)</label>
                    <br/>
                    <input type="file" id="file" className="form-control" required
                    onChange={(e)=> setFile(e.target.files[0])}
                    />
                    <br/>
                    <br/>
                    <button className="btn btn-success btn-md mybtn" disabled={progress !== null && progress < 100} > Add</button>
                </Form>
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


