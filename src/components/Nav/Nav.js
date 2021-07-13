import IconTwitch from "./icon-twitch.svg";
import IconSearch from "./icon-search.svg";
import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          <img src={IconTwitch} alt="icon de Twitch" />
        </Link>
        <Link to="/">
          <p>Parcourir</p>
        </Link>
      </div>

      <form className="nav__form">
        <input type="text" placeholder="Rechercher" />
        <div className="nav__form--container-icon">
          <img src={IconSearch} alt="icon de recherche" />
        </div>
      </form>
    </nav>
  );
}
