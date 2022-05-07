import React, { useState, useEffect } from "react";
import axios from "axios";

const Repo = ({ repo, handleLanguage }) => {
  // define expanded state to show Readme file in the current page
  // (to avoid create another route for a repo)
  const [expanded, setExpanded] = useState(false);
  const [readme, setReadme] = useState('');

  useEffect(() => {
    // fetch README.md of repo if it's available
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
          {/* Not sure where are author and message for a commit */}
          <p><strong>Most recent commit date: </strong>{repo.updated_at}</p>
          {readme && <p><strong>README.md: </strong>{readme}</p>}
        </div>
      )}
    </div>
  );
};

export default Repo;
