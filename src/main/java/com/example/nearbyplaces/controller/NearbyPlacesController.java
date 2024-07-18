package com.example.nearbyplaces.controller;

import com.example.nearbyplaces.model.Place;
import com.example.nearbyplaces.service.NearbyPlacesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NearbyPlacesController {

    private final NearbyPlacesService nearbyPlacesService;

    @Autowired
    public NearbyPlacesController(NearbyPlacesService nearbyPlacesService) {
        this.nearbyPlacesService = nearbyPlacesService;
    }

    @GetMapping("/api/nearbyplaces")
    public List<Place> getNearbyPlaces(
            @RequestParam double longitude,
            @RequestParam double latitude,
            @RequestParam int radius) {

        return nearbyPlacesService.getNearbyPlaces(longitude, latitude, radius);
    }

}
