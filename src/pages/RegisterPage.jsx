import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      alert("Passwords do not match");
      return;
    }
    console.log(username, email, password, confirmPassword);
    try {
      const response = await axios.post("https://locker-room-19eb97f5c50f.herokuapp.com/api/register", {
        username: username,
        email: email,
        password: password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(response.data);
      alert('You have successfully created a user. Please login to access the chat.');
      navigateTo('/');
    } catch (error) {
      console.log(error);
    }
  }

    return (
      <div className="h-[100vh] flex justify-center items-center">
        <form className="flex flex-col justify-center p-10 h-[500px] w-[400px] bg-white/20 rounded-3xl drop-shadow-xl">        
          <h1 className="text-white text-3xl font-bold text-center my-4 drop-shadow-lg">Become a member!</h1>
          <input type="text" className="p-2 rounded text-black/80 font-medium my-3 drop-shadow-md" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="email" className="p-2 rounded text-black/80 font-medium my-3 drop-shadow-md" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" className="p-2 rounded text-black/80 font-medium my-3 drop-shadow-md" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" className="p-2 rounded text-black/80 font-medium my-3 drop-shadow-md" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <div className="text-white font-bold drop-shadow-md"><input type="checkbox" className="mr-1" required ></input>I accept the <a href="/terms-of-service" className="underline">terms of service</a></div>
          <button type="submit" onClick={handleSubmit} className="bg-indigo-700 text-white p-2 rounded font-semibold my-6 drop-shadow-md">REGISTER</button>
          <p className="text-white font-semibold text-center">Already a member? <a href="/" className="underline text-sky-200">Login</a></p>
        </form>
          
      </div>
    );
  };
  
  export default RegisterPage;
  