
import axios from "axios";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";


const NavBar = ({ token }) => {
    const handleCreate = async () => {
        const lobbyTitle = window.prompt("Enter the name of your lobby");
        
        if (!lobbyTitle) return;
        try {
            console.log(lobbyTitle)
        const response = await axios.post("https://locker-room-19eb97f5c50f.herokuapp.com/api/create-lobby", {
            title: lobbyTitle
            }, {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            }
            });
            console.log(response.data);
            alert('You have successfully created a lobby');
            window.location.reload()
        } catch (error) {
            console.log(error);
            error.message.includes(403) && alert('You need to log in to create a lobby') 
        }
    };
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert('Hope to see you back soon!');
        window.location.assign('/');
    }
    const showAllUsers = async () => {
        try {
            const response = await axios.get("https://locker-room-19eb97f5c50f.herokuapp.com/api/all-members", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const users = response.data;
          
            alert(`All users: ${users.map(user => user.username)}`);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <nav className="bg-indigo-800 flex justify-end fixed z-[50] w-full bg-opacity-90 drop-shadow-lg">
      <div className="flex items-center justify-end mr-6">
        <button onClick={handleCreate} className="bg-sky-700 text-white font-semibold rounded px-4 py-2 m-3 cursor-pointer">Create Lobby</button>
        <button onClick={showAllUsers} className="bg-sky-700 text-white font-semibold rounded px-4 py-2 m-3 cursor-pointer">See all users</button>
        <button onClick={handleLogOut} className="bg-sky-700 text-white font-semibold rounded px-4 py-2 m-3 cursor-pointer">Log out</button>
      </div>
    </nav>
  );
};
export default NavBar;

NavBar.propTypes = {
    token: PropTypes.string,
  };