import React, { useState } from "react";
import axios from "axios";

const Home = ({ onLocationChange }) => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [radius, setRadius] = useState("");
  const [places, setPlaces] = useState([]);

  const searchPlaces = () => {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
    const parsedRadius = parseFloat(radius);

    if (!isNaN(parsedLat) && !isNaN(parsedLng) && !isNaN(parsedRadius)) {
      axios
        .get(
          `http://localhost:8080/api/places?lat=${lat}&lng=${lng}&radius=${radius}`
        )
        .then((response) => {
          setPlaces(response.data);
          onLocationChange({
            lat: parsedLat,
            lng: parsedLng,
            radius: parsedRadius,
          });
        })
        .catch((error) => console.error("Error fetching places:", error));
    } else {
      console.error("Invalid input data");
    }
  };

  return (
    <div>
      <nav className="bg-black text-black p-4 fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="flex space-x-4">
          <a
            href="#"
            className=" text-2xl py-2 px-4 font-gemunu uppercase font-bold text-transparent bg-gradient-to-r bg-clip-text from-gaga-red to-gaga-grey"
          >
            Nearby Places
          </a>
          <input
            type="text"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="p-2 border border-black"
          />
          <input
            type="text"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className="p-2 border border-black"
          />
          <input
            type="text"
            placeholder="Radius"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="p-2 border border-black"
          />
          <button
            onClick={searchPlaces}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Search
          </button>
        </div>
      </nav>
      <div
        className="mt-16"
        style={{ display: "flex", height: "calc(100vh - 64px)" }}
      >
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </div>
    </div>
  );
};

export default Home;
