import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/UI/AppRouter";



function App() {
  return (
<BrowserRouter>
  <AppRouter/>
</BrowserRouter>

  );
}

export default App;

/***<Header/>
 <div className="bg-image"/>
 <Particle/>***/