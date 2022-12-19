import React, {Component, useEffect, useState} from 'react';
import "./styles/ModalStyle.css"
import {Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "./UI/firebaseConfig";
import {addDoc, collection, serverTimestamp, setDoc, doc} from "firebase/firestore";
import ValidData from "./ValidData";


const Modal =({open,close, title, img, price, description, useremail, userUid, handleDelete, username, id}) => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [count, setCount] = useState(1)
    const buyeruid = user.uid;
    if (!open) return null;
    function increment(){
        setCount(count + 1)
    }
    function decrement(){
        if(count > 1){
            setCount(count - 1)
        }
    }


    const submitCart = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, "carts"), {
            title,
            description,
            price,
            id,
            username,
            img,
            userUid,
            buyeruid,
            count,
            timestamp: serverTimestamp()
        })
        ValidData('Your product successfully added!', true)
    }

        return (
            <div className='overlay modalBack'>
                <div className='modalContainer'>
                    <Image src={img.img} width="350px" height="350px"/>
                    <div className='modalRight '>
                        <button className='closeBtn' onClick={close}>
                            X
                        </button>
                        <div className='content'>
                            <p>Title: {title}</p>
                            <p>Description: {description}</p>
                            <p>Price: {price} $</p>
                            <p>Seller contacts: {useremail} </p>
                            <div hidden={userUid == user.uid}>
                                <button className="counterButton" onClick={decrement}>-</button>
                                <label>qty: {count}</label>
                                <button className="counterButton" onClick={increment}>+</button>
                            </div>
                        </div>
                        <div className='btnContainer'>
                            <button className='btnPrimary' hidden={userUid !== user.uid}
                                    onClick={() => navigate(`/update/${id}`)}>
                                <span className='bold'>Update</span>
                            </button>
                            <button className='btnDelete' hidden={userUid !== user.uid}
                                    onClick={() => handleDelete(id)}>
                                <span className='bold'>Delete</span>
                            </button>
                            <button className='btnPrimary' hidden={userUid == user.uid} onClick={submitCart}>
                                <span className='bold'>Add to cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };






export default Modal;




