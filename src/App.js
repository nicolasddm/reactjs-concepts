import React, { useState, useEffect } from "react";
import api from './services/api';

import Header from './components/Header';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    const auxRepositories = repositories;
    auxRepositories.splice(repositoryIndex, 1);

    setRepositories([...auxRepositories]);
  }

  return (
    <div>
      <Header title="Repositories" />
      
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            { repository.title }
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
