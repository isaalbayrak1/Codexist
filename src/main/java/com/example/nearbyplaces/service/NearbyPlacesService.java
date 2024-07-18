package com.example.nearbyplaces.service;

import com.example.nearbyplaces.model.Place;
import com.example.nearbyplaces.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NearbyPlacesService {

    private final PlaceRepository placeRepository;

    @Autowired
    public NearbyPlacesService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    @Cacheable(key = "#longitude:#latitude:#radius")
    public List<Place> getNearbyPlaces(double longitude, double latitude, int radius) {

        System.out.println("called, getNearbyPlaces");

        if (true) {
            return List.of();
        }

        Optional<List<Place>> cachedPlaces = placeRepository.findByLongitudeAndLatitudeAndRadius(longitude, latitude, radius);

        if (cachedPlaces.isPresent()) {
            return cachedPlaces.get();
        }

        String apiKey = "YOUR_GOOGLE_PLACES_API_KEY";
        String url = String.format("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=%f,%f&radius=%d&key=%s",
                latitude, longitude, radius, apiKey);

        RestTemplate restTemplate = new RestTemplate();
        PlacesApiResponse response = restTemplate.getForObject(url, PlacesApiResponse.class);

        if (response != null && response.getResults() != null) {
            List<Place> places = new ArrayList<>();
            for (PlacesApiResponse.PlaceResult result : response.getResults()) {
                Place place = new Place();
                places.add(place);
            }
            placeRepository.saveAll(places);
            return places;
        }

        if (response != null && response.getResults() != null) {
            System.out.println("API Response: " + response);
            List<Place> places = new ArrayList<>();
            for (PlacesApiResponse.PlaceResult result : response.getResults()) {
                Place place = new Place();
                places.add(place);
            }
            placeRepository.saveAll(places);
            return places;
        } else {
            System.out.println("No results found or API response is null.");
        }
        return new ArrayList<>();
    }
}//cache docker
