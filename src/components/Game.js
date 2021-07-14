import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Game({ gameName, gameId, cover }) {
  const [totalViews, setTotalViews] = useState(0);
  useEffect(() => {
    //Get total of views
    const fetchData = async () => {
      const getAllStreams = await api.get(
        `https://api.twitch.tv/helix/streams?game_id=${gameId}`
      );
      const dataArray = getAllStreams.data.data;
      let totalViewers = dataArray.reduce((acc, val) => {
        return acc + val.viewer_count;
      }, 0);

      if (gameName === dataArray[0].game_name) {
        setTotalViews(totalViewers);
      }
    };
    fetchData();
  }, []);
  return (
    <Link
      className="game"
      to={{
        pathname: `/game/${gameName}`,
        state: {
          gameID: { gameId },
        },
      }}
    >
      <img src={cover} alt="cover du jeux" />
      <h4>{gameName}</h4>
      <p>{totalViews} spectateurs</p>
    </Link>
  );
}
