// components/MapComponent.js
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
interface Prop {
    latitude: number;
    longitude: Number;
    locations: Number[]
}

const MapComponent: React.FC<Prop> = ({ locations }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current) {
            // Initialize the map
            const map = L.map('map').setView([locations[0].latitude, locations[0].longitude], 13);
            mapRef.current = map;

            // Add OpenStreetMap tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Add markers for each location in the array
            locations.forEach(location => {
                L.marker([location.latitude, location.longitude]).addTo(map);
            });
        }
    }, [locations]);

    return <div id="map" style={{ height: '600px', width: '100rem' }} />;
};

export default MapComponent;

