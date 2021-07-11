import React, { useState, useEffect } from "react";
import api from "../api";
import { useParams } from "react-router-dom";

export default function GameStreams() {
  let { slug } = useParams();

  const [infosGame, setInfosGame] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/games?name=${slug}`
      );

      const dataArray = result.data.data[0];

      setInfosGame(dataArray);
    };
    //https://static-cdn.jtvnw.net/ttv-boxart/Grand%20Theft%20Auto%20V-142x189.jpg
    fetchData();
  }, []);
  return (
    <div className="gameStreams">
      <div className="gameStreams__container">
        <div className="gameStreams__container--img">
          <img
            src="https://images.unsplash.com/photo-1622495965803-41b00aa505ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=925&q=80"
            alt="cover du jeu"
          />
        </div>
        <div className="gameStreams__container--infos">
          <h2>Grand Theft Auto V</h2>
          <p>
            <span>34,7k</span>spectateurs
          </p>
        </div>
      </div>

      {/* <div className="topStreams__container">
        <div className="topStream">
          <div className="topStream--container">
            <div className="topStream__container--thumbnail">
              <img
                src="https://images.unsplash.com/photo-1622495965803-41b00aa505ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=925&q=80"
                alt="aperçu du live"
              />
              <div className="topStream__container--views">345 spectateurs</div>
            </div>
            <div className="topStream__container">
              <div className="topStream__container--logo">
                <img
                  src="https://images.unsplash.com/photo-1622495965803-41b00aa505ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=925&q=80"
                  alt="logo du streamer"
                />
              </div>
              <div className="topStream__container--infos">
                <h5>Valorant</h5>
                <p>Axel</p>
                <p>GTA 5</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
