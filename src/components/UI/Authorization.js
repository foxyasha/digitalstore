import React, {Component, useState} from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from './firebaseConfig';

export function Authorization(){

   const [registerEmail, setRegisterEmail] = useState("");
   const [registerPassword, setRegisterPassword] = useState("");
   const [loginEmail, setLoginEmail] = useState("");
   const [loginPassword, setLoginPassword] = useState("");


    const register = async () =>{
        try{
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user)
        }   catch (error){
            console.log(error.message);
        }

    };

    const login = async () =>{

    };

    const logout = async () =>{

    };
}
