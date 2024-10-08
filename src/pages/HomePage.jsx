import { useEffect, useState } from "react";
import Game from "../components/Game";

export default function HomePage() {
  const [games, setGames] = useState([]); //state to handle the data of (games)
  const [searchTerm, setSearchTerm] = useState(""); // state to handle the search term
  const [filterLanguage, setFilterLanguage] = useState(""); //state to handle filter
  const [filterGenre, setFilterGenre] = useState(""); //state to handle the sorting

  useEffect(() => {
    getGames();

    async function getGames() {
      const data = localStorage.getItem("games"); //get data from local storage

      let gamesData = [];

      if (data) {
        //if data exists in local storage
        gamesData = JSON.parse(data); //parses data from string to javascript array
      } else {
        //if data does not exist in local storage, fetch the data from the API
        console.log("Could not find the games data");
        gamesData = await fetchGames();
        console.log("Loaded games data");
      }

      console.log(gamesData);

      setGames(gamesData); //set the games state with the data from local storage
    }
  }, []);

  async function fetchGames() {
    const response = await fetch(
      "https://raw.githubusercontent.com/Rihards-Vasilkovs/react-my-first-project/main/src/assets/games.json"
    );

    const data = await response.json(); // parse the data from string to javascript array
    localStorage.setItem("games", JSON.stringify(data)); //save the data to local storage
    return data; //return the data
  }

  let filteredGames = games
    .filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((game) => filterLanguage === "" || game.language === filterLanguage)
    .filter((game) => filterGenre === "" || game.genre === filterGenre);

  const languages = [...new Set(games.map((game) => game.language))];
  const genres = [...new Set(games.map((game) => game.genre))];

  return (
    <section className="page">
      <form className="grid-filter" role="search">
        <label>
          Search by title{" "}
          <input
            placeholder="Search"
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <label>
          Filter by language{" "}
          <select onChange={(e) => setFilterLanguage(e.target.value)}>
            <option value="">select language</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </label>
        <label>
          Filter by language{" "}
          <select onChange={(e) => setFilterGenre(e.target.value)}>
            <option value="">select genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>
      </form>
      <section className="grid">
        {filteredGames.map((game) => (
          <Game key={game.id} game={game} />
        ))}
      </section>
    </section>
  );
}
