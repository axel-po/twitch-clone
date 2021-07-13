import React, { useState, useEffect } from "react";
import api from "../api";
import { useParams, useLocation } from "react-router-dom";
import Stream from "../components/Stream";

export default function GameStreams() {
  let { slug } = useParams();
  let location = useLocation();
  const [infosGame, setInfosGame] = useState([]);
  // const [viewers, setViewers] = useState(0);
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //Get infos of a Games
      const result = await api.get(
        `https://api.twitch.tv/helix/games?name=${slug}`
      );

      const dataArray = result.data.data[0];
      let urlImg = dataArray.box_art_url
        .replace("{width}", "142")
        .replace("{height}", "192");

      dataArray.box_art_url = urlImg;
      setInfosGame(dataArray);

      //Get infos of a streams
      let gameID = location.state.gameID;
      const getAllStreams = await api.get(
        `https://api.twitch.tv/helix/streams?game_id=${gameID}`
      );
      const dataStream = getAllStreams.data.data;
      dataStream.map((stream) => {
        let newUrl = stream.thumbnail_url
          .replace("{width}", "440")
          .replace("{height}", "248");

        stream.thumbnail_url = newUrl;
        return stream;
      });

      //Get Profil Img of users
      let userLogin = dataStream.map((stream) => {
        return stream.user_login;
      });

      let baseUrlUsers = "https://api.twitch.tv/helix/users?";
      let queryParamsUser = "";

      userLogin.map((login) => {
        return (queryParamsUser = queryParamsUser + `login=${login}&`);
      });

      let finalUrl = baseUrlUsers + queryParamsUser;
      let getUsers = await api.get(finalUrl);
      let arrayUsers = getUsers.data.data;

      let finalArray = dataStream.map((stream) => {
        stream.userLogo = "";

        arrayUsers.map((login) => {
          if (login.login === stream.user_login) {
            stream.userLogo = login.profile_image_url;
          }
          return login;
        });

        return stream;
      });

      setStreams(finalArray);
    };
    fetchData();
  }, []);
  return (
    <div className="gameStreams">
      <div className="gameStreams__container">
        <div className="gameStreams__container--img">
          <img src={infosGame.box_art_url} alt="cover du jeu" />
        </div>
        <div className="gameStreams__container--infos">
          <h2>{infosGame.name}</h2>
          <p>
            <span>34,7k</span> spectateurs
          </p>
        </div>
      </div>

      <h2>Toutes les chaînes</h2>

      <div className="topStreams__container">
        {streams.map((stream, index) => (
          <Stream
            key={index}
            login={stream.user_login}
            thumbnail={stream.thumbnail_url}
            viewers={stream.viewer_count}
            logo={stream.userLogo}
            title={stream.title}
            userName={stream.user_name}
            gameName={stream.game_name}
          />
        ))}
      </div>
    </div>
  );
}
