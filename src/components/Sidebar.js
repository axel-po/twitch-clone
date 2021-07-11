import api from "../api";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [topStreams, setTopStreams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //Call api for streams
      const result = await api.get("https://api.twitch.tv/helix/streams");
      let dataArray = result.data.data;

      //Create array gameIDs with stream id
      let gameIDs = dataArray.map((stream) => {
        return stream.game_id;
      });
      //Create array userIDs with user id
      let userIDs = dataArray.map((stream) => {
        return stream.user_id;
      });

      //Basic of url
      let baseUrlGames = "https://api.twitch.tv/helix/games?";
      let baseUrlUser = "https://api.twitch.tv/helix/users?";

      let queryParamsGame = "";
      let queryParamsUser = "";

      gameIDs.map((id) => {
        return (queryParamsGame = queryParamsGame + `id=${id}&`);
      });
      userIDs.map((id) => {
        return (queryParamsUser = queryParamsUser + `id=${id}&`);
      });

      //url final
      let fullUrlGames = baseUrlGames + queryParamsGame;
      let fullUrlUsers = baseUrlUser + queryParamsUser;

      //call api
      let gamesNames = await api.get(fullUrlGames);
      let getUsers = await api.get(fullUrlUsers);

      //data final
      let gamesNameArray = gamesNames.data.data;
      let usersArray = getUsers.data.data;

      let finalArray = dataArray.map((stream) => {
        stream.gameName = "";
        stream.truePic = "";
        stream.login = "";

        gamesNameArray.forEach((name) => {
          usersArray.forEach((user) => {
            if (stream.user_id === user.id && stream.game_id === name.id) {
              stream.truePic = user.profile_image_url;
              stream.gameName = name.name;
              stream.login = user.login;
            }
          });
        });
        return stream;
      });
      setTopStreams(finalArray.slice(0, 10));
    };
    fetchData();
  }, []);

  return (
    <div className="sidebar">
      <h5>Chaines recommandées</h5>

      {topStreams.map((stream, index) => (
        <Link
          key={index}
          className="sidebar__container--channel"
          to={{
            pathname: `/live/${stream.user_login}`,
          }}
        >
          <img src={stream.truePic} alt="logo du streamers" />
          <div className="channel__container--info">
            <h6>{stream.user_name}</h6>
            <p className="game-name">{stream.gameName}</p>
            <p className="viewers">{stream.viewer_count}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
