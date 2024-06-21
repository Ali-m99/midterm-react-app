import React, { useEffect, useState } from "react"; //import react libraries and hooks
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"; //importing google maps library

//place additional google maps library in a array that are not apart of the local module
const libraries = ["places", "geometry"];

//Main function that will exported for use at the end
const MapContainer = () => {
  //create currentPosition variable with a empty state and use setCurrentPosition for updating
  const [currentPosition, setCurrentPosition] = useState({});
  //create distance variable initally set to 0 and use setDistance for updating
  const [distance, setDistance] = useState(0);
  //Get the coordinates for the library and store them in a variable
  const kpuSurreyLibraryPosition = {
    lat: 49.132132377394086,
    lng: -122.87141300022198,
  };

  //defining styling for the page
  const mapStyles = {
    height: "90vh",
    width: "100%",
  };

  //default location if the user does not have location permission enabled
  const defaultCenter = {
    lat: 49.249370174134604,
    lng: -122.97878675910955,
  };

  //Use effect to get the location of the user
  useEffect(
    () => {
      //Web method API for getting the geographic location of the user
      navigator.geolocation.getCurrentPosition((position) => {
        //Setting the state for use effect with the coordinates of the users location
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    },
    //empty dependency array since the page will not need to re-rendered
    []
  );

  //using use effect to calculate the distance from the users location and the library
  useEffect(() => {
    //checking to see if google map API has been loaded and currentPosition is set
    if (window.google && currentPosition.lat) {
      //calculate the distance between current loacation and the library
      const from = new window.google.maps.LatLng(
        currentPosition.lat,
        currentPosition.lng
      );
      const to = new window.google.maps.LatLng(
        kpuSurreyLibraryPosition.lat,
        kpuSurreyLibraryPosition.lng
      );
      const dist =
        window.google.maps.geometry.spherical.computeDistanceBetween(from, to) /
        1000;
      setDistance(dist);
    }
    //dependency array set to currentPosition meaning whenever position changes the useEffect will run
  }, [currentPosition]);

  //returning to the mapContainer function
  return (
    //load google maps javascript API to the page, also calling the additional libraires for the "libraries" array
    <LoadScript
      googleMapsApiKey="AIzaSyAAJOapPOD5psrqJU2fLDyaNRBacXhen6w"
      libraries={libraries}
    >
      <GoogleMap
        //main component for rendering the map also setting the styling from CSS above
        mapContainerStyle={mapStyles}
        zoom={13}
        center={currentPosition.lat ? currentPosition : defaultCenter}
      >
        {
          //if users location is available then render a marker if not render nothing
          currentPosition.lat ? <Marker position={currentPosition} /> : null
        }
      </GoogleMap>
      <p>Distance to KPU Surrey Library: {distance.toFixed(2)} km</p>
    </LoadScript>
  );
};

//exporting mapContainer function for use
export default MapContainer;
