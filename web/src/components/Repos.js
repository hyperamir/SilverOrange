import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { sortByDate } from '../helper/helpers';

const Repos = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/repos').then(response => {
      setRepos(response.data);
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    })
  }, []);

  const handleLanguage = (e) => {
    const filteredRepos = repos.filter(repo => repo.language === e.target.value);
    setRepos(filteredRepos);
  }

  return (
    <div>
      <h1>List Of Repositories</h1>
      {sortByDate(repos).map(repo => (
        <div key={repo.id}>
          <p><strong>Repository Name: </strong>{repo.name}</p>
          <p><strong>Description: </strong>{repo.description}</p>
          <p><strong>Language: </strong><button value={repo.language} onClick={e => handleLanguage(e)}>{repo.language}</button></p>
          <p><strong>Forks Count: </strong>{repo.forks_count}</p>
        </div>
      ))}
    </div>

  )
}

export default Repos;

 // async function fetchData() {
  //   try {
  //     const result = await axios.get('http://localhost:4000/repos');
  //     console.log(sortByDate(result.data));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);
