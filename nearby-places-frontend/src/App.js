import React, { useState, useRef, useEffect } from 'react';
import Home from './Components/Home';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCYdIRwmftq5wmWip9k7tWREbhiFqL60A4';

const App = () => {
  const [location, setLocation] = useState({ lat: 22.54992, lng: 113.9498, radius: 500 });
  const mapRef = useRef(null);
  const infoWindowRef = useRef(null);
  const markerRef = useRef(null);
  const placesServiceRef = useRef(null);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    if (mapRef.current) {
      mapRef.current.setCenter({ lat: newLocation.lat, lng: newLocation.lng });
    }
    if (markerRef.current) {
      markerRef.current.setPosition({ lat: newLocation.lat, lng: newLocation.lng });
    }
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google) {
          initMap();
        }
      };
      document.head.appendChild(script);
    };

    const initMap = async () => {
      const { Map, Marker, InfoWindow, places } = await window.google.maps.importLibrary('places');

      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: location.lat, lng: location.lng },
      });

      mapRef.current = map;

      const marker = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: 'Selected Location'
      });

      markerRef.current = marker;

      const infoWindow = new window.google.maps.InfoWindow({
        content: 'Click the map to get Lat/Lng!',
        position: { lat: location.lat, lng: location.lng },
      });

      infoWindow.open(map);
      infoWindowRef.current = infoWindow;

      placesServiceRef.current = new window.google.maps.places.PlacesService(map);

      map.addListener('click', async (mapsMouseEvent) => {
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }

        const newLocation = mapsMouseEvent.latLng.toJSON();
        setLocation({ ...newLocation, radius: location.radius });

        if (markerRef.current) {
          markerRef.current.setPosition(newLocation);
        }


        const request = {
          location: mapsMouseEvent.latLng,
          radius: location.radius,
          type: ['restaurant'],
        };

        placesServiceRef.current.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
          }
        });

        const newInfoWindow = new window.google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });
        newInfoWindow.setContent(
          JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        newInfoWindow.open(map);

        infoWindowRef.current = newInfoWindow;
      });
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initMap();
    }
  }, []);

  const createMarker = (place) => {
    new window.google.maps.Marker({
      position: place.geometry.location,
      map: mapRef.current,
      title: place.name,
    });
  };

  return (
<div style={{ display: 'flex', height: '100vh' }}>
<div id="map" style={{ width: '70%', height: '100%' }}></div>
<div style={{ width: '30%', padding: '10px' }}>
<Home onLocationChange={handleLocationChange} />
</div>
</div>
);
};

export default App;
