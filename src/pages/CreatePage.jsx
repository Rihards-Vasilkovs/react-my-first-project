import { useNavigate } from "react-router-dom";
import GameForm from "../components/GameForm";

export default function CreatePage() {
  const navigate = useNavigate();

  async function createGame(game) {
    game.id = Date.now().toString(); // add the current date as id

    const data = localStorage.getItem("games"); // get data from local storage
    const gamesData = JSON.parse(data) || []; // parse the data from string to javascript array

    gamesData.push(game); // add the new user to the array
    localStorage.setItem("games", JSON.stringify(gamesData)); // save the users array to local storage

    navigate("/"); // navigate to the home page
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Add New Game</h1>
        <GameForm onSubmit={createGame} onCancel={handleCancel} />
      </div>
    </section>
  );
}
