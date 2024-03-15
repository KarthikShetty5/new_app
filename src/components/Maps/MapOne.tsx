// components/MapOne.js
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
interface Prop {
    prop: string[]
}

interface ChartData {
    lattitude: string;
    lonitude: string;
    place: string
}

const locations = [
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": -27.4689682,
        "longitude": 153.0234991
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 26.9154576,
        "longitude": 75.8189817
    },
    {
        "latitude": 28.6273928,
        "longitude": 77.1716954
    },
    {
        "latitude": 28.42826235,
        "longitude": 77.00270014657752
    },
    {
        "latitude": 13.0836939,
        "longitude": 80.270186
    },
    {
        "latitude": 12.3051828,
        "longitude": 76.6553609
    },
    {
        "latitude": 19.4326296,
        "longitude": -99.1331785
    },
    {
        "latitude": 35.6821936,
        "longitude": 139.762221
    },
    {
        "latitude": 1.357107,
        "longitude": 103.8194992
    },
    {
        "latitude": 18.9733536,
        "longitude": 72.82810491917377
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 28.6273928,
        "longitude": 77.1716954
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 1.357107,
        "longitude": 103.8194992
    },
    {
        "latitude": 28.5706333,
        "longitude": 77.3272147
    },
    {
        "latitude": 18.521428,
        "longitude": 73.8544541
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 5.7942155500000005,
        "longitude": 102.56214951339689
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 22.3850051,
        "longitude": 71.745261
    },
    {
        "latitude": 28.6273928,
        "longitude": 77.1716954
    },
    {
        "latitude": 22.3850051,
        "longitude": 71.745261
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 18.9733536,
        "longitude": 72.82810491917377
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 28.42826235,
        "longitude": 77.00270014657752
    },
    {
        "latitude": 28.6273928,
        "longitude": 77.1716954
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 18.9733536,
        "longitude": 72.82810491917377
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 17.360589,
        "longitude": 78.4740613
    },
    {
        "latitude": 2.5752228,
        "longitude": 98.6668841
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 18.521428,
        "longitude": 73.8544541
    },
    {
        "latitude": 26.9154576,
        "longitude": 75.8189817
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 51.5074456,
        "longitude": -0.1277653
    },
    {
        "latitude": 51.5074456,
        "longitude": -0.1277653
    },
    {
        "latitude": 52.5170365,
        "longitude": 13.3888599
    },
    {
        "latitude": 52.5170365,
        "longitude": 13.3888599
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 43.6534817,
        "longitude": -79.3839347
    },
    {
        "latitude": 43.7698712,
        "longitude": 11.2555757
    },
    {
        "latitude": 51.5074456,
        "longitude": -0.1277653
    },
    {
        "latitude": 32.0849391,
        "longitude": 34.8298446
    },
    {
        "latitude": 32.0849391,
        "longitude": 34.8298446
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 22.5726459,
        "longitude": 88.3638953
    },
    {
        "latitude": 28.6273928,
        "longitude": 77.1716954
    },
    {
        "latitude": 1.357107,
        "longitude": 103.8194992
    },
    {
        "latitude": 18.521428,
        "longitude": 73.8544541
    },
    {
        "latitude": 54.983006700000004,
        "longitude": 73.37452243916528
    },
    {
        "latitude": 18.521428,
        "longitude": 73.8544541
    },
    {
        "latitude": 28.42826235,
        "longitude": 77.00270014657752
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 52.5170365,
        "longitude": 13.3888599
    },
    {
        "latitude": 52.5170365,
        "longitude": 13.3888599
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 18.521428,
        "longitude": 73.8544541
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 18.521428,
        "longitude": 73.8544541
    },
    {
        "latitude": 17.360589,
        "longitude": 78.4740613
    },
    {
        "latitude": 14.7874825,
        "longitude": 75.3996731
    },
    {
        "latitude": 18.521428,
        "longitude": 73.8544541
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 28.42826235,
        "longitude": 77.00270014657752
    },
    {
        "latitude": 17.360589,
        "longitude": 78.4740613
    },
    {
        "latitude": 18.521428,
        "longitude": 73.8544541
    },
    {
        "latitude": 13.0836939,
        "longitude": 80.270186
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 19.0148811,
        "longitude": 72.8279556
    },
    {
        "latitude": 18.9733536,
        "longitude": 72.82810491917377
    },
    {
        "latitude": 23.0359998,
        "longitude": 72.5643429
    },
    {
        "latitude": 42.3554334,
        "longitude": -71.060511
    },
    {
        "latitude": 18.9733536,
        "longitude": 72.82810491917377
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 17.360589,
        "longitude": 78.4740613
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 12.9801242,
        "longitude": 80.184902
    },
    {
        "latitude": 25.6440845,
        "longitude": 85.906508
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 18.9733536,
        "longitude": 72.82810491917377
    },
    {
        "latitude": 18.9733536,
        "longitude": 72.82810491917377
    },
    {
        "latitude": 28.6273928,
        "longitude": 77.1716954
    },
    {
        "latitude": 28.6273928,
        "longitude": 77.1716954
    },
    {
        "latitude": 6.3110548,
        "longitude": 20.5447525
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 18.9733536,
        "longitude": 72.82810491917377
    },
    {
        "latitude": 14.5906346,
        "longitude": 120.9799964
    },
    {
        "latitude": 1.357107,
        "longitude": 103.8194992
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 28.4646148,
        "longitude": 77.0299194
    },
    {
        "latitude": -37.8142454,
        "longitude": 144.9631732
    },
    {
        "latitude": 26.9154576,
        "longitude": 75.8189817
    },
    {
        "latitude": 1.357107,
        "longitude": 103.8194992
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 18.9733536,
        "longitude": 72.82810491917377
    },
    {
        "latitude": 28.6273928,
        "longitude": 77.1716954
    },
    {
        "latitude": 26.8381,
        "longitude": 80.9346001
    },
    {
        "latitude": 18.9733536,
        "longitude": 72.82810491917377
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 28.6273928,
        "longitude": 77.1716954
    },
    {
        "latitude": 43.6044622,
        "longitude": 1.4442469
    },
    {
        "latitude": 18.521428,
        "longitude": 73.8544541
    },
    {
        "latitude": 12.9767936,
        "longitude": 77.590082
    },
    {
        "latitude": 38.7077507,
        "longitude": -9.1365919
    },
    {
        "latitude": 13.0836939,
        "longitude": 80.270186
    },
    {
        "latitude": 17.360589,
        "longitude": 78.4740613
    },
    {
        "latitude": 28.6273928,
        "longitude": 77.1716954
    },
    {
        "latitude": 18.9733536,
        "longitude": 72.82810491917377
    },
    {
        "latitude": 46.5223748,
        "longitude": 6.6319199
    },
    {
        "latitude": 48.8534951,
        "longitude": 2.3483915
    },
    {
        "latitude": 52.215933,
        "longitude": 19.134422
    },
    {
        "latitude": 61.0666922,
        "longitude": -107.991707
    },
    {
        "latitude": 32.6475314,
        "longitude": 54.5643516
    }
]


const MapOne = () => {
    // const jsonData: ChartData[] = JSON.parse(prop);

    // useEffect(() => {
    //     console.log(jsonData, prop)
    // })

    // const coordinates = locations.map(place => ({ latitude: place.latitude, longitude: place.longitude }));

    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current) {
            // Initialize the map
            const map = L.map('map').setView([locations[0].latitude, locations[0].longitude], 13);
            mapRef.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Add markers for each location in the array
            locations.forEach(location => {
                L.marker([location.latitude, location.longitude]).addTo(map);
            });
        }
    }, [locations]);

    return <div id="map" style={{ height: '49rem', width: '90rem' }} />;

};

export default MapOne;

