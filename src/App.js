import React, { useEffect } from "react";

export default function App() {
  const [repositores, setRepositories] = React.useState([]);

  useEffect(async () => {
    const response = await fetch(
      "https://api.github.com/users/lucasptcastro/repos"
    );
    const data = await response.json();

    setRepositories(data);
  }, []);

  useEffect(() => {
    const filtered = repositores.filter((repo) => repo.favorite);

    document.title = `Você tem ${filtered.length} favoritos.`;
  }, [repositores]);

  function handleFavorite(id) {
    const newRepositories = repositores.map((repo) => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });
    setRepositories(newRepositories);
  }

  return (
    <ul>
      {repositores.map((repo) => (
        <li key={repo.id}>
          {repo.name} {repo.favorite && <span>(Favorito)</span>}
          <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
        </li>
      ))}
    </ul>
  );
}
