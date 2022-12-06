import React, {useContext, useState} from "react";
import Header from "../header";
import Particle from "../styles/Particle";
import '../../App.css'
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../UI/firebaseConfig";
import {Context} from "../UI/firebaseConfig"


const Hello = () => {
    const [value, setValue] = useState('')

    return(
        <>
            <Header/>
            <div className="bg-image" >
                <Particle/>
                <div className={"center-blur"}>
                    <div>
                        <h3 className={"words-color"}>Enter your username</h3>
                        <form className={"form-style"}>
                            <p>
                                <label>Store username</label><br/>
                                <input type="text" value={value} onChange={event => setValue(event.target.value)} maxLength="8" placeholder="Enter username..."  required />
                            </p>
                            <p><span>https://payit.com/<span></span>{value}</span></p>
                            <button id="sub_btn"  >Enter</button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Hello;