import React, {Component} from 'react';
import Toastify from "toastify-js";

function ValidData(message, bool){
    if (bool){
        Toastify({text: message, duration: 3000, style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)", borderRadius: "20px"}}).showToast();
        console.log("true")
    }
    else{
        Toastify({text: message, duration: 3000, style: {
                background: "linear-gradient(to right, #fe4848, #cb0b34)", borderRadius: "20px"}}).showToast();
        console.log("false")
    }
}

export default ValidData;