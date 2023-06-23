import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase-config";
import { AuthContext } from "../../../Context/AuthContext";

export const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  //Enter Key Function
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  //Handle User Search
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  //Handle Chat Select
  const handleSelect = async () => {
    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    //check if chat already exists between the users, if not create new one
    try {
      const res = await getDoc(doc(db, "chats", combinedID));

      if (!res.exists()) {
        //create chat in chats collection
        await setDoc(doc(db, "chats", combinedID), { messages: [] });

        //create userChats
        await updateDoc(doc(db, "userChats", currentUser.uid),{
          [combinedID+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedID+".date"]:serverTimestamp()
        });
        await updateDoc(doc(db, "userChats", user.uid),{
          [combinedID+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedID+".date"]:serverTimestamp()
        });
      }
    } catch (err) {
      setErr(true);
    }
    setUser(null);
    setUserName("")
  };

  return (
    <div className="search">
      <div className="search-form">
        <input
          placeholder="Find a User"
          type="text"
          onKeyDown={handleKey}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
        />
      </div>
      {err && <span>USER NOT FOUND</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="user" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
