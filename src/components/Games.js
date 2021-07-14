import React, { useState, useEffect } from "react";
import api from "../api";
import Game from "./Game";

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("https://api.twitch.tv/helix/games/top");

      let dataArray = result.data.data;
      let pagination = result.data.pagination;

      let finalArray = dataArray.map((game) => {
        let newUrl = game.box_art_url
          .replace("{width}", "285")
          .replace("{height}", "380");

        game.box_art_url = newUrl;
        return game;
      });

      setGames(finalArray);
    };

    fetchData();
  }, []);
  return (
    <div className="games">
      <h2>
        <span>Catégories</span> qui pourraient vous plaire
      </h2>

      <div className="games__container">
        {games.map((game, index) => (
          <Game
            key={index}
            gameName={game.name}
            gameId={game.id}
            cover={game.box_art_url}
          />
        ))}
      </div>
    </div>
  );
}
