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
        distance: calculateDistance(userCoords, { latitude: station.latitude, longitude: station.longitude }),
    }));

    // Sort stations by distance
    distances.sort((a, b) => a.distance - b.distance);

    // Take the nearest stations
    // Take top 5 nearest stations
    console.log("here", distances)
    return distances[0];
}

// // Example usage
// const userCoordinates = { latitude: 37.7749, longitude: -122.4194 }; // Example user coordinates
// const stationList = [
//     { name: 'Station 1', latitude: 37.7749, longitude: -123.4194 },
//     { name: 'Station 2', latitude: 37.7751, longitude: -122.4189 },
//     { name: 'Station 3', latitude: 37.7755, longitude: -122.4182 },
//     // Add more stations as needed
// ];

// const nearestStations = findNearestStations(userCoordinates, stationList);
// console.log(nearestStations)



export default findNearestStations;