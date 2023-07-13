import { useJsApiLoader, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
export const LoadMap = ({ address, setDistance, setDuration }) => {
  const { loadId } = useParams();
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  // });

  const [directionsResponse, setDirectionsResponse] = useState();

  const calculateRoute = async (address) => {
    try {
      if (!address) return;
      const { loadingAddress, unloadingAddress } = address[0];
      const loadingAddressCords = new google.maps.LatLng(
        loadingAddress.latitude,
        loadingAddress.longitude,
      );
      const unloadingAddressCords = new google.maps.LatLng(
        unloadingAddress.latitude,
        unloadingAddress.longitude,
      );
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: loadingAddressCords,
        destination: unloadingAddressCords,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
      });

      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance?.text);
      setDuration(results.routes[0].legs[0].duration?.text);
    } catch (err) {
      console.log(err);
      setDistance(undefined);
      setDuration(undefined);
      setDirectionsResponse(undefined);
    }
  };

  useEffect(() => {
    calculateRoute(address);
  }, [address, loadId]);

  // const { directionsResponse } = useCalculateRoute(address);
  // if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <GoogleMap
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {directionsResponse && (
          <>
            <DirectionsRenderer directions={directionsResponse} />
          </>
        )}
      </GoogleMap>
    </>
  );
};
