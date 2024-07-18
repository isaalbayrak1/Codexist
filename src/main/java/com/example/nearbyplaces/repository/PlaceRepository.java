package com.example.nearbyplaces.repository;

import com.example.nearbyplaces.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    Optional<List<Place>> findByLongitudeAndLatitudeAndRadius(double longitude, double latitude, int radius);
}
