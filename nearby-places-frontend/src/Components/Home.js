import React, { useState } from 'react';
import axios from 'axios';

const Home = ({ onLocationChange }) => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [radius, setRadius] = useState('');
  const [places, setPlaces] = useState([]);

  const searchPlaces = () => {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
    const parsedRadius = parseFloat(radius);

    if (!isNaN(parsedLat) && !isNaN(parsedLng) && !isNaN(parsedRadius)) {
      axios.get(`http://localhost:8080/api/places?lat=${lat}&lng=${lng}&radius=${radius}`)
        .then(response => {
        setPlaces(response.data);
        onLocationChange({ lat: parsedLat, lng: parsedLng, radius: parsedRadius });
      })
        .catch(error => console.error('Error fetching places:', error));
    } else {
      console.error('Invalid input data');
    }
  };

  return (
<div>
<h1>Nearby Places</h1>
<input type="text" value={lat} onChange={e => setLat(e.target.value)} placeholder="Latitude" />
<input type="text" value={lng} onChange={e => setLng(e.target.value)} placeholder="Longitude" />
<input type="text" value={radius} onChange={e => setRadius(e.target.value)} placeholder="Radius" />
<button onClick={searchPlaces}>Search</button>
<ul>
{places.map(place => (
<li key={place.place_id}>{place.name}</li>
))}
</ul>
</div>
);
};

export default Home;
