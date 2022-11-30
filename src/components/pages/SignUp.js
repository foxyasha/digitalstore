import React from "react";
import { Link } from "react-router-dom";
import Header from "../header";
import Particle from "../styles/Particle";
import '../../App.css'

const SignUp = () => {
  return(

  <>
    <Header/>
    <div className="bg-image" >
      <Particle/>
      <div className={"center-blur"}>
        <div>
          <h3 className={"words-color"}>Create your account</h3>
          <form action="/home" className={"form-style"}>
            <p>
              <label>Username</label><br/>
              <input type="text" name="first_name" required />
            </p>
            <p>
              <label>Email address</label><br/>
              <input type="email" name="email" required />
            </p>
            <p>
              <label>Password</label><br/>
              <input type="password" name="password" requiredc />
            </p>
            <p>
              <button id="sub_btn" type="submit">Register</button>
            </p>
          </form>
          <footer>
            <p><Link className="words-color" to="/login">Sign in</Link></p>
            <p><Link className="words-color" to="/">Back to Homepage</Link>.</p>
          </footer>
        </div>
      </div>
    </div>


  </>


  );
};

export default SignUp;