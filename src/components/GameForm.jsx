import { useEffect, useState } from "react";

export default function GameForm({ onSubmit, onCancel, game }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [players, setPlayers] = useState("");
  const [location, setLocation] = useState("");
  const [playtime, setPlaytime] = useState("");
  const [image, setImage] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (game) {
      game.title && setTitle(game.title); // if user.name is true, set the name state with the user.name value
      game.genre && setGenre(game.genre); // if user.title is true, set the title state with the user.title value
      game.players && setPlayers(game.players); // if user.mail is true, set the mail state with the user.mail value
      game.image && setImage(game.image); // if user.image is true, set the image state with the user.image value
      game.language && setLanguage(game.language);
      game.description && setDescription(game.description);
      game.playtime && setPlaytime(game.playtime);
      game.location && setLocation(game.location);
    }
  }, [game]);

  function handleOnSubmit(event) {
    event.preventDefault();

    // validate the form
    if (!title || !genre) {
      alert("Please fill out all the fields");
      return;
    } else if (!image) {
      alert("Please paste an image URL");
      return;
    } else if (!image.startsWith("http")) {
      alert("Please paste a valid image URL");
      return;
    }

    const game = {
      // key/name: value from state,
      title: title,
      genre: genre,
      players: players,
      image: image,
      language: language,
      location: location,
      description: description,
      playtime: playtime,
    };
    onSubmit(game);
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        placeholder="Input game title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="">Description</label>
      <input
        id="description"
        type="text"
        value={description}
        placeholder="Input game description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="">Location</label>
      <input
        id="location"
        type="text"
        value={location}
        placeholder="Input game location"
        onChange={(e) => setLocation(e.target.value)}
      />
      <label htmlFor="">Playtime</label>
      <input
        id="playtime"
        type="text"
        value={playtime}
        placeholder="Input game playtime"
        onChange={(e) => setPlaytime(e.target.value)}
      />
      <label htmlFor="title">Genre</label>
      <input
        id="genre"
        type="text"
        value={genre}
        placeholder="Input game genre"
        onChange={(e) => setGenre(e.target.value)}
      />
      <label htmlFor="players">Players</label>
      <input
        id="players"
        type="text"
        value={players}
        placeholder="Input amount of players"
        onChange={(e) => setPlayers(e.target.value)}
      />
      <label htmlFor="language">Language</label>
      <input
        id="language"
        type="text"
        value={language}
        placeholder="Input game language"
        onChange={(e) => setLanguage(e.target.value)}
      />
      <label htmlFor="mail">Image URL</label>
      <input
        type="url"
        value={image}
        placeholder="Paste image url"
        onChange={(e) => setImage(e.target.value)}
      />
      <label htmlFor="image-preview"></label>
      <img
        id="image-preview"
        className="image-preview"
        src={
          image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"
        }
        alt="Choose"
        onError={(e) =>
          (e.target.src =
            "https://placehold.co/600x400?text=Error+loading+image")
        }
      />
      <div className="btns">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button>{game ? "Save" : "Create"}</button>
      </div>
    </form>
  );
}
