import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { sortByDate } from '../helper/helpers';
import Repo from './Repo';

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

  // useEffect(() => {
  //   async function showReadme(repoName) {
  //     try {
  //       const result = await axios.get(`https://raw.githubusercontent.com/${repoName}/master/README.md`);
  //       console.log('readme:', result)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   showReadme()
  // }, [])

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
