import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Game from "../components/Game";

export default function UpdatePage() {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const navigate = useNavigate();

  function showDeleteDIalog() {
    const shouldDelete = window.confirm(
      `Do you want to delete "${game.title}"?`
    );
    if (shouldDelete) {
      deleteGame();
    }
  }

  async function deleteGame() {
    const data = localStorage.getItem("games");
    const gamesData = JSON.parse(data) || [];
    const updatedGames = gamesData.filter((game) => game.id !== id);
    localStorage.setItem("games", JSON.stringify(updatedGames));
    navigate("/");
  }

  useEffect(() => {
    const data = localStorage.getItem("games"); //get data from local storage
    const gamesData = JSON.parse(data) || []; //parse the data from string to javascript array
    const game = gamesData.find((game) => game.id === id); //finds the game with the id from the params
    console.log(game);
    setGame(game); //set the game state with data from local storage
  }, [id]); //<------ "[id]" is VERY IMPORTANT!

  function showUpdate() {
    navigate(`/games/${id}/update`);
  }

  return (
    <div id="game-page" className="page">
      <div className="container">
        <h1>{game.name}</h1>
        <Game game={game} />
        <div className="btns">
          <button className="btn-cancel" onClick={showDeleteDIalog}>
            Delete game
          </button>
          <button onClick={showUpdate}>Update game</button>
        </div>
      </div>
    </div>
  );
}
