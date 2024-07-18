package com.example.nearbyplaces.service;

import com.example.nearbyplaces.model.Place;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Arrays;
import java.util.List;

@Service
@EnableCaching
@Configuration
public class PlacesService {

    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        cacheManager.setCaches(Arrays.asList(
                new ConcurrentMapCache("nearby-places")));
        return cacheManager;
    }

    @Value("${google.api.key}")
    private String apiKey;

    private final String BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

    @Cacheable(value = "nearby-places", key = "#lat+#lng+#radius")
    public List<Place> getNearbyPlaces(double lat, double lng, int radius) {

        System.out.println("called, getNearbyPlaces");

        if (true) {
            return List.of();
        }

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                .queryParam("location", lat + "," + lng)
                .queryParam("radius", radius)
                .queryParam("key", apiKey);

        System.out.println(builder.toUriString());

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<PlacesApiResponse> responseEntity = restTemplate.getForEntity(builder.toUriString(), PlacesApiResponse.class);

        if (responseEntity.getStatusCode() != HttpStatusCode.valueOf(200)) {
            throw new RuntimeException("Not successful");
        }

        //PlacesApiResponse response = restTemplate.getForObject(builder.toUriString(), PlacesApiResponse.class);
        PlacesApiResponse response = responseEntity.getBody();

        System.out.println(response);

        if (response == null || response.getResults() == null) {
            throw new RuntimeException("API response is invalid or empty");
        }

        List<PlacesApiResponse.PlaceResult> results = response.getResults();
        Place[] places = new Place[results.size()];

        System.out.println(results.size());
        System.out.println(places.length);

        for (int i = 0; i < results.size(); i++) {
            PlacesApiResponse.PlaceResult placeResult = results.get(i);
            Place place = new Place();
            place.setName(placeResult.getName());
            place.setLatitude(placeResult.getGeometry().getLocation().getLat());
            place.setLongitude(placeResult.getGeometry().getLocation().getLng());
            place.setPlaceId(placeResult.getPlace_id());
            places[i] = place;
        }

        return List.of(places);
    }
}
