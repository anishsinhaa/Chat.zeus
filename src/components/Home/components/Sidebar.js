import React from "react";
import { Chats } from "./Chats.js";
import Navbar from "./Navbar.js";
import { Search } from "./Search.js";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};
