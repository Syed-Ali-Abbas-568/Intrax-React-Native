
import { ANDRIOD_GOOGLE_API_KEY } from "../../keys"


// Function to calculate distance and time between two points using Google Maps Distance Matrix API


async function calculateDistanceAndTime(srcCoords, destCoords) {

  const src = `${srcCoords.latitude},${srcCoords.longitude}`;
  const dest = `${destCoords.latitude},${destCoords.longitude}`;
  const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${src}&destinations=${dest}&key=${ANDRIOD_GOOGLE_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'OK') {
      const distance = data.rows[0].elements[0].distance.text;
      const duration = data.rows[0].elements[0].duration.text;
      return { distance, duration };
    } else {
      throw new Error(data.error_message || 'Failed to fetch data');
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export default calculateDistanceAndTime;

////////////////////////////////////////////////////////////////////////////////////////////////////

// // Example usage
// const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
// const srcCoordinates = { latitude: 37.7749, longitude: -122.4194 }; // Source coordinates
// const destCoordinates = { latitude: 37.7751, longitude: -122.4189 }; // Destination coordinates

// calculateDistanceAndTime(srcCoordinates, destCoordinates, apiKey)
//   .then(result => {
//     if (result) {
//       console.log('Distance:', result.distance);
//       console.log('Duration:', result.duration);
//     } else {
//       console.log('Failed to calculate distance and time');
//     }
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
