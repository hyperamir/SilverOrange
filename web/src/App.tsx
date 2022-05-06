import React, { useEffect } from 'react';
import axios from 'axios';

import './App.css';

export function App() {
  async function fetchData() {
    try {
      const result = await axios.get('http://localhost:4000/repos');
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="App">

    </div>
  );
}
