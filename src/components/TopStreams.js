import React, { useState, useEffect } from "react";
import Stream from "./Stream";
import api from "../api";
import { Link } from "react-router-dom";

export default function TopStreams() {
  const [channels, setChannels] = useState([]);

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
        let newUrl = stream.thumbnail_url
          .replace("{width}", "440")
          .replace("{height}", "248");
        stream.thumbnail_url = newUrl;
        return stream;
      });
      setChannels(finalArray.slice(0, 9));
    };
    fetchData();
  }, []);
  return (
    <div className="topStreams">
      <h2>Chaînes live qui pourraient vous plaire</h2>

      <div className="topStreams__container">
        {channels.map((channel, index) => (
          <Link
            key={index}
            className="topStream"
            to={{
              pathname: `/live/${channel.login}`,
            }}
          >
            <div className="topStream--container">
              <div className="topStream__container--thumbnail">
                <img src={channel.thumbnail_url} alt="aperçu du live" />
                <div className="topStream__container--views">
                  {channel.viewer_count} spectateurs
                </div>
              </div>
              <div className="topStream__container">
                <div className="topStream__container--logo">
                  <img src={channel.truePic} alt="logo du streamer" />
                </div>
                <div className="topStream__container--infos">
                  <h5>{channel.title}</h5>
                  <p>{channel.user_name}</p>
                  <p>{channel.gameName}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {/* <div className="r">Afficher plus</div> */}
      </div>
    </div>
  );
}
