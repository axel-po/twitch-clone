import axios from "axios";

let api = axios.create({
  headers: {
    "Client-ID": "fzdxolcrp2q55ksdeznrronw7bwh8s",
    Authorization: "Bearer 2ns6j6agk1horfkpnklmhtdf3zjgvz",
  },
});

/*
        CLIENT_ID = fzdxolcrp2q55ksdeznrronw7bwh8s
        REDIRECT = https://127.0.0.1/

        LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token

        LIEN REMPLI = https://id.twitch.tv/oauth2/authorize?client_id=fzdxolcrp2q55ksdeznrronw7bwh8s&redirect_uri=https://127.0.0.1/&response_type=token
*/

export default api;
