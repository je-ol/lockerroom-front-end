import axios from "axios";
import PropTypes from "prop-types";

const AddUser = ({token, currentLobby}) => {
    const handleAdd = async () => {
        console.log(currentLobby);
        const newLobbyMember = prompt("Enter the username of the user you want to add");
        try {
            const response = await axios.post(`https://locker-room-19eb97f5c50f.herokuapp.com/api/lobby/${currentLobby}/add-user`, {
                username: newLobbyMember
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
        console.log(newLobbyMember);
    }
    return (
        <button className="w-[15%] h-full rounded-r-xl font-bold bg-indigo-700/80"
        onClick={handleAdd}>+ | ADD</button>
    );

}
export default AddUser;

AddUser.propTypes = {
    token: PropTypes.string,
    currentLobby: PropTypes.number
  };