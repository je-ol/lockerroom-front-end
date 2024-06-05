import NavBar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import LobbyCard from "../components/LobbyCard";
import AddUser from "../components/AddUser";
import MemberList from "../components/MemberList";
import PropTypes from 'prop-types';
import { Link} from "react-router-dom";
import ScrollToBottom from 'react-scroll-to-bottom';


const ChatsPage = ({ user }) => {
    const token = localStorage.getItem('token');
    const [lobbies, setLobbies] = useState([]);
    const [currentLobby, setCurrentLobby] = useState();
    const [allMessages, setAllMessages] = useState([{}]);
    const [newMessage, setNewMessage] = useState("");
    if (user === undefined) user = localStorage.getItem('user');
    

    
    useEffect(() => {
        const fetchLobbies = async () => {
            try {
                const response = await axios.get("https://locker-room-19eb97f5c50f.herokuapp.com/api/lobbies", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                setLobbies(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLobbies();
    }, [])

    const handleOpenLobby = async (lobbyId) => {
        try {
            const response = await axios.get(`https://locker-room-19eb97f5c50f.herokuapp.com/api/lobby/${lobbyId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            setAllMessages(response.data.messages);
        } catch (error) {
            console.log(error);
        }
    };

    const handleNewMsg = async () => {
        
        try {
            const response = await axios.post(`https://locker-room-19eb97f5c50f.herokuapp.com/api/lobby/${currentLobby}`, {
                message: newMessage
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            console.log(response.data);
            setNewMessage('');
            handleOpenLobby(currentLobby);
        
        } catch (error) {
            console.log(error);
        }
    }
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleNewMsg(); 
        }
    };
/*     useEffect(() => {
        handleOpenLobby(currentLobby);
    }, [newMessage]) */

  return (
    <>
    <NavBar token={token}/>
    <div className="w-full h-screen flex justify-center items-center text-xl sm:text-sm">
      <div className="w-[70%] h-[86%] flex gap-3 rounded-3xl text-white text-center drop-shadow-xl mt-[4%]">
        <div className="titles flex justify-around text-5xl sm:text-4xl font-bold rotate-180" style={{ writingMode: 'vertical-rl' }}>
            <h2>LOBBIES</h2><h2>MEMBERS</h2>
        </div>
        <div className=" w-[30%] h-[96%] p-3 rounded-2xl bg-indigo-200/20">
            <div className="h-[49%] mb-[2%] flex flex-col overflow-y-scroll p-2 rounded-xl bg-blue-200/20">
                {currentLobby && (<MemberList token={token} currentLobby={currentLobby}/>)}
            </div>
            
            <div className="h-[49%] flex flex-col overflow-y-scroll">
                {lobbies?.map((lobby) => (
                    <div key={lobby.lobby_id} className="flex flex-col gap-5">
                        <div className="flex px-6 my-1 pr-5 items-center w-[96%] h-[100px] rounded-xl bg-indigo-800/60 drop-shadow-md cursor-pointer"     onClick={()  => {
                        setCurrentLobby(lobby.lobby_id);
                        handleOpenLobby(lobby.lobby_id);
                    }}>
                        <div className="w-[60px] h-[60px] bg-white/10 rounded-full mr-4 drop-shadow-md"></div>
                        <p className="text-white/70 font-bold drop-shadow-lg">{lobby?.title}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
        <div className="flex flex-col w-[70%] h-[96%] gap-3 p-3 rounded-2xl bg-indigo-200/10">
            {currentLobby && (
            <>
                <div className="flex items-center w-full h-[10%] rounded-xl bg-indigo-200/10 drop-shadow-md lobby-title">
                    <p className="w-[85%] text-left text-indigo-100 font-bold text-3xl sm:text-xl ml-5 drop-shadow-md ">{lobbies?.find(lobby => lobby.lobby_id === currentLobby)?.title}</p>
                    <AddUser token={token} currentLobby={currentLobby}/>
                </div>
                <div className="flex flex-col justify-end w-full h-[72%] rounded-xl bg-indigo-200/10 drop-shadow-md text-lg sm:text-sm">
                    <ScrollToBottom className="flex flex-col h-[98%]">
                    {allMessages?.map((message, index) => (
                     <div key={index} className={`w-[380px] p-2 m-2 rounded-xl bg-indigo-200/10 drop-shadow-md ${JSON.stringify(message.author) === user ? 'ml-auto bg-emerald-500/20' : 'mr-auto bg-indigo-700/30'}`}>

                            <p>{message.message} - {message.author}</p>
                        </div>
                    ))}
                    </ScrollToBottom>
                </div>
                <form className="flex flex-col justify-between w-full h-[16%] rounded-md drop-shadow-md">
                    <input type="text" className="w-[full] h-[55%] rounded-md bg-white/90 text-black text-center" placeholder="Type your message here..." value={newMessage}
                    onChange={(e)  => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}/>
                    <button type="submit" className="w-[full] h-[38%] rounded-md bg-indigo-700 text-white/90 text-center font-semibold"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNewMsg()}}>SEND</button>
                </form>
            </>
            )}
        </div>

      </div>
    </div>
    </>
  );
};

export default ChatsPage;

ChatsPage.propTypes = {
    currentLobby: PropTypes.number,
    setCurrentLobby: PropTypes.func,
    user: PropTypes.string
  };