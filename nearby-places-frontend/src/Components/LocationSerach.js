import React, { useState } from 'react';
import axios from 'axios';

const LocationSearch = () => {
  const [location, setLocation] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleLocationSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/nearbyplaces?latitude=45&longitude=45&radius=45`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Konum arama hatası:', error);
    }
  };

  return (
    <div>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      <button onClick={handleLocationSearch}>Ara</button>
      <ul>
        {searchResults.map((result) => (
          <li key={result.place_id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LocationSearch;
