import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { sortByDate } from '../helper/helpers';
import Repo from './Repo';

const Repos = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    //fetch repos from backend
    axios.get('http://localhost:4000/repos').then(response => {
      setRepos(response.data);
    }).catch(e => {
      console.log(e);
    })
  }, []);

  const handleLanguage = (e) => {
    //filter repos by selected language
    const filteredRepos = repos.filter(repo => repo.language === e.target.value);
    setRepos(filteredRepos);
  }


  return (
    <div>
      <h1>List Of Repositories</h1>
      {sortByDate(repos).map(repo => (
        <Repo
          key={repo.id}
          repo={repo}
          handleLanguage={handleLanguage}
        />
      ))}
    </div>
  )
}

export default Repos;

