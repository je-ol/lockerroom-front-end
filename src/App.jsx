import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LogPage from "./pages/LogPage";
import ChatsPage from "./pages/ChatsPage";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./components/Navbar";


function App() {
  let [user, setUser] = useState(undefined);
  

  return (
    <Routes>
      <Route path="/" element={ !user ? <LogPage setUser={setUser} /> : <ChatsPage user={user} />}  />
      <Route path="/Register" element={<RegisterPage />} />
      <Route path="/Chats" element={<ChatsPage user={user}/>} />
    </Routes>
  );
}

export default App;
