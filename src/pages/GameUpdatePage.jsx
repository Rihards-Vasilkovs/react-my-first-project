import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameForm from "../components/GameForm";

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("games");
    const gamesData = JSON.parse(data) || [];
    setGame(gamesData.find((game) => game.id === id));
  }, [id]); // <--- "[params.id]" VERY IMPORTANT!!!

  async function updateGame(gameToUpdate) {
    const data = localStorage.getItem("games");
    const gamesData = JSON.parse(data) || [];
    // map through the games
    const updatedGames = gamesData.map((game) => {
      // if the game id is the same as the id from the params
      if (game.id === id) {
        return { ...game, ...gameToUpdate }; // return the game with the updated data
      }
      return game; // return the game without updating
    });

    localStorage.setItem("games", JSON.stringify(updatedGames)); // save the games state to local storage
    navigate(`/games/${id}`); // navigate to the game detail page
  }

  function handleCancel() {
    navigate(-1); // go back
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Update</h1>
        <GameForm onSubmit={updateGame} onCancel={handleCancel} game={game} />
      </div>
    </section>
  );
}
