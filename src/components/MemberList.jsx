import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const MemberList = ({ token, currentLobby }) => {
    const [lobbyMembers, setLobbyMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`https://locker-room-19eb97f5c50f.herokuapp.com/api/lobby/${currentLobby}/members`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                setLobbyMembers(response.data.members);
            } catch (error) {
                console.log(error);
            }
            
        }; fetchMembers()
    }, [currentLobby, token]);

    return (
        <>
        {lobbyMembers.map((member, index) => (
            <p key={index} className="text-indigo-800/80 font-bold bg-indigo-100 rounded-lg p-1 my-1">{member.username}</p>
        ))}
        </>
    )
}
export default MemberList;

MemberList.propTypes = {
    token: PropTypes.string,
    currentLobby: PropTypes.number
};