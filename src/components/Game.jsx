import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClock } from "@fortawesome/free-solid-svg-icons";

export default function Game({ game }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/games/${game.id}`);
  }

  return (
    <article className="game-card" onClick={handleClick}>
      <div className="gameInfo">
        <div>
          <h2>{game.title}</h2>
          <p>{game.description}</p>
        </div>
        <div>
          <img
            src={
              game.image ||
              "https://placehold.co/600x400?text=Error+loading+image"
            }
            alt={game.title}
          />
        </div>
      </div>
      <div className="gameStats">
        <div>{game.genre}</div>
        <div>{game.language}</div>
        <div>
          <FontAwesomeIcon icon={faClock} /> {game.playtime}
        </div>
        <div>
          <FontAwesomeIcon icon={faUser} /> {game.players}
        </div>
        <div>{game.location}</div>
      </div>
    </article>
  );
}
