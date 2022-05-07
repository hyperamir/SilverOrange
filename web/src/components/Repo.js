import React, { useState, useEffect } from "react";
import axios from "axios";

const Repo = ({ repo, handleLanguage }) => {
  const [expanded, setExpanded] = useState(false);
  const [readme, setReadme] = useState('');

  useEffect(() => {
    async function showReadme(repoName) {
      try {
        const result = await axios.get(`https://raw.githubusercontent.com/${repoName}/master/README.md`);
        if (result) {
          setReadme(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    showReadme(repo.full_name);
  }, [expanded])

  return (
    <div onClick={() => setExpanded(!expanded)}>
      <p><strong>Repository Name: </strong>{repo.name}</p>
      <p><strong>Description: </strong>{repo.description}</p>
      <p><strong>Language: </strong><button value={repo.language} onClick={e => handleLanguage(e)}>{repo.language}</button></p>
      <p><strong>Forks Count: </strong>{repo.forks_count}</p><br />
      {expanded && (
        <div>
          <h5>MarkDown:</h5>
          {readme && <p>{readme}</p>}
        </div>
      )}
    </div>
  );
};

export default Repo;
