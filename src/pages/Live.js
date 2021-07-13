import React, { useState, useEffect } from "react";
import api from "../api";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import userOutlined from "@iconify/icons-ant-design/user-outlined";
import { Link } from "react-router-dom";

export default function Live() {
  let { slug } = useParams();

  const [infosStream, setInfosStream] = useState([]);
  const [profilImgUser, setProfilImgUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/streams?user_login=${slug}`
      );

      setInfosStream(result.data.data[0]);
    };

    const getImgProfilUser = async () => {
      const data = await api.get(
        `https://api.twitch.tv/helix/users?login=${slug}`
      );
      let urlImgUser = data.data.data[0].profile_image_url;

      setProfilImgUser(urlImgUser);
    };

    fetchData();
    getImgProfilUser();
  }, [slug]);

  return (
    <div className="live">
      <ReactTwitchEmbedVideo height="482px" width="100%" channel={slug} />
      <div className="live__container">
        <div className="live__container--logo">
          <img src={profilImgUser} alt="logo du streamer" />
        </div>
        <div className="live__container--infos">
          <h4>{infosStream.user_name}</h4>
          <p>{infosStream.title}</p>
          <Link
            to={{
              pathname: `/game/${infosStream.game_name}`,
            }}
          >
            <span>{infosStream.game_name}</span>
          </Link>
          <div className="language">{infosStream.language}</div>
          <p className="viewers-live">
            <Icon
              icon={userOutlined}
              style={{ color: "#971311", fontSize: "16px" }}
            />
            {infosStream.viewer_count}
          </p>
        </div>
      </div>
    </div>
  );
}
