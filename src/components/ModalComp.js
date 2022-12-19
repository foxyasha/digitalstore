import React, {Component, useEffect, useState} from 'react';
import "./styles/ModalStyle.css"
import {Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "./UI/firebaseConfig";
import {addDoc, collection, serverTimestamp, setDoc, doc} from "firebase/firestore";
import ValidData from "./ValidData";


const Modal =({open,close, title, img, price, description, useremail, userUid, handleDelete,username, id}) => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const buyeruid = user.uid ;
    if (!open) return null;
    var amount = 0;
    function plus(){
        return <p>qty: {amount}</p>
        console.log("+", amount)
    }
    function minus(){

        console.log("-", amount)
    }


    const submitCart = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, "cart"), {
            title,
            description,
            price,
            id,
            username,
            img,
            userUid,
            buyeruid,
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
                                <p id="qty">qty: {amount}</p>
                                <button onClick={plus}>+</button>
                                <button style={{marginLeft:"20px"}} onClick={minus}>--</button>
                            </div>
                        </div>
                        <div className='btnContainer'>
                            <button className='btnPrimary' hidden={userUid !== user.uid}
                                    onClick={() => navigate(`/update/${id}`)}>
                                <span className='bold'>Update</span>
                            </button>
                            <button className='btnOutline' hidden={userUid !== user.uid}
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




