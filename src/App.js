import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './bajaj.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    document.title = '21BCE0636'; // Set the tab title
  }, []);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post(
        'http://localhost:5000/bfhl',
        parsedInput
      );
      setResponseData(response.data);
    } catch (error) {
      alert('Invalid JSON input or server error.');
    }
  };

  const renderResponse = () => {
    if (!responseData) return null;

    switch (selectedFilter) {
      case 'Alphabets':
        return <div>Alphabets: {responseData.alphabets.join(', ')}</div>;
      case 'Numbers':
        return <div>Numbers: {responseData.numbers.join(', ')}</div>;
      case 'Highest Lowercase Alphabet':
        return (
          <div>
            Highest Lowercase Alphabet:{' '}
            {responseData.highest_lowercase_alphabet}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='{"data":["M","1","334","4","B"]}'
        className="input"
      />
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>

      <div className="dropdown-filter">
        <label htmlFor="filter-select">Filter By: </label>
        <select
          id="filter-select"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="dropdown"
        >
          <option value="">--Select--</option>
          <option value="Alphabets">Alphabets</option>
          <option value="Numbers">Numbers</option>
          <option value="Highest Lowercase Alphabet">
            Highest Lowercase Alphabet
          </option>
        </select>
      </div>

      <div className="filtered-response">{renderResponse()}</div>
    </div>
  );
};

export default App;
