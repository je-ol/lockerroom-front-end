import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LobbyCard = ({ lobby }) => {
    return (
        <div className="flex px-6 items-center w-full h-[100px] rounded-xl bg-indigo-800/60 drop-shadow-md cursor-pointer">
            <div className="w-[60px] h-[60px] bg-white/10 rounded-full mr-4 drop-shadow-md"></div>
            <p className="text-white/70 text-base font-bold drop-shadow-lg">{lobby?.title}</p>
        </div>
    
    )
}
export default LobbyCard;

LobbyCard.propTypes = {
    lobby: PropTypes.object,
  };