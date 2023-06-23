import { useState } from "react";
import "../style.scss";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

export const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  //handle login/sign-in
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/')
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="Main-Container">
      <div className="form-container">
        <span className="logo">CHAT.zeus</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>SIGN IN</button>
          {err && <span style={{color:"red"}}>Something went wrong</span>}
        </form>
        <p>
          Don't have an Account? <Link to="/Register">SIGN UP</Link>
        </p>
      </div>
    </div>
  );
};
