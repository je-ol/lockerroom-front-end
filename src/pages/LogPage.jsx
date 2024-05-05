import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";


const LogPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch("https://locker-room-19eb97f5c50f.herokuapp.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          data.error
          ? (alert('Wrong email or password'))
          : (
              alert('You successfully logged in'),
              (document.cookie = `token=${data.token}`),
              localStorage.setItem("token", data.token),
              localStorage.setItem("user", JSON.stringify(data?.username)),
              navigateTo('/Chats')
            );
          data.username && setUser(JSON.stringify(data.username));
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <form className="flex flex-col justify-center p-10 h-[400px] w-[400px] bg-white/20 rounded-3xl drop-shadow-xl">        
        <h1 className="text-white text-4xl font-bold text-center my-4 drop-shadow-lg">Welcome back!</h1>
        <input type="email" className="p-2 rounded text-black/80 font-medium my-4 drop-shadow-md" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <input type="password" className="p-2 rounded text-black/80 font-medium my-4 drop-shadow-md" placeholder="password" value={password} onChange={(e)  => setPassword(e.target.value)}/>
        <a href="./reset-password" className="text-white font-bold underline drop-shadow-md">Forgot your password?</a>
        <button type="submit" onClick={handleSubmit}
        className="bg-indigo-700 text-white p-2 rounded font-semibold my-6 drop-shadow-md">LOGIN</button>
        <p className="text-white font-semibold text-center">Not a member yet? <a href="/Register" className="underline text-sky-200">Register</a></p>
      </form>
        
    </div>
  );
};

export default LogPage;
LogPage.propTypes = {
  setUser: PropTypes.func,
};
