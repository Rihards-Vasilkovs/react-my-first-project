import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import GameDetailPage from "./pages/GameDetailPage";
import GameUpdatePage from "./pages/GameUpdatePage";

function App() {
  return (
    <main className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/games/:id" element={<GameDetailPage />}></Route>
        <Route path="/games/:id/update" element={<GameUpdatePage />} />
      </Routes>
    </main>
  );
}

export default App;
