import React from "react";
import { Link } from "react-router-dom";

export default function Stream({
  login,
  thumbnail,
  viewers,
  logo,
  title,
  userName,
  gameName,
}) {
  return (
    <Link
      className="topStream"
      to={{
        pathname: `/live/${login}`,
      }}
    >
      <div className="topStream--container">
        <div className="topStream__container--thumbnail">
          <img src={thumbnail} alt="aperçu du live" />
          <div className="topStream__container--views">
            {viewers} spectateurs
          </div>
        </div>
        <div className="topStream__container">
          <div className="topStream__container--logo">
            <img src={logo} alt="logo du streamer" />
          </div>
          <div className="topStream__container--infos">
            <h5>{title}</h5>
            <p>{userName}</p>
            <p>{gameName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
