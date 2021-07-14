import { useState } from "react";
import IconTwitch from "./icon-twitch.svg";
import IconSearch from "./icon-search.svg";
import { Link } from "react-router-dom";
export default function Nav() {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleKeyPress = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <nav>
        <div className="nav__logo">
          <Link to="/">
            <img src={IconTwitch} alt="icon de Twitch" />
          </Link>
          <Link to="/">
            <p>Parcourir</p>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="nav__form">
          <input
            required
            value={searchInput}
            onChange={(e) => handleKeyPress(e)}
            type="text"
            placeholder="Rechercher"
          />
          <Link
            className="nav__form--container-icon"
            to={{
              pathname: `/search/${searchInput}`,
            }}
          >
            <button>
              <img src={IconSearch} alt="icon de recherche" />
            </button>
          </Link>
        </form>
      </nav>
    </>
  );
}
