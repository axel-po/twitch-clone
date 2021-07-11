import React, { useState, useEffect } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("https://api.twitch.tv/helix/games/top");

      let dataArray = result.data.data;
      let finalArray = dataArray.map((game) => {
        let newUrl = game.box_art_url
          .replace("{width}", "153")
          .replace("{height}", "204");

        game.box_art_url = newUrl;
        return game;
      });

      setGames(finalArray.splice(0, 10));
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
          <Link
            key={index}
            className="game"
            to={{
              pathname: `/game/${game.name}`,
            }}
          >
            <img src={game.box_art_url} alt="cover du jeux" />
            <h4>{game.name}</h4>
            <p>65,7 k spectateurs</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
