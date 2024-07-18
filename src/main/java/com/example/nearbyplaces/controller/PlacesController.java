package com.example.nearbyplaces.controller;

import com.example.nearbyplaces.service.PlacesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlacesController {

    @Autowired
    private PlacesService placesService;

    @GetMapping("/api/places")
    public Object getNearbyPlaces(
            @RequestParam double lng,
            @RequestParam double lat,
            @RequestParam int radius) {

        return placesService.getNearbyPlaces(lng, lat,radius);
    }
}