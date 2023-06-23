import "../style.scss";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import addimage from "../images/addimage.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export const Register = () => {
  const [err, setErr] = useState(false);
  const navigate=useNavigate();

  //handle sign up 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    if (password.length>5)
    {try {
      //   //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db,"userChats",res.user.uid),{});
            navigate("/")


          } catch (err) {
            console.log(err);
            setErr(true);
          }
        });
      });
    } catch (err) {
      setErr(true);
    }
  }
     else{
    alert("Password should be atleast 6 characters long")
  }
  }
 

  return (
    <div className="Main-Container">
      <div className="form-container">
        <span className="logo">CHAT.zeus</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file" style={{ textAlign: "left" }}>
            <img
              src={addimage}
              style={{ width: "30px" }}
              alt="add user avatar"
            />
            Add Avatar
          </label>

          <button>SIGN UP</button>
          {err && <span style={{color:"red"}}>Something went wrong</span>}
        </form>
        <p>
          Already have an Account? <Link to="/">SIGN IN</Link>
        </p>
      </div>
    </div>
  );
};
