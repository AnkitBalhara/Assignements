import { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";

const hospitalIcon = "https://maps.google.com/mapfiles/kml/shapes/hospitals.png"; // 🏥 Custom icon

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // 🟢 Get User's Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  // 🏥 Fetch Nearby Hospitals
  useEffect(() => {
    if (isLoaded && userLocation) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      const request = {
        location: new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
        radius: 5000,
        type: "hospital",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setHospitals(results);
        } else {
          console.error("Nearby search failed:", status);
        }
      });
    }
  }, [isLoaded, userLocation]);

  // 📍 Get Directions
  const getDirections = (hospital) => {
    if (!userLocation) {
      console.error("User location not available!");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: userLocation,
        destination: hospital.geometry.location,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Nearby Hospitals 🏥</h2>
      <GoogleMap
        mapContainerStyle={{ height: "500px", width: "100%" }}
        center={userLocation || { lat: 28.7041, lng: 77.1025 }}
        zoom={14}
      >
        {/* 🟢 User's Location */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          />
        )}

        {/* 🏥 Hospital Markers */}
        {hospitals.map((hospital) => (
          <Marker
            key={hospital.place_id}
            position={hospital.geometry.location}
            icon={hospitalIcon}
            onClick={() => setSelectedHospital(hospital)}
          />
        ))}

        {/* 🚗 Show Directions */}
        {directions && <DirectionsRenderer directions={directions} />}

        {/* ℹ️ Info Window for Selected Hospital */}
        {selectedHospital && (
          <InfoWindow
            position={selectedHospital.geometry.location}
            onCloseClick={() => setSelectedHospital(null)}
          >
            <div>
              <h3 className="font-bold">{selectedHospital.name}</h3>
              <p>{selectedHospital.vicinity}</p>
              <p><strong>Rating:</strong> {selectedHospital.rating || "N/A"} ⭐</p>
              <p><strong>Open Now:</strong> {selectedHospital.opening_hours?.open_now ? "Yes ✅" : "No ❌"}</p>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => getDirections(selectedHospital)}
              >
                🚗 Get Directions
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;



// import { GoogleMap, LoadScript } from "@react-google-maps/api";

// const MapComponent = () => {
//     const mapStyles = {
//         height: "400px",  // Ensure height is set
//         width: "100%",
//         border: "1px solid black", // Add border to check visibility
//       };

//   const defaultCenter = {
//     lat: 28.8955, // Example: Latitude of New Delhi
//     lng: 76.6066, // Example: Longitude of New Delhi
//   };
//   console.log("Google Maps API Key:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);


//   return (
//     <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//       <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={10} />
//     </LoadScript>
//   );
// };

// export default MapComponent;
