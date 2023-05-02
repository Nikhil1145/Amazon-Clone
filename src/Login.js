import React, { useState } from "react";
import "./Login.css";
import { Link , useNavigate } from "react-router-dom";
import { auth } from "./firebase";
function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn=(e)=>{
    e.preventDefault();

    auth.signInWithEmailAndPassword(email , password).then(auth =>{
      navigate("/");
    }).catch(error =>alert(error.message))
  }
  const register = (e)=>{
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email , password).then((auth)=>{
      console.log(auth)
      if(auth){
        navigate('/');
      }
    }).catch(error =>alert(error.message))
  }
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={signIn} className="login__signInButton">Sign-in</button>
        </form>

        <p>
          By Signing-in you agree to Amazon's Conditions of use & sale. Please
          see our privacy Notice , out Cookies notice and out Interest-Based ads
          Notice
        </p>

        <button onClick={register} className="login__registerButton">
          Create Your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
