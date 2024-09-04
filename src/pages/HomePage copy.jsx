import { useEffect, useState } from "react";
import User from "../components/User";

export default function HomePage() {
  const [users, setUsers] = useState([]); //state to handle the data of (users)
  const [searchTerm, setSearchTerm] = useState(""); // state to handle the search term
  const [filter, setFilter] = useState(""); //state to handle filter
  const [sort, setSort] = useState("name"); //state to handle the sorting

  useEffect(() => {
    getUsers();

    async function getUsers() {
      const data = localStorage.getItem("users"); //get data from local storage

      let usersData = [];

      if (data) {
        //if data exists in local storage
        usersData = JSON.parse(data); //parses data from string to javascript array
      } else {
        //if data does not exist in local storage, fetch the data from the API
        usersData = await fetchUsers(); // fetch the data from the API
      }

      console.log(usersData);

      setUsers(usersData); //set the users state with the data from local storage
    }
  }, []);

  async function fetchUsers() {
    const response = await fetch(
      "https://raw.githubusercontent.com/cederdorff/race/master/data/users.json"
    );

    const data = await response.json(); // parse the data from string to javascript array
    localStorage.setItem("users", JSON.stringify(data)); //save the data to local storage
    return data; //return the data
  }

  let filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const titles = [...new Set(users.map((user) => user.title))]; //gets all the unique titles from the array of users
  console.log(titles);

  if (filter != "") {
    filteredUsers = filteredUsers.filter((user) => user.title === filter); //filter the users array
  }

  filteredUsers.sort((user1, user2) => user1[sort].localeCompare(user2[sort]));

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
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">select language</option>
            {titles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by
          <select name="sort-by" onChange={(e) => setSort(e.target.value)}>
            <option value="name">Title</option>
            <option value="title">Genre</option>
            <option value="mail">Players</option>
          </select>
        </label>
      </form>
      <section className="grid">
        {filteredUsers.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </section>
    </section>
  );
}
