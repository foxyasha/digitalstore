import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Header from "../header";
import Particle from "../styles/Particle";
import '../../App.css'
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../UI/firebaseConfig';
import {useAuthState} from "react-firebase-hooks/auth";
import {setDoc, doc, serverTimestamp} from 'firebase/firestore';
import {db} from '../UI/firebaseConfig'

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/store");
  }, [user, loading]);

  const onSubmit = async (e) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const formDataCopy = {email, username, password }
          delete formDataCopy.password
          formDataCopy.timestamp = serverTimestamp()
          setDoc(doc(db, 'users', user.uid), formDataCopy)
          alert("You are successfully signed up!");
          navigate("/login")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if(errorCode == 'auth/invalid-email'){
            alert("Invalid email!")
          }
          if(errorCode == 'auth/weak-password'){
            alert("Password should be at least 6 characters!")
          }
          if(errorCode == 'auth/email-already-exists'){
            alert("This email already exists!")
          }

        });

  }


  return(

  <>
    <Header/>
    <div className="bg-image" >
      <Particle/>
      <div className={"center-blur"}>
        <div>
          <h3 className={"words-color"}>Create your account</h3>
          <form className={"form-style"} >
            <p>
              <label>Username</label><br/>
              <input type="text" placeholder="Enter username..." onChange={(event)=> setUsername(event.target.value)} required />
            </p>
            <p>
              <label>Email address</label><br/>
              <input type="email" placeholder="Enter email address..." value={email} onChange={(e)=> setEmail(e.target.value)} required />
            </p>
            <p>
              <label>Password</label><br/>
              <input type="password" placeholder="Enter password..." value={password} onChange={(e)=> setPassword(e.target.value)} required />
            </p>
            <p>
              <button id="sub_btn" onClick={onSubmit}>Register</button>
            </p>
          </form>
          <footer>
            <p className="words-color">Already have an account? <Link className="words-color" to="/login">Sign in</Link></p>
            <p><Link className="words-color" to="/">Back to Homepage</Link></p>
          </footer>
        </div>
      </div>
    </div>
  </>

  );
};

export default SignUp;
