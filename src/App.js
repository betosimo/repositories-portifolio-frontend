import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
    //console.log(repositories);

  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories',
    {
       
        title: `Titulo ${Date.now()}`, 
        url: "http://github.com/betosimos", 
        techs:["Node", "Express", "TypeScript"]
        
      
    });
    const repository = response.data;
    console.log(repository.id);
    
    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch (err) {
      alert("Erro ao deletar ");
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(
          repository =>  <li key={repository.id}>{repository.title}

            <button  onClick={() => handleRemoveRepository(repository.id)}>
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
