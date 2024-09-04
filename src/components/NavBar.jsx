import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <NavLink to="/">Overview</NavLink>
      <NavLink to="/create">Add</NavLink>
    </nav>
  );
}
