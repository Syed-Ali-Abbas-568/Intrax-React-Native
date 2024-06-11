// Function to calculate the distance between two coordinates
function calculateDistance(userCoords, stationCoords) {
    const lat1 = userCoords.latitude;
    const lon1 = userCoords.longitude;
    const lat2 = stationCoords.latitude;
    const lon2 = stationCoords.longitude;

    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

// Function to find the nearest stations
function findNearestStations(userCoords, stationList) {
    // Calculate distances
    const distances = stationList.map(station => ({
        station,
        distance: calculateDistance(userCoords, station.coordinates),
    }));

    // Sort stations by distance
    distances.sort((a, b) => a.distance - b.distance);

    // Take the nearest stations
    const nearestStations = distances.slice(0, 5); // Take top 5 nearest stations

    return nearestStations;
}

// Example usage
const userCoordinates = { latitude: 37.7749, longitude: -122.4194 }; // Example user coordinates
const stationList = [
    { name: 'Station 1', coordinates: { latitude: 37.7749, longitude: -122.4194 } },
    { name: 'Station 2', coordinates: { latitude: 37.7751, longitude: -122.4189 } },
    { name: 'Station 3', coordinates: { latitude: 37.7755, longitude: -122.4182 } },
    // Add more stations as needed
];

const nearestStations = findNearestStations(userCoordinates, stationList);

// Now you can use Google Maps API to calculate distance and time from the nearest stations
